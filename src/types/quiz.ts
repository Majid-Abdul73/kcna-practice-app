export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  category?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  answers: {
    questionId: number;
    selectedAnswer: number;
    isCorrect: boolean;
  }[];
  timeSpent: number;
}