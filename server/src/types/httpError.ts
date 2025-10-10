/**
 * Custom HttpError class with status code code and message
 */
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** 400 Bad Request */
export const badRequest = (msg = 'Bad Request') => new HttpError(400, msg);
/** 401 Unauthorized */
export const unauthorized = (msg = 'Unauthorized') => new HttpError(401, msg);
/** 403 Forbidden */
export const forbidden = (msg = 'Forbidden') => new HttpError(403, msg);
/** 404 Not Found */
export const notFound = (msg = 'Not Found') => new HttpError(404, msg);
/** 409 Confilict */
export const conflict = (msg = 'Conflict') => new HttpError(409, msg);
/** 500 Internal Server Error */
export const serverError = (msg = 'Internal Server Error') => new HttpError(500, msg);
