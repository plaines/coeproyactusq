import { test, expect } from '@playwright/test';
import { User } from '../../domain/User';
import { AdminUser } from '../../domain/AdminUser';
import { EssUser } from '../../domain/EssUser';

test('polymorphism: same call, different behavior', () => {
  const users: User[] = [new AdminUser('ana', 'secret1'), new EssUser('luis', 'secret2')];

  // Mismo método describe(), resultado distinto según el objeto real
  expect(users.map((u) => u.describe())).toEqual(['[ADMIN] ana (Admin)', 'luis (ESS)']);
});

test('encapsulation: setter rejects invalid passwords', () => {
  const user = new AdminUser('ana', 'secret1');
  expect(() => { user.password = '1'; }).toThrow('at least 4');
  user.password = 'newsecret';
  expect(user.password).toBe('newsecret');
});

test('constructor rejects an empty username', () => {
  expect(() => new EssUser('  ', 'secret1')).toThrow('username is required');
});

test('static counter belongs to the class', () => {
  const before = User.createdCount;
  new AdminUser('a1', 'secret1');
  new EssUser('b1', 'secret1');
  expect(User.createdCount).toBe(before + 2);
});