import type { Request, Response, NextFunction } from 'express';
import * as userRepository from '../repositories/userRepository.js';
import { HttpError } from '../errors/httpError.js';
import { randomBytes } from 'node:crypto';

/**
 * Middleware that maps the Bearer token to a userId.
 * If no token is present, a new user is created.
 * The userId is passed on in Request.userId.
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Read authotization token:
  const authHeaderRaw: undefined | string = req.headers['authorization']; // 'Bearer <token>'
  const authHeader: undefined | string[] = authHeaderRaw?.trim().split(/\s+/); // ['Bearer', <token>]
  const authScheme: undefined | string = authHeader && authHeader[0]; // 'Bearer'
  let userToken: undefined | string = authHeader && authHeader[1]; // <token>

  // Get user id if token exists:
  let userId: undefined | number = undefined;
  if (authScheme?.toLowerCase() === 'bearer' && userToken != null) {
    const user: userRepository.User | null = await userRepository.getUserByUserToken(userToken);
    userId = user?.id;
  }
  // Create new user if no user/token exists:
  if (userId == null) {
    userToken = 'token_' + randomBytes(32).toString('base64url');
    const user: userRepository.User | null = await userRepository.createUser(userToken);
    userId = user?.id;
    res.setHeader('X-New-Token', userToken);
  }
  // Store user id in Request.userId:
  if (userId != null) {
    req.userId = userId;
    next();
  } else {
    throw new HttpError(500, 'Error while creating new user.');
  }
};

export default userMiddleware;
