'use client'
import Link from "next/link";
import axios from "axios";
import React, {useState, useEffect} from 'react'
import {useCookies} from 'next-client-cookies'
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
  } from '@mui/material';

export default function PlaylistCards({playlist}) {
    console.log('card', playlist)
    const cookies = useCookies()
    const [isPlaying, setPlaying] = useState(false)
    const [clicked, isClicked] = useState(false)
    let accessToken = cookies.get('accessToken')
    useEffect(() => {
        let current = cookies.get('currentPlaylist')
        if (current == playlist.playlistId) {
            setPlaying(true)
        }
        else {
            setPlaying(false)
        }
    }, [clicked])
    const playPlaylist = () => {
        console.log(playlist.songs)
        cookies.set('currentPlaylist', playlist.playlistId)
        cookies.set('playingPlaylist', playlist.songs)
        let songs = []
        for (let x of playlist.songs) {
            console.log(x)
            songs.push(`spotify:track:${x}`)
            //console.log(songs)
        }
        axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${cookies.get('device')}`, {uris: songs}, {headers: {'Authorization': `Bearer ${accessToken}`}})
        isClicked(true)
        
    };
    const pausePlaylist = () => {
        setPlaying(false)
    }
    return (
        <Grid item xs={12} sm={7} md={5} lg={4} xl={3} key={playlist.playlistId}>
            <Card
                variant='outlined'
                sx={{
                    maxWidth: 250,
                    height: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: 5,
                    border: '1px solid #1e8678',
                    boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
                }}>
                <CardActionArea>
                    <Link href={`/playlists/${playlist.playlistId}`}>
                        <CardContent>
                            <Typography
                                sx={{
                                    borderBottom: '1px solid #1e8678',
                                    frontWeight: 'bold'
                                }}
                                gutterBottom
                                variant='h6'
                                component='h3'
                            >
                                {playlist.playlistName}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
                <button onClick={() => {playPlaylist()}}>PLAY</button>
            </Card>
        </Grid>
    )

}