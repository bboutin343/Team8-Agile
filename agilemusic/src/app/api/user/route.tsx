import usersData from '../../../../data/users.js';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('id');
        const user = await usersData.getUserById(userId);
        return Response.json(user);
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'Error: Could not get user. Try again';
        return Response.json({ error: errorMessage });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, userId, songId, username } = body;

        if (action === 'like') {
            const updatedUser = await usersData.likeSong(userId, songId);
            return Response.json(updatedUser);
        } else if (action === 'dislike') {
            const updatedUser = await usersData.dislikeSong(userId, songId);
            return Response.json(updatedUser);
        } else {
            const newUser = await usersData.addUser(username);
            return Response.json(newUser);
        }
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'Error: Could not perform request. Try again';
        return Response.json({ error: errorMessage });
    }
}
