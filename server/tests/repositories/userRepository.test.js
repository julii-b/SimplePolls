import { beforeAll, afterAll, describe, test, expect, afterEach, beforeEach } from 'vitest';
import * as userRepository from '../../src/repositories/userRepository.ts';

describe('Users Repository', () => {

    test('createUser works', async () => {
        // create new user:
        const user = await userRepository.createUser('testhash-userRepository-createUser');
        expect(user.clientHash).toBe('testhash-userRepository-createUser');
        // create user with hash that already exists:
        const user2 = await userRepository.createUser('testhash-userRepository-createUser');
        expect(user).toEqual(user2);
        // delete user again:
        userRepository.deleteUser(user.id);
    });

    test('getUserById works', async () => async () => {
        // get user that exists:
        const user = await userRepository.createUser('testhash-userRepository-getUserById');
        const user2 = await userRepository.getUserById(user.id);
        expect(user2).toEqual(user);
        userRepository.deleteUser(user.id);
        // get user that doesn't exist:
        const user3 = await userRepository.getUserById(-1);
        expect(user3).toBe(null);
    });

    test('getUserByClientHash works', async () => {
        // get user that exists:
        const user = await userRepository.createUser('testhash-userRepository-getUserByclientHash');
        const user2 = await userRepository.getUserByClientHash(user.clientHash);
        expect(user2).toEqual(user);
        userRepository.deleteUser(user.id);
        // get user that doesn't exist:
        let user3 = await userRepository.getUserByClientHash('nonexistanthash');
        expect(user3).toBe(null)
    });

    test('deleteUser works', async () => {
        // delete user that exists:
        const user = await userRepository.createUser('testhash-userRepository-deleteUser');
        let success1 = await userRepository.deleteUser(user.id);
        expect(success1).toBe(true);
        // try to get deleted user:
        let user2 = await userRepository.getUserById(user.id);
        expect(user2).toBe(null);
        // delete user that doesn't exist:
        let success2 = await userRepository.deleteUser(-1);
        expect(success2).toBe(false);
    });
});