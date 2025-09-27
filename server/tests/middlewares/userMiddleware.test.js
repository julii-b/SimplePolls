import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';

vi.mock('../../src/repositories/userRepository.ts'); // mock userRepository
import * as userRepository from '../../src/repositories/userRepository.ts';

import userMiddleware from '../../src/middlewares/userMiddleware.ts';

describe('userMiddleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    beforeEach(() => {
        mockRequest = {
            headers: {},
        };
        mockResponse = {
            json: vi.fn(),
            status: vi.fn().mockReturnThis(), // .mockReturnThis() to make it chainable like res.status().json()
            setHeader: vi.fn(),
        };
        nextFunction = vi.fn();
    });

    test('looks up userId', async () => {
        mockRequest = {
            headers: {
                authorization: 'Bearer token123',
            },
        };
        vi.mocked(userRepository.getUserByUserToken).mockResolvedValue({
            id: 1,
        });
        const result = await userMiddleware(
            mockRequest,
            mockResponse,
            nextFunction,
        );

        // userId is stored in the request:
        expect(mockRequest.userId).toBe(1);
        // next function is called:
        expect(nextFunction).toHaveBeenCalled();
    });

    test('creates user if no token present', async () => {
        vi.mocked(userRepository.createUser).mockResolvedValue({ id: 1 });
        const result = await userMiddleware(
            mockRequest,
            mockResponse,
            nextFunction,
        );

        // tried to create user:
        expect(userRepository.createUser).toHaveBeenCalled();
        // set X-New-Token header in the response:
        expect(mockResponse.setHeader).toHaveBeenCalledWith(
            'X-New-Token',
            expect.stringMatching(/^token_[A-Za-z0-9_-]+$/),
        );
        // userId is stored in the request:
        expect(mockRequest.userId).toBe(1);
        // next function is called:
        expect(nextFunction).toHaveBeenCalled();
    });

    it('creates new user if token is unknown', async () => {
        mockRequest.headers.authorization = 'Bearer invalid';
        vi.mocked(userRepository.getUserByUserToken).mockResolvedValue(null);
        vi.mocked(userRepository.createUser).mockResolvedValue({ id: 1 });
        await userMiddleware(mockRequest, mockResponse, nextFunction);

        // tried to create user:
        expect(userRepository.createUser).toHaveBeenCalled();
        // set X-New-Token header in the response:
        expect(mockResponse.setHeader).toHaveBeenCalledWith(
            'X-New-Token',
            expect.stringMatching(/^token_[A-Za-z0-9_-]+$/),
        );
        // userId is stored in the request:
        expect(mockRequest.userId).toBe(1);
        // next function is called:
        expect(nextFunction).toHaveBeenCalled();
    });

    it('throws error if createUser fails', async () => {
        vi.mocked(userRepository.createUser).mockResolvedValue(null);
        const result = userMiddleware(mockRequest, mockResponse, nextFunction);

        // throws error:
        await expect(result).rejects.toThrow(/Error while creating new user/);
        // next function was not called:
        expect(nextFunction).not.toHaveBeenCalled();
    });
});
