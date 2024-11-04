// src/controllers/quizController.ts

import { Request, Response } from 'express';

// In-memory storage for quizzes and results (for demonstration purposes)
let quizzes: Array<{ id: number; title: string; questions: any[] }> = [];
let results: Array<{ quiz_id: number; user_id: string; score: number; answers: any[] }> = [];
let quizIdCounter = 1;
let resultIdCounter = 1;

// Create a new quiz
export const createQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, questions } = req.body;

    // Validate input
    if (!title || !Array.isArray(questions) || questions.length === 0) {
      res.status(400).json({ error: 'Title and questions are required.' });
      return;
    }

    const newQuiz = {
      id: quizIdCounter++,
      title,
      questions,
    };

    quizzes.push(newQuiz);
    res.status(201).json({ message: 'Quiz created successfully', quizId: newQuiz.id });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get a quiz by ID
export const getQuizById = async (req: Request, res: Response): Promise<void> => {
  try {
    const quizId = parseInt(req.params.id, 10);
    const quiz = quizzes.find(q => q.id === quizId);

    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }

    // Return the quiz without revealing correct answers
    const { questions, ...quizDetails } = quiz;
    res.status(200).json({ ...quizDetails, questions: questions.map(q => ({ id: q.id, text: q.text, options: q.options })) });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Submit an answer for a specific question in a quiz
export const submitAnswer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { quiz_id, user_id, question_id, selected_option } = req.body;

    // Validate input
    if (typeof quiz_id !== 'number' || !user_id || typeof question_id !== 'number' || typeof selected_option !== 'number') {
      res.status(400).json({ error: 'quiz_id, user_id, question_id, and selected_option are required.' });
      return;
    }

    const quiz = quizzes.find(q => q.id === quiz_id);
    if (!quiz) {
      res.status(404).json({ error: 'Quiz not found' });
      return;
    }

    const question = quiz.questions.find(q => q.id === question_id);
    if (!question) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }

    // Check if the selected option is correct
    const isCorrect = selected_option === question.correct_option;
    const answer = {
      question_id,
      selected_option,
      is_correct: isCorrect,
    };

    // Store the result
    const result = results.find(r => r.quiz_id === quiz_id && r.user_id === user_id);
    if (result) {
      result.answers.push(answer);
      result.score += isCorrect ? 1 : 0; // Increment score if the answer is correct
    } else {
      results.push({
        quiz_id,
        user_id,
        score: isCorrect ? 1 : 0,
        answers: [answer],
      });
    }

    // Provide feedback
    res.status(200).json({
      message: isCorrect ? 'Correct answer' : 'Incorrect answer',
      correct_option: question.correct_option,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

// Get user's results for a specific quiz
export const getResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const { quizId, userId } = req.params;

    const result = results.find(r => r.quiz_id === parseInt(quizId, 10) && r.user_id === userId);
    if (!result) {
      res.status(404).json({ error: 'Results not found for this quiz and user' });
      return;
    }

    res.status(200).json({
      quiz_id: result.quiz_id,
      user_id: result.user_id,
      score: result.score,
      answers: result.answers,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
