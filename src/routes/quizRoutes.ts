
import express from 'express';
import * as quizController from '../controllers/quizController';

const router = express.Router();

router.post('/quizzes', quizController.createQuiz);
router.get('/quizzes/:id', quizController.getQuizById);
router.post('/quizzes/submit', quizController.submitAnswer);
router.get('/quizzes/:quizId/results/:userId', quizController.getResults);


export default router;
