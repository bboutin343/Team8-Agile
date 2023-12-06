const ObjectId = require('mongodb').ObjectId;

let mockInsertOneBehavior = song => Promise.resolve({ insertedCount: 1, insertedId: new ObjectId() });

const songsCollectionMock = {
  insertOne: jest.fn(song => mockInsertOneBehavior(song)),
  findOne: jest.fn(query => {
    if (query._id.toString() === '507f1f77bcf86cd799439011') {
      return Promise.resolve({
        _id: query._id,
        name: 'Test Song',
        artist: 'Test Artist',
        album: 'Test Album',
        releaseDate: new Date('2023-01-01'),
        genre: 'Test Genre',
      });
    }
    return Promise.resolve(null);
  }),
};

export const songs = jest.fn().mockImplementation(() => songsCollectionMock);
export const setMockInsertOneBehavior = behavior => {
  mockInsertOneBehavior = behavior;
};

let userData = {
    _id: new ObjectId('507f191e810c19729de860ea'),
    username: 'TestUser',
    likedSongs: [],
    playlists: [{ playlistId: new ObjectId('507f191e810c19729de860eb'), songs: [] }]
};

let mockUserInsertOneBehavior = user => Promise.resolve({ insertedCount: 1, insertedId: new ObjectId() });
let mockUserUpdateOneBehavior = (query, update) => {
    if (query._id.toString() === '507f191e810c19729de860ea') {
        if (update.$push && update.$push.playlists) {
            userData.playlists.push(update.$push.playlists);
            return Promise.resolve({ matchedCount: 1, modifiedCount: 1 });
        }
    }
    return Promise.resolve({ matchedCount: 0, modifiedCount: 0 });
};

let mockUserFindOneBehavior = query => {
    if (query._id && query._id.toString() === '507f191e810c19729de860ea') {
        return Promise.resolve(userData);
    }
    if (query._id && query["playlists.playlistId"]) {
        return Promise.resolve(userData);
    }
    return Promise.resolve(null);
};

const usersCollectionMock = {
    insertOne: jest.fn(user => mockUserInsertOneBehavior(user)),
    updateOne: jest.fn((query, update) => mockUserUpdateOneBehavior(query, update)),
    findOne: jest.fn(query => mockUserFindOneBehavior(query)),
};

export const users = jest.fn().mockImplementation(() => usersCollectionMock);
export const setMockUserInsertOneBehavior = behavior => {
    mockUserInsertOneBehavior = behavior;
};
export const setMockUserUpdateOneBehavior = behavior => {
    mockUserUpdateOneBehavior = behavior;
};
export const setMockUserFindOneBehavior = behavior => {
    mockUserFindOneBehavior = behavior;
};

export { ObjectId };
