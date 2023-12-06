jest.mock('../config/mongoCollections.js', () => require('../__mocks__/mongoCollections.js'));

import usersMethods from '../data/users.js';
import { setMockUserInsertOneBehavior, setMockUserUpdateOneBehavior, setMockUserFindOneBehavior, ObjectId } from '../__mocks__/mongoCollections.js';

describe('usersMethods', () => {
    describe('addUser', () => {
        it('should create a new user', async () => {
            setMockUserInsertOneBehavior(() => Promise.resolve({ insertedCount: 1, insertedId: new ObjectId() }));
            const newUser = await usersMethods.addUser('TestUser');
            expect(newUser).toEqual({
                username: 'TestUser',
                likedSongs: []
            });
        });

        it('should throw an error if the user could not be added', async () => {
            setMockUserInsertOneBehavior(() => Promise.resolve({ insertedCount: 0 }));
            await expect(usersMethods.addUser('TestUser')).rejects.toThrow(new Error('Error: Could not add user "TestUser"'));
        });

        it('should throw an error if the username was invalid', async () => {
            await expect(usersMethods.addUser(0)).rejects.toThrow(new Error('Error: Username must be a valid string'));
        });
    });

    describe('getUserById', () => {
        it('should retrieve a user by their id', async () => {
            setMockUserFindOneBehavior(query => {
                if (query._id.toString() === '507f191e810c19729de860ea') {
                    return Promise.resolve({ _id: query._id, username: 'TestUser', likedSongs: [] });
                }
                return Promise.resolve(null);
            });
            const user = await usersMethods.getUserById('507f191e810c19729de860ea');
            expect(user).toEqual({
                _id: new ObjectId('507f191e810c19729de860ea'),
                username: 'TestUser',
                likedSongs: []
            });
        });

        it('should throw an error if the user id was not found', async () => {
            setMockUserFindOneBehavior(() => Promise.resolve(null));
            await expect(usersMethods.getUserById('507f191e810c19729de860ee')).rejects.toThrow('Error: User with userId "507f191e810c19729de860ee" not found');
        });
    });

    describe('likeSong', () => {
        it('should like a song successfully', async () => {
            setMockUserUpdateOneBehavior(() => Promise.resolve({ matchedCount: 1, modifiedCount: 1 }));
            setMockUserFindOneBehavior(() => Promise.resolve({ _id: new ObjectId('507f191e810c19729de860ea'), likedSongs: [new ObjectId('507f1f77bcf86cd799439011')] }));
            const user = await usersMethods.likeSong('507f191e810c19729de860ea', '507f1f77bcf86cd799439011');
            expect(user.likedSongs).toContainEqual(new ObjectId('507f1f77bcf86cd799439011'));
        });

        it('should throw an error if the song could not be liked', async () => {
            setMockUserUpdateOneBehavior(() => Promise.resolve({ matchedCount: 0, modifiedCount: 0 }));
            await expect(usersMethods.likeSong('507f191e810c19729de860ea', '507f1f77bcf86cd799439011')).rejects.toThrow(new Error('Error: Could not like song'));
        });
    });

    describe('dislikeSong', () => {
        it('should dislike a song successfully', async () => {
            setMockUserUpdateOneBehavior(() => Promise.resolve({ matchedCount: 1, modifiedCount: 1 }));
            setMockUserFindOneBehavior(() => Promise.resolve({ _id: new ObjectId('507f191e810c19729de860ea'), likedSongs: [] }));
            const user = await usersMethods.dislikeSong('507f191e810c19729de860ea', '507f1f77bcf86cd799439011');
            expect(user.likedSongs).not.toContainEqual(new ObjectId('507f1f77bcf86cd799439011'));
        });

        it('should throw an error if the song could not be disliked', async () => {
            setMockUserUpdateOneBehavior(() => Promise.resolve({ matchedCount: 0, modifiedCount: 0 }));
            await expect(usersMethods.dislikeSong('507f191e810c19729de860ea', '507f1f77bcf86cd799439011')).rejects.toThrow(new Error('Error: Could not dislike song'));
        });
    });

    describe('createPlaylist', () => {
        it('should create a playlist successfully without throwing an error', async () => {
            setMockUserFindOneBehavior(query => query['playlists.playlistName'] ? null : { _id: new ObjectId('507f191e810c19729de860ea') });
            setMockUserUpdateOneBehavior(() => Promise.resolve({ matchedCount: 1, modifiedCount: 1 }));
            try {
                await usersMethods.createPlaylist('507f191e810c19729de860ea', 'New Playlist');
                expect(true).toBe(true);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    
        it('should throw an error if the playlist could not be created', async () => {
            setMockUserFindOneBehavior(() => Promise.resolve(null));
            await expect(usersMethods.createPlaylist('507f191e810c19729de860ea', 'New Playlist')).rejects.toThrow(new Error('Error: User not found'));
        });
    });
    
    describe('addSongToPlaylist', () => {
        it('should add a song to a playlist successfully without throwing an error', async () => {
            setMockUserFindOneBehavior(query => {
                if (query._id || query["playlists.playlistId"]) {
                    return Promise.resolve({ _id: new ObjectId('507f191e810c19729de860ea'), playlists: [{ playlistId: new ObjectId('507f191e810c19729de860eb'), songs: [] }] });
                }
                return Promise.resolve(null);
            });
            setMockUserUpdateOneBehavior(() => Promise.resolve({ matchedCount: 1, modifiedCount: 1 }));
            try {
                await usersMethods.addSongToPlaylist('507f191e810c19729de860ea', '507f191e810c19729de860eb', '507f191e810c19729de860ec');
                expect(true).toBe(true);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    
        it('should throw an error if the song could not be added to the playlist', async () => {
            setMockUserFindOneBehavior(() => Promise.resolve(null));
            await expect(usersMethods.addSongToPlaylist('507f191e810c19729de860ea', '507f1f77bcf86cd799439011', 'songId')).rejects.toThrow(new Error('Error: User not found'));
        });
    });
    
    describe('removeSongFromPlaylist', () => {
        it('should remove a song from the playlist successfully without throwing an error', async () => {
            setMockUserFindOneBehavior(query => {
                if (query._id || query['playlists.playlistId']) {
                    return Promise.resolve({ _id: new ObjectId('507f191e810c19729de860ea'), playlists: [{ playlistId: new ObjectId('507f1f77bcf86cd799439011'), songs: [new ObjectId('507f1f77bcf86cd799439012')] }] });
                }
                return Promise.resolve(null);
            });
            setMockUserUpdateOneBehavior(() => Promise.resolve({ matchedCount: 1, modifiedCount: 1 }));
            try {
                await usersMethods.removeSongFromPlaylist('507f191e810c19729de860ea', '507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012');
                expect(true).toBe(true);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    
        it('should throw an error if the song could not be removed from the playlist', async () => {
            setMockUserFindOneBehavior(() => Promise.resolve(null));
            await expect(usersMethods.removeSongFromPlaylist('507f191e810c19729de860ea', '507f1f77bcf86cd799439011', 'songId')).rejects.toThrow(new Error('Error: User not found'));
        });
    });
    
    describe('updatePlaylist', () => {
        it('should update the playlist name successfully without throwing an error', async () => {
            setMockUserFindOneBehavior(query => {
                if (query._id || query['playlists.playlistId']) {
                    return Promise.resolve({ _id: new ObjectId('507f191e810c19729de860ea'), playlists: [{ playlistId: new ObjectId('507f1f77bcf86cd799439011'), playlistName: 'Old Playlist', songs: [] }] });
                }
                return Promise.resolve(null);
            });
            setMockUserUpdateOneBehavior(() => Promise.resolve({ matchedCount: 1, modifiedCount: 1 }));
            try {
                await usersMethods.updatePlaylist('507f191e810c19729de860ea', '507f1f77bcf86cd799439011', 'New Playlist');
                expect(true).toBe(true);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    
        it('should throw an error if the playlist could not be updated', async () => {
            setMockUserFindOneBehavior(() => Promise.resolve(null));
            await expect(usersMethods.updatePlaylist('507f191e810c19729de860ea', '507f1f77bcf86cd799439011', 'New Playlist')).rejects.toThrow(new Error('Error: User not found'));
        });
    });
    
    describe('deletePlaylist', () => {
        it('should delete the playlist successfully without throwing an error', async () => {
            setMockUserFindOneBehavior(query => {
                if (query._id || query['playlists.playlistId']) {
                    return Promise.resolve({ _id: new ObjectId('507f191e810c19729de860ea'), playlists: [{ playlistId: new ObjectId('507f1f77bcf86cd799439011'), playlistName: 'Playlist to Delete', songs: [] }] });
                }
                return Promise.resolve(null);
            });
            setMockUserUpdateOneBehavior(() => Promise.resolve({ matchedCount: 1, modifiedCount: 1 }));
            try {
                await usersMethods.deletePlaylist('507f191e810c19729de860ea', '507f1f77bcf86cd799439011');
                expect(true).toBe(true);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });
    
        it('should throw an error if the playlist could not be deleted', async () => {
            setMockUserFindOneBehavior(() => Promise.resolve(null));
            await expect(usersMethods.deletePlaylist('507f191e810c19729de860ea', '507f1f77bcf86cd799439011')).rejects.toThrow(new Error('Error: User not found'));
        });
    });
});
