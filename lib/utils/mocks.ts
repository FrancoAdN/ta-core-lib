import { User } from '../auth';
import { ObjectId } from 'mongodb';
import { Album, Image, Publication } from '../travelers';

export const objectIdMock = new ObjectId('507f1f77bcf86cd799439011');

export const tokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5J9.eyJzdWIiOiIxMjM0NTYnktdmFsdWUiLCJpYXQiOjE1MTYyMzkwMjJ9.K6yLtNxYvofpe24DraDuNb_9GaUzyE3DZOAFI';

export const executionContextMock = new User({
  _id: objectIdMock,
});

export const MockType = <T>(options: Partial<T>): T => {
  return jest.fn(() => options as T)();
};

export type MockQuery = Record<'exec' | 'select' | 'sort', jest.Mock>;
export type MockAggregate = Record<
  'match' | 'project' | 'unwind' | 'addFields' | 'exec' | 'lookup',
  jest.Mock
>;
export type MockUpdate = Record<'exec', jest.Mock>;

export const userMock = new User({
  _id: objectIdMock,
  email: 'any@domain.com',
  lastname: 'any-lastname',
  name: 'any-name',
  password: 'any-pwd',
  username: 'any-username',
  followers: ['any-follower'],
  following: ['any-following'],
});

export const albumMock = new Album({
  published: true,
  description: 'any-description',
  images: [objectIdMock],
  location: 'any-location',
  rate: 3,
  title: 'any-title',
});

export const imageMock = new Image({
  imageKey: 'http://anyhost.com',
  parentAlbum: objectIdMock,
  createdBy: 'any-user',
  createdAt: expect.any(Date),
  deleted: false,
});

export const publicationMock = new Publication({
  seenBy: ['any-user'],
  comments: [objectIdMock],
  albumId: objectIdMock,
  caption: 'any-caption',
  likes: ['any-like'],
});
