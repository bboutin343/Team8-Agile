import axios from "axios";
import { cookies } from "next/headers";

//Request access token
export async function GET(request) {
    try {
        const url = new URL(request.url)
        const code=url.searchParams.get('code')
        let data
        const response = await axios.post(
            `https://accounts.spotify.com/api/token`,
            {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: `http://localhost:3000/api/user/authorized`
            },
            {
                headers: {  
                    'Authorization': "Basic " + (Buffer.from("28d7fd7cfe334d9bb116cfea500d2976" + ':' + "f0ee2e9a99eb4809bf6fb504de9a3b3c").toString('base64')),
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            })
            .catch(function (error) {
                if (error.response) {
                    return error.response.data
                }
            })
            .then(response => {
                if (response) {
                    data = response.data
                    cookies().set('accessToken', data.access_token)
                }
            })

        const userData = await axios.get('https://api.spotify.com/v1/me', {headers: {'Authorization': `Bearer ${data.access_token}`}})
        const spotifyUser = userData.data
        cookies().set('username', spotifyUser.display_name)
        return Response.redirect('http://localhost:3000/')
    }catch(e) {
        return Response.json(e)
    }
}