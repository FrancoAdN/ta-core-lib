import { BaseSchema } from './base.schema';

describe('BaseSchema', () => {
  describe('constructor', () => {
    it('should create the entity', () => {
      const entity = new BaseSchema({
        createdAt: new Date(),
        deletedAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'any-user',
        updatedBy: 'any-user',
        deletedBy: 'any-user',
        deleted: true,
      });

      expect(entity.createdAt).toEqual(expect.any(Date));
      expect(entity.deletedAt).toEqual(expect.any(Date));
      expect(entity.updatedAt).toEqual(expect.any(Date));
      expect(entity.createdBy).toBe('any-user');
      expect(entity.updatedBy).toBe('any-user');
      expect(entity.deletedBy).toBe('any-user');
      expect(entity.deleted).toBeTruthy();
    });
  });
});
