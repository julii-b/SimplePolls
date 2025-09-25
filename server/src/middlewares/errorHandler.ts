import type { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/httpError.js';

export interface AppError extends Error {
    status?: number;
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof HttpError) {
        res.status(err.status).json({
            message: err.message,
        })
    } else {
        res.status(500).json({
            message: 'Internal Server Error',
        })
    }
};

export default errorHandler;