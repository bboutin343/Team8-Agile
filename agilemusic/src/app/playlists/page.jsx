'use client'
import Link from "next/link";
import axios from "axios";
import React, {useState} from 'react'
import {useCookies} from 'next-client-cookies'
import {redirect} from 'next/navigation'

export default function CreatePlaylist() {
	const cookies = useCookies()
	let playlistId
	let userId = cookies.get('userId')
	const [formData, setFormData] = useState({playlistName: ''})
	const [created, setCreated] = useState(false)
	const [playlistLink, setLink] = useState(undefined)
	const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };
	const createPlaylist = async () => {
		console.log('here')
		await axios.post('http://localhost:3000/api/playlist', {action:'createPlaylist', userId:userId, playlistName: formData.playlistName})
		.catch(function (error) {
			console.log(error)
			if (error.response) {
				return error.response.data
			}
		})
		.then(response => {
			if (response) {
				console.log('response')
				playlistId = response.data
				console.log(playlistId)
				setCreated(true)
				setLink(`http://localhost:3000/playlists/${playlistId}`)
			}
		})
	}
	return (
		<>
			<div className='create'>
			<Link href='/'>Home</Link><br/>
				<label>
					PLAYLIST NAME:
					<input onChange={(e) => handleChange(e)}
                        id='playlistName'
                        name='playlistName'
                        placeholder='playlist name'
                    />
				</label>
			</div>
			<button onClick={() => createPlaylist()}>Create Playlist</button>	
			{created && (<div><Link href={playlistLink}>Playlist created! click here to go to it</Link></div>)}
		</>
	);
}