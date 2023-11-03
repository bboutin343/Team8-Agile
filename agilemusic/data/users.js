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
    }
};

export default usersMethods;