import Image from 'next/image'
import Link from "next/link";
import SpotifyTest from './spotifyTest';

export default function Home() {
  return (
    
    <main>
      <head>
        <title>Web Music Player</title>
      </head>
    <body>
        <Link href="/login" key="login">
          <button className="w-40 h-10 text-center border-r border-black hover:bg-blue-100">Login</button>
        </Link>
        <Link href="/playlists" key="playlists">
          <button className="w-40 h-10 text-center border-r border-black hover:bg-blue-100">Playlists</button>
        </Link>
        <h1>Web Music Player</h1>
        <SpotifyTest/>
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
