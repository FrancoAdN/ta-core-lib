import { Image } from '../..';
import { objectIdMock } from '../../utils';

describe('Image', () => {
  describe('constructor', () => {
    it('should create the entity', () => {
      const entity = new Image({
        imageKey: 'http://anyhost.com',
        parentAlbum: objectIdMock,
      });
      expect(entity.imageKey).toBe('http://anyhost.com');
      expect(entity.parentAlbum).toBe(objectIdMock);
    });

    it('should create the entity', () => {
      const entity = new Image();
      entity.imageKey = 'http://anyhost.com';
      entity.parentAlbum = objectIdMock;

      expect(entity.imageKey).toBe('http://anyhost.com');
      expect(entity.parentAlbum).toBe(objectIdMock);
    });
  });
});
