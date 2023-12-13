import React, {useState, useEffect} from 'react';
import {useCookies} from 'next-client-cookies'
import axios from 'axios'

const track = {
    name: "",
    album: {
        images: [

        ]
    },
    artists: [
        {name: ""}
    ]
}

function Player(props) {
    const [paused, setPaused] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [player, setPlayer] = useState(undefined)
    const [current, setCurrent] = useState(track)
    const cookies = useCookies()
    const [playlist, setPlaylist] = useState(cookies.get('playingPlaylist'))
    

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js"
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => {cb(props.token);},
                volume: 0.5
            });

            setPlayer(player)

            player.addListener('ready', ({device_id}) => {
                console.log('ready', device_id);
                console.log(device_id)
                cookies.set('device', device_id)

            });

            player.addListener('not_ready', ({device_id}) => {
                console.log('not ready', device_id);
            });

            player.addListener('player_state_changed', (state => {
                if(!state) {
                    return;
                }

                setCurrent(state.track_window.current_track);
                setPaused(state.paused);
                console.log('play', player)
                player.getCurrentState().then(state => {
                    (!state)?  setPlaying(false): setPlaying(true)
                });
            }));

            player.connect();
            console.log(player)
        }
    }, []);

    /*useEffect(() => {
        console.log('here')
        if (playlist) {
            //axios.put(`https://api.spotify.com/v1/me/player/`, {device_ids: [device]}, {headers: {'Authorization': `Bearer ${props.token}`}})
            console.log(playlist)
            let list = playlist.split(',')
            let songs = []
            
            for (let x of list) {
                console.log(x)
                songs.push(`spotify:track:${x}`)
                //console.log(songs)
            }
            axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${cookies.get('device')}`, {uris: songs}, {headers: {'Authorization': `Bearer ${props.token}`}})
        }
    }, [playlist])*/

    const pause = () => {
        axios.put(`https://api.spotify.com/v1/me/player/pause`, {}, {headers: {'Authorization': `Bearer ${props.token}`}})
    }

    const play = () => {
        axios.put(`https://api.spotify.com/v1/me/player/play`, {}, {headers: {'Authorization': `Bearer ${props.token}`}})
    }

    const skip = () => {
        axios.post(`https://api.spotify.com/v1/me/player/next`, {}, {headers: {'Authorization': `Bearer ${props.token}`}})
    }

    const back = () => {
        axios.post(`https://api.spotify.com/v1/me/player/previous`, {}, {headers: {'Authorization': `Bearer ${props.token}`}})
    }
    
    if (!playing) {
        return (<div>not currently active</div>)
    }
    else {
        return (
            <div>
                {current && (<img src={current.album.images[0].url} className='songCover' alt=""/>)}

                {current && (
                <div>
                    <div className='nowPlaying'>{current.name}</div>
                    <div className="currentArtist">{current.artists[0].name}</div>
                </div>
                )}
                <button id="goBackButton" onClick={() => {back()}}>Go Back</button>
                <button id="playButton" onClick={() => {play()}}>Play</button>
                <button id="playButton" onClick={() => {pause()}}>Pause</button>
                <button id="skipButton" onClick={() => {skip()}}>Skip</button>
                

            </div>
        )
    }
}

export default Player