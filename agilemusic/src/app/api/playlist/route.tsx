import usersData from '../../../../data/users.js';

export async function POST(request: Request) {
    const body = await request.json();
    const { action, userId, playlistName, playlistId, songId } = body;

    try {
        if (action === 'createPlaylist') {
            const updatedUser = await usersData.createPlaylist(userId, playlistName);
            return new Response(JSON.stringify(updatedUser), { status: 200 });
        } else if (action === 'addSongToPlaylist') {
            const updatedUser = await usersData.addSongToPlaylist(userId, playlistId, songId);
            return new Response(JSON.stringify(updatedUser), { status: 200 });
        } else if (action === 'removeSongFromPlaylist') {
            const updatedUser = await usersData.removeSongFromPlaylist(userId, playlistId, songId);
            return new Response(JSON.stringify(updatedUser), { status: 200 });
        } else if (action === 'updatePlaylist') {
            const updatedUser = await usersData.updatePlaylist(userId, playlistId, playlistName);
            return new Response(JSON.stringify(updatedUser), { status: 200 });
        } else if (action === 'deletePlaylist') {
            const updatedUser = await usersData.deletePlaylist(userId, playlistId);
            return new Response(JSON.stringify(updatedUser), { status: 200 });
        }
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'Error: Could not complete POST request. Try again';
        return Response.json({ error: errorMessage });
    }
}