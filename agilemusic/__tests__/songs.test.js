jest.mock('../config/mongoCollections.js', () => require('../__mocks__/mongoCollections.js'));

import songsMethods from '../data/songs.js';
import { setMockInsertOneBehavior, ObjectId } from '../__mocks__/mongoCollections.js';
  
describe('songsMethods', () => {
  describe('addSong', () => {
    it('should create a new song', async () => {
      const newSong = await songsMethods.addSong('Test Song', 'Test Artist', 'Test Album', '2023-01-01', 'Test Genre');
      expect(newSong).toEqual({
        name: 'Test Song',
        artist: 'Test Artist',
        album: 'Test Album',
        releaseDate: new Date('2023-01-01'),
        genre: 'Test Genre',
      });
    });

    it('should throw an error if the song could not be added', async () => {
      setMockInsertOneBehavior(() => Promise.resolve({ insertedCount: 0 }));
      await expect(songsMethods.addSong('Test Song', 'Test Artist', 'Test Album', '2023-01-01', 'Test Genre')).rejects.toThrow(new Error('Error: Could not add song'));
    });
  
  });
  
  describe('getSongById', () => {
    it('should retrieve a song by its id', async () => {
      const song = await songsMethods.getSongById('507f1f77bcf86cd799439011');
      expect(song).toEqual({
        _id: expect.any(ObjectId),
        name: 'Test Song',
        artist: 'Test Artist',
        album: 'Test Album',
        releaseDate: new Date('2023-01-01'),
        genre: 'Test Genre',
      });
    });

    it('should throw an error if the song id was not found', async () => {
      await expect(songsMethods.getSongById('507f1f77bcf86cd799439010')).rejects.toThrow(new Error('Error: Song not found'));
    });

    it('should throw an error if an invalid object id is used', async () => {
      await expect(songsMethods.getSongById('invalid-id')).rejects.toThrow(new Error("input must be a 24 character hex string, 12 byte Uint8Array, or an integer"));
    });
  
  });
});
  