import express from 'express';
import userMiddleware from './middlewares/userMiddleware.js';
import apiDocsRouter from './openapi/apiDocsRouter.js';
import meRouter from './routes/meRouter.js';
import pollsRouter from './routes/pollsRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

// User verification middleware:
app.use(userMiddleware);

// Routes:
app.use('/', apiDocsRouter);
app.use('/me', meRouter);
app.use('/polls', pollsRouter);

// Global error handler:
app.use(errorHandler);

export default app;
