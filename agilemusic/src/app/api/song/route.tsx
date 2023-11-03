import songsData from '../../../../data/songs.js';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const songId = url.searchParams.get('id');
        const song = await songsData.getSongById(songId);
        return Response.json(song);
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'Error: Could not get song. Try again';
        return Response.json({ error: errorMessage });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, artist, album, releaseDate, genre } = body;

        const newSong = await songsData.addSong(name, artist, album, releaseDate, genre);
        return Response.json(newSong);

    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'Error: Could not add song. Try again';
        return Response.json({ error: errorMessage });
    }
}
