import rateLimit from 'express-rate-limit';

/**
 * Rate limit middleware to limit each IP to 20 requests per minute.
 */
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 Minute
  max: 50, // each IP can send 50 requests per minute.
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;