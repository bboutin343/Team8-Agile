'use client'
import Link from "next/link";
import axios from "axios";
import React, {useState} from 'react'
import {useCookies} from 'next-client-cookies'

export default function CreatePlaylist() {
	const cookies = useCookies()
	let playlistId
	let userId = cookies.get('userId')
	const [formData, setFormData] = useState({playlistName: ''})
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
				playlistId = response.data
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
		</>
	);
}