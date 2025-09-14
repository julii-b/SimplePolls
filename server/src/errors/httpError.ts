export class HttpError extends Error {
    status: number
    expose?: boolean

    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

// kleine Helfer
export const badRequest = (msg = "Bad Request") => new HttpError(400, msg);
export const unauthorized = (msg = "Unauthorized") => new HttpError(401, msg);
export const forbidden = (msg = "Forbidden") => new HttpError(403, msg);
export const notFound = (msg = "Not Found") => new HttpError(404, msg);
export const conflict = (msg = "Conflict") => new HttpError(409, msg);