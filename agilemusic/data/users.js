import { users } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import { validateStringInput } from '../utils/validation.js';

const usersMethods = {
    async addUser(username) {
        validateStringInput(username, "Username");

        const userCollection = await users();

        const newUser = {
            username: username,
            likedSongs: []
        };

        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) throw `Error: Could not add user "${username}"`;

        return newUser;
    },

    async likeSong(userId, songId) {
        const userCollection = await users();

        const updateInfo = await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $addToSet: { likedSongs: new ObjectId(songId) } }
        );

        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Error: Could not like song';

        return await this.getUserById(userId);
    },

    async dislikeSong(userId, songId) {
        const userCollection = await users();

        const updateInfo = await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { likedSongs: new ObjectId(songId) } }
        );

        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Error: Could not dislike song';

        return await this.getUserById(userId);
    },

    async getUserById(userId) {
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) throw `Error: User with userId "${userId}" not found`;
        return user;
    },

    async createPlaylist(userId, playlistName) {
        console.log(userId)
        validateStringInput(playlistName, "Playlist Name");
    
        const userCollection = await users();
        const userExists = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!userExists) throw 'Error: User not found';
    
        const playlistExists = await userCollection.findOne({ _id: new ObjectId(userId), "playlists.playlistName": playlistName });
        if (playlistExists) throw 'Error: Playlist already exists';
    
        const playlistId = new ObjectId();
        const updateInfo = await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $push: { playlists: { playlistId, playlistName, songs: [] } } }
        );
    
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) 
            throw 'Error: Could not create playlist';
    
        return playlistId;
    },
    
    async addSongToPlaylist(userId, playlistId, songId) {
        const userCollection = await users();
        const userExists = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!userExists) throw 'Error: User not found';
    
        const playlistExists = await userCollection.findOne({ _id: new ObjectId(userId), "playlists.playlistId": new ObjectId(playlistId) });
        if (!playlistExists) throw 'Error: Playlist not found';
    
        const updateInfo = await userCollection.updateOne(
            { _id: new ObjectId(userId), "playlists.playlistId": new ObjectId(playlistId) },
            { $addToSet: { "playlists.$.songs": songId } }
        );
    
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) 
            throw 'Error: Could not add song to playlist';
    
        return await this.getUserById(userId);
    },

    async removeSongFromPlaylist(userId, playlistId, songId) {
        const userCollection = await users();
        const userExists = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!userExists) throw 'Error: User not found';
    
        const playlistExists = await userCollection.findOne({ _id: new ObjectId(userId), "playlists.playlistId": new ObjectId(playlistId) });
        if (!playlistExists) throw 'Error: Playlist not found';
    
        const updateInfo = await userCollection.updateOne(
            { _id: new ObjectId(userId), "playlists.playlistId": new ObjectId(playlistId) },
            { $pull: { "playlists.$.songs": new ObjectId(songId) } }
        );
    
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) 
            throw 'Error: Could not remove song from playlist';
    
        return await this.getUserById(userId);
    },
    
    async updatePlaylist(userId, playlistId, newPlaylistName) {
        validateStringInput(newPlaylistName, "New Playlist Name");
    
        const userCollection = await users();
        const userExists = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!userExists) throw 'Error: User not found';
    
        const playlistExists = await userCollection.findOne({ _id: new ObjectId(userId), "playlists.playlistId": new ObjectId(playlistId) });
        if (!playlistExists) throw 'Error: Playlist not found';
    
        const updateInfo = await userCollection.updateOne(
            { _id: new ObjectId(userId), "playlists.playlistId": new ObjectId(playlistId) },
            { $set: { "playlists.$.playlistName": newPlaylistName } }
        );
    
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) 
            throw 'Error: Could not update playlist';
    
        return await this.getUserById(userId);
    },
    
    async deletePlaylist(userId, playlistId) {
        const userCollection = await users();
        const userExists = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!userExists) throw 'Error: User not found';
    
        const playlistExists = await userCollection.findOne({ _id: new ObjectId(userId), "playlists.playlistId": new ObjectId(playlistId) });
        if (!playlistExists) throw 'Error: Playlist not found';
    
        const updateInfo = await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { playlists: { playlistId: new ObjectId(playlistId) } } }
        );
    
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) 
            throw 'Error: Could not delete playlist';
    
        return await this.getUserById(userId);
    }    
};

export default usersMethods;