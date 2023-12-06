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
}

export { ObjectId };
