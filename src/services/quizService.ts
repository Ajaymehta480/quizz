
import { Quiz, Result, Question } from '../types';
import { QuizModel } from '../models/quiz';

const quizzes: Quiz[] = [];
const results: { [quizId: string]: { [userId: string]: Result } } = {};

export const createQuiz = (title: string, questions: Question[]): Quiz => {
  const newQuiz = new QuizModel(title, questions);
  quizzes.push(newQuiz);
  return newQuiz;
};

export const getQuizById = (quizId: string): Quiz | undefined => {
  return quizzes.find(quiz => quiz.id === quizId);
};

export const submitAnswer = (
  quizId: string,
  questionId: string,
  selectedOption: number,
  userId: string
): { correct: boolean; correctOption?: number } => {
  const quiz = getQuizById(quizId);
  if (!quiz) throw new Error('Quiz not found');

  const question = quiz.questions.find(q => q.id === questionId);
  if (!question) throw new Error('Question not found');

  const isCorrect = question.correctOption === selectedOption;
  if (!results[quizId]) results[quizId] = {};
  if (!results[quizId][userId]) results[quizId][userId] = { quizId, userId, score: 0, answers: [] };

  const userResults = results[quizId][userId];
  userResults.answers.push({ questionId, selectedOption, isCorrect });
  if (isCorrect) userResults.score += 1;

  return { correct: isCorrect, correctOption: isCorrect ? undefined : question.correctOption };
};

export const getUserResults = (quizId: string, userId: string): Result | undefined => {
  return results[quizId]?.[userId];
};
