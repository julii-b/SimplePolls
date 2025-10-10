import type { Request, Response, NextFunction } from 'express';
import { HttpError } from '../types/httpError.js';

/**
 * Express error handler
 * 
 * @param {Error|HttpError} err - error thrown in the middlewares or routes
 * @param {Request} req 
 * @param {Respose} res 
 * @param {NextFunction} next 
 * @return sends an error response and ends the request
 */
const errorHandler = (
  err: Error|HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // log error
  console.error(err);

  if (err instanceof HttpError) { // send custom status code and message, if Error is httpError
    res.status(err.status).json({
      message: err.message,
    });
  } else {
    res.status(500).json({ // send 500 Internal server error, if it's no httpError
      message: 'Internal Server Error',
    });
  }
};

export default errorHandler;
