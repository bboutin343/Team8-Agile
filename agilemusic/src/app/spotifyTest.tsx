import Link from "next/link";
import { cookies } from "next/headers";

export default function SpotifyTest() {
    let username
    if (cookies().has('username')) {
        username = cookies().get('username')
        if (username) {
            username = username.value
        }
    }

    if (cookies().has('accessToken')) {
        const accessToken = cookies().get('accessToken')
        return (
            <div>
                <p>logged in as {username}</p>
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