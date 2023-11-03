import { songs } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import { validateStringInput, validateDateInput } from '../utils/validation.js';

const songsMethods = {
    async addSong(name, artist, album, releaseDate, genre) {
        validateStringInput(name, "Name");
        validateStringInput(artist, "Artist");
        validateStringInput(album, "Album");
        validateDateInput(releaseDate, "Release Date");
        validateStringInput(genre, "Genre");

        const songCollection = await songs();

        const newSong = {
            name,
            artist,
            album,
            releaseDate: new Date(releaseDate),
            genre
        };

        const insertInfo = await songCollection.insertOne(newSong);
        if (insertInfo.insertedCount === 0) throw 'Error: Could not add song';

        return newSong;
    },

    async getSongById (songId) {
        const songCollection = await songs();
        const song = await songCollection.findOne({ _id: new ObjectId(songId) });
        if (!song) throw 'Error: Song not found';
        return song;
    }
};

export default songsMethods;