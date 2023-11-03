'use client'
import Link from "next/link";
import axios from "axios";
import React, {useState} from 'react'
import { access } from "fs";
import {useCookies} from 'next-client-cookies'

export default function SpotifyTest() {
    const cookies = useCookies()
    const [liked, setLiked] = useState(false)
    const [like, setLike] = useState("like")
    let username = cookies.get('username')
    let accessToken = cookies.get('accessToken')

    async function handleLike() {
        if (!liked) {
            await axios.put('https://api.spotify.com/v1/me/tracks', {ids: ["7iN1s7xHE4ifF5povM6A48"]}, {headers: {'Authorization': `Bearer ${accessToken}`}})
            setLiked(true)
            setLike("unlike")
        }
        else {
            await axios.delete('https://api.spotify.com/v1/me/tracks?ids=7iN1s7xHE4ifF5povM6A48', {headers: {'Authorization': `Bearer ${accessToken}`}})
            setLiked(false)
            setLike("like")
        }
    }

    if (accessToken) {
        return (
            <div>
                <p>logged in as {username}</p>
                <p>Song: Let It Be by The Beatles</p>
                <button onClick={handleLike}>
                    {like}
                </button>
            </div>
        )
    }
    else {
        return (
            <div>
                <Link href="/api/user/spotify">
                    <button type="button">
                        Login to Spotify
                    </button>
                </Link>
            </div>
        )
    }

    
}