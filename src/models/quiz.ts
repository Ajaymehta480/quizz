
import { Quiz, Question } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class QuizModel implements Quiz {
  id: string;
  title: string;
  questions: Question[];

  constructor(title: string, questions: Question[]) {
    this.id = uuidv4();
    this.title = title;
    this.questions = questions.map(question => ({
      ...question,
      id: uuidv4(),
    }));
  }
}
