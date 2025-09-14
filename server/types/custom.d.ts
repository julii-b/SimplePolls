import 'express';

// Extend Express Request
declare module "express-serve-static-core" {
  interface Request {
    userId?: number
  }
}