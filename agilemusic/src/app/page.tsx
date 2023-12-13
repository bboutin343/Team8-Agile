'use client'
import Image from 'next/image'
import Link from "next/link";
import SpotifyTest from './spotifyTest';
import axios from 'axios'
import {useCookies} from 'next-client-cookies'
import React, {useState, useEffect} from 'react'
import PlaylistCards from './PlaylistCards.jsx'
import {Grid} from '@mui/material'
import Player from './player'

export default function Home() {
  const cookies = useCookies();
  let userId = cookies.get('userId')
  const [playlists, setPlaylists] = useState(undefined)
  const [cards, setCards] = useState(undefined)
  const [notFound, setNotFound] = useState(true)
  const [loading, setLoading] = useState(true)
  let accessToken = cookies.get('accessToken')

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const {data} = await axios.get(`http://localhost:3000/api/user?id=${userId}`)
        setPlaylists(data.playlists)
        console.log(data.playlists)
        setCards(data.playlists.map((playlist: Object) => {
          console.log(playlist)
          return <PlaylistCards playlist={playlist}/>
        }));
        if (data.playlists.length == 0) {
          setNotFound(true)
        }
        else {
          setNotFound(false)
        }
      }catch(e) {
        return (
          <div>
            <h2>500</h2>
            <p>Internal Server Error</p>
          </div>
        )
      }
    }
    setLoading(false)
    fetchPlaylists()
  }, [])
  return (
    
    <html>
      <head>
        <title>Web Music Player</title>
      </head>
    <body>
        <Link href="/playlists" key="playlists">
          <button className="w-40 h-10 text-center border-r border-black hover:bg-blue-100">Create a Playlist</button>
        </Link>
        <SpotifyTest/>
        <h1>Web Music Player</h1>
        {loading && (<div><p>Loading</p></div>)}
        
        {!loading && (<Grid container spacing={2} sx={{flexGrow: 1, flexDirection: 'row'}}>
                    {cards}
                </Grid>)}
        
        {accessToken ? <Player token={accessToken}/>: (<div>Log In to play music</div>) }
     </body>     
    </html>
  )
}
