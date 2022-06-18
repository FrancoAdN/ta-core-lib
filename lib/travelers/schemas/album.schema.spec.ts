import { objectIdMock } from '../../utils';
import { Album } from './album.schema';

describe('Album', () => {
  describe('constructor', () => {
    it('should create the entity', () => {
      const album = new Album({
        published: true,
        images: [objectIdMock],
        title: 'any-title',
        description: 'any-desc',
        rate: 4,
        location: 'any-location',
      });

      expect(album.published).toBeTruthy();
      expect(album.images).toEqual([objectIdMock]);
      expect(album.title).toBe('any-title');
      expect(album.description).toBe('any-desc');
      expect(album.rate).toBe(4);
      expect(album.location).toBe('any-location');
    });

    it('should create the entity', () => {
      const album = new Album();

      album.published = true;
      album.images = [objectIdMock];
      album.title = 'any-title';
      album.description = 'any-desc';
      album.rate = 4;
      album.location = 'any-location';

      expect(album.published).toBeTruthy();
      expect(album.images).toEqual([objectIdMock]);
      expect(album.title).toBe('any-title');
      expect(album.description).toBe('any-desc');
      expect(album.rate).toBe(4);
      expect(album.location).toBe('any-location');
    });
  });
});
