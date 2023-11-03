
export async function GET(request: Request) {
    let state = 'states'
    let scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private'
    const querystring = new URLSearchParams(
        {response_type: 'code',
        client_id: "28d7fd7cfe334d9bb116cfea500d2976",
        scope: scope,
        redirect_uri: `http://localhost:3000/api/user/authorized`,
        state: state,
        show_dialog: 'true'}).toString()
    
        
    
    return Response.redirect('https://accounts.spotify.com/authorize?'+ querystring)
}