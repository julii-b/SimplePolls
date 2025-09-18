import express from 'express';
import { userMiddleware } from './middlewares/userMiddleware.js';
import meRouter from './routes/meRouter.js';
import pollsRouter from './routes/pollsRouter.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

// User verification middleware:
app.use(userMiddleware);

// Routes:
app.use('/me', meRouter);
app.use('/polls', pollsRouter);

// Global error handler:
app.use(errorHandler);

export default app;

// GET /v1/me -> get own user object (for user id) with all poll ids (created and voted) and vote ids

// POST /v1/polls -> create new poll
// GET /v1/polls/:pollId -> get poll text
// PATCH /v1/polls/:pollId -> change poll text
// DELETE /v1/polls/:pollId -> delete poll

// POST /v1/polls/:pollId/answers -> create new answer
// GET /v1/polls/:pollId/answers -> get all answers with aggregated vote counts
// PATCH /v1/polls/:pollId/answers/:answerId -> change answer text
// DELETE /v1/polls/:pollId/answers/:answerId -> delete answer

// POST /v1/polls/:pollId/answers/:answerId/votes -> vote
// DELETE /v1/polls/:pollId/answers/:answerId/votes -> delete vote