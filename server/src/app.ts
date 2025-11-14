import cors from 'cors';
import express from 'express';
import rateLimiter from './middlewares/rateLimiter.js'
import userMiddleware from './middlewares/userMiddleware.js';
import apiDocsRouter from './openapi/apiDocsRouter.js';
import meRouter from './routes/meRouter.js';
import pollsRouter from './routes/pollsRouter.js';
import answersRouter from './routes/answersRouter.js';
import translationsRouter from './routes/translationsRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

//Rate limiter middleware:
app.use(rateLimiter);
// Parse incoming JSON payload:
app.use(express.json({ limit: '100kb' }));
// Allow the frontend to read x-New-Token header:
app.use(cors({
  origin: '*',
  exposedHeaders: ['X-New-Token'],
}));
// User verification middleware:
app.use(userMiddleware);

// Routes:
app.use('/', apiDocsRouter);
app.use('/me', meRouter);
app.use('/polls', pollsRouter);
app.use('/answers', answersRouter);
app.use('/translations', translationsRouter);

// Global error handler:
app.use(errorHandler);

export default app;
