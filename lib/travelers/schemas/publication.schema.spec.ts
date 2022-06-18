import { Publication } from '..';
import { objectIdMock, publicationMock } from '../../utils';

describe('Publication', () => {
  describe('constructor', () => {
    it('should create the entity', () => {
      const entity = new Publication(publicationMock);
      expect(entity.seenBy).toEqual(['any-user']);
      expect(entity.comments).toEqual([objectIdMock]);
      expect(entity.albumId).toBe(objectIdMock);
      expect(entity.caption).toBe('any-caption');
      expect(entity.likes).toEqual(['any-like']);
    });

    it('should create the entity', () => {
      const entity = new Publication();
      entity.seenBy = ['any-user'];
      entity.comments = [objectIdMock];
      entity.albumId = objectIdMock;
      entity.caption = 'any-caption';
      entity.likes = ['any-like'];

      expect(entity.seenBy).toEqual(['any-user']);
      expect(entity.comments).toEqual([objectIdMock]);
      expect(entity.albumId).toBe(objectIdMock);
      expect(entity.caption).toBe('any-caption');
      expect(entity.likes).toEqual(['any-like']);
    });
  });
});
