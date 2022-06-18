import { objectIdMock, userMock } from '../../utils';
import { User } from './user.schema';

describe('UserSchema', () => {
  describe('constructor', () => {
    it('should assign the entity correctly', () => {
      const user = new User(userMock);
      expect(user._id).toBe(objectIdMock);
      expect(user.name).toBe('any-name');
      expect(user.email).toBe('any@domain.com');
      expect(user.lastname).toBe('any-lastname');
      expect(user.username).toBe('any-username');
      expect(user.password).toBe('any-pwd');
    });

    it('should assign the entity correctly', () => {
      const user = new User();
      user._id = objectIdMock;
      user.name = 'any-name';
      user.email = 'any@domain.com';
      user.lastname = 'any-lastname';
      user.username = 'any-username';
      user.password = 'any-pwd';

      expect(user._id).toBe(objectIdMock);
      expect(user.name).toBe('any-name');
      expect(user.email).toBe('any@domain.com');
      expect(user.lastname).toBe('any-lastname');
      expect(user.username).toBe('any-username');
      expect(user.password).toBe('any-pwd');
    });
  });
});
