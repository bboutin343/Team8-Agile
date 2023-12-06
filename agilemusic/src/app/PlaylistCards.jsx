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
    const cookies = useCookies()
    const [isPlaying, setPlaying] = useState(false)
    useEffect(() => {
        let current = cookies.get('currentPlaylist')
        if (current == playlist.playlistId) {
            setPlaying(true)
        }
        else {
            setPlaying(false)
        }
    }, [cookies])
    const playPlaylist = () => {
        cookies.set('currentPlaylist', playlist.playlistId)
    };
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
                {!isPlaying && (<button onClick={playPlaylist}>PLAY</button>)}
                {isPlaying && (<p>NOW PLAYING</p>)}
            </Card>
        </Grid>
    )

}