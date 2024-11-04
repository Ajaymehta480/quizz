
import express from 'express';
import quizRoutes from './routes/quizRoutes';
import { errorHandler } from './utils/errorHandler';

const app = express();
app.use(express.json());
app.use('/', quizRoutes);
app.use(errorHandler);

export default app;
