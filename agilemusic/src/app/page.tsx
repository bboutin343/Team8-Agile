'use client'
import Image from 'next/image'
import Link from "next/link";
import SpotifyTest from './spotifyTest';
import axios from 'axios'
import {useCookies} from 'next-client-cookies'
import React, {useState, useEffect} from 'react'
import PlaylistCards from './PlaylistCards.jsx'
import {Grid} from '@mui/material'

export default function Home() {
  const cookies = useCookies();
  let userId = cookies.get('userId')
  const [playlists, setPlaylists] = useState(undefined)
  const [cards, setCards] = useState(undefined)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const {data} = await axios.get(`http://localhost:3000/api/user?id=${userId}`)
        setPlaylists(data.playlists)
        setCards(data.playlists.map((playlist: Object) => {
          return <PlaylistCards playlist={playlist}/>
        }));
        if (data.playlists.length == 0) {
          setNotFound(true)
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
    
    <main>
      <head>
        <title>Web Music Player</title>
      </head>
    <body>
        <Link href="/playlists" key="playlists">
          <button className="w-40 h-10 text-center border-r border-black hover:bg-blue-100">Playlists</button>
        </Link>
        <SpotifyTest/>
        <Link href="/playlists" key="playlists">
          <button className="w-40 h-10 text-center border-r border-black hover:bg-blue-100">Create a Playlist</button>
        </Link>
        <h1>Web Music Player</h1>
        {loading && (<div><p>Loading</p></div>)}
        {!loading && (<Grid container spacing={2} sx={{flexGrow: 1, flexDirection: 'row'}}>
                    {cards}
                </Grid>)}
        
        <audio id="audioPlayer" controls>
            <source src="your-audio-file.mp3" type="audio/mpeg"></source>
            Your browser does not support the audio element.
        </audio>
        <button id="playButton">Play</button>
        <button id="pauseButton">Pause</button>
        <button id="skipButton">Skip</button>
        <button id="goBackButton">Go Back</button>
        <button id="playlistButton">Change Playlist</button>
     </body>     
    </main>
  )
}
