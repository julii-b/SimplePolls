import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import { pool } from '../../src/db/pool.js';
import * as usersModel from '../../src/models/usersModel.ts';

let userObj = {};

afterAll(async () => {

});


describe('Users Module', () => {
    it('createUser works', () => {
        usersModel.createUser();
    });
}
);
