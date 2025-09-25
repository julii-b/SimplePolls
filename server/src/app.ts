import express from 'express';
import userMiddleware from './middlewares/userMiddleware.js';
import meRouter from './routes/meRouter.js';
import pollsRouter from './routes/pollsRouter.js';
import errorHandler from './middlewares/errorHandler.js';

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

// GET /me -> get own user object (for user id) with all poll ids (created and voted) and vote ids

// POST /polls -> create new poll
// GET /polls/:pollId -> get poll text
// PATCH /polls/:pollId -> change poll text
// DELETE /polls/:pollId -> delete poll

// POST /polls/:pollId/answers -> create new answer
// GET /polls/:pollId/answers -> get all answers with votes
// GET /polls/:pollId/answers/:answerId -> get answer with votes
// PATCH /polls/:pollId/answers/:answerId -> change answer text
// DELETE /polls/:pollId/answers/:answerId -> delete answer

// POST /polls/:pollId/answers/:answerId/votes -> vote
// DELETE /polls/:pollId/answers/:answerId/votes -> delete vote