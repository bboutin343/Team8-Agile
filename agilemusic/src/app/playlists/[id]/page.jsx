'use client'
import axios from "axios";
import React, {useState, useEffect} from 'react'
import {useCookies} from 'next-client-cookies'
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Playlist(props) {
    const params = useParams()
    const cookies = useCookies()
    const userId = cookies.get('userId')
    let accessToken = cookies.get('accessToken')
    let id = params.id
    //console.log(id)
    const [searchTerm, setSearch] = useState({searchTerm: ''})
    const [searchResults, setResults] = useState(undefined)
    const [songs, setSongs] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [playlistName, setName] = useState('n/a')
    const [songsAdded, addSongs] = useState(0)
    const [haveSearched, setSearched] = useState(false)

    const handleChange = (e) => {
        setSearch((prev) => ({...prev, [e.target.name]: e.target.value}))
        console.log(searchTerm.searchTerm)
    };
    const addToPlaylist = async (songId) => {
        console.log('adding')
        try {
            console.log(await axios.post('http://localhost:3000/api/playlist', {action:'addSongToPlaylist', userId:userId, playlistId:id, songId:songId}))
            addSongs(songsAdded+1)
        }catch(e) {
            console.log(e)
        }
    }
    const search = async () => {
        try {
            setSearched(false)
            const {data} = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm.searchTerm}&type=album%2Ctrack&limit=15&offset=0`, {headers: {'Authorization': `Bearer ${accessToken}`}})
            const results = data.tracks.items
            let resArray = []
            results.map((result) => {
                resArray.push({songId:result.id, title:result.name, artist:result.artists[0].name}) //(<><span key={result.id}>{result.name} by {result.artists[0].name} </span> <button onClick={() => addToPlaylist(result.id)}>Add to this playlist</button><br/></>)
            })
            setResults(resArray)
            setSearched(true)
        
        } catch(e) {
            console.log(e)
            setResults(
                (<div>
                    <h2>500</h2>
                    <p>Internal Server Error</p>
                </div>)
            )
        }
        
        
    }
    useEffect(() => {
        console.log('fired')
        async function fetchSongs() {
            console.log('here')
            try {
                let songArray = []
                const {data} = await axios.get(`http://localhost:3000/api/user?id=${userId}`)
                let playlists = data.playlists
                let thisPlaylist
                console.log(playlists)
                for (let x of playlists) {
                    console.log(x.playlistId)
                    console.log(id)
                    if (x.playlistId == id) {
                        console.log('match')
                        thisPlaylist = x
                    }
                    console.log(thisPlaylist)
                }
                console.log(thisPlaylist.songs.length)
                if (thisPlaylist.songs.length == 0) {
                    setNotFound(true)
                }
                else {
                    setNotFound(false)
                }
                console.log('here')
                console.log(thisPlaylist.songs)
                for (let x of thisPlaylist.songs) {
                    console.log('in')
                    const {data} = await axios.get(`https://api.spotify.com/v1/tracks/${x}`, {headers: {'Authorization': `Bearer ${accessToken}`}})
                    let title = data.name
                    let artist = data.artists[0].name
                    songArray.push({id:x, title:title, artist:artist})
                }
                console.log('setSongs')
                setSongs(songArray)
                console.log(thisPlaylist)
                setName(thisPlaylist.playlistName)
                setLoading(false)
            }catch(e) {
                console.log(e)
            }
        }
        fetchSongs()
    },[id, songsAdded])
    console.log(haveSearched)
    console.log('notFound', notFound)
    console.log(songs)
    if (loading) {
        return (
            <div>Loading</div>
        )
    }
    else {
        return (
            <>
                <h1>{playlistName}</h1>
                <Link href='/'>Home</Link>
                <ol>
                    {!notFound && (<>{songs.map((song) => (
                        <li key={song.id}><span>{song.title} by {song.artist}</span></li>
                    ))}</>)}
                </ol>
                <div className='search'>
                    <label>
                        Search for another song to add:
                        <input onChange={(e) => handleChange(e)}
                            id='searchTerm'
                            name='searchTerm'
                            placeholder='Type a song here'
                        />
                    </label>
                </div>
                <button onClick={search}>Search!</button>
                <div>
                {haveSearched && (<>{searchResults.map((song) => (
                        <div key={song.songId}>
                            <span>{song.title} by {song.artist} </span> <button onClick={() => addToPlaylist(song.songId)}>| Add to this playlist |</button><br/>
                        </div>
                ))}</>)}
                </div>
                
            </>
        );
    }
}