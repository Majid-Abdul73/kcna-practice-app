import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import QuizStart from './QuizStart';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';

const Quiz: React.FC = () => {
  const quiz = useQuiz(30);

  if (!quiz.isQuizStarted) {
    return <QuizStart onStart={quiz.startQuiz} />;
  }

  if (quiz.isQuizCompleted) {
    return (
      <QuizResults 
        results={quiz.calculateResults()}
        questions={quiz.questions}
        selectedAnswers={quiz.selectedAnswers}
        onRestart={quiz.startQuiz}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2 sm:space-y-0">
        <div className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
          Question {quiz.currentQuestionIndex + 1} of {quiz.questions.length}
        </div>
        <div className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">
          Time Left: {quiz.formatTime(quiz.timeLeft)}
        </div>
      </div>
      
      <QuizQuestion
        question={quiz.questions[quiz.currentQuestionIndex]}
        selectedAnswer={quiz.selectedAnswers[quiz.currentQuestionIndex]}
        onSelectAnswer={quiz.selectAnswer}
      />
      
      <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 space-y-3 sm:space-y-0">
        <button 
          onClick={quiz.previousQuestion}
          disabled={quiz.currentQuestionIndex === 0}
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-sm sm:text-base"
        >
          Previous
        </button>
        
        {quiz.currentQuestionIndex === quiz.questions.length - 1 ? (
          <button 
            onClick={quiz.submitQuiz}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-sm sm:text-base"
            disabled={quiz.selectedAnswers[quiz.currentQuestionIndex] === -1}
          >
            Submit Quiz
          </button>
        ) : (
          <button 
            onClick={quiz.nextQuestion}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-sm sm:text-base"
            disabled={quiz.selectedAnswers[quiz.currentQuestionIndex] === -1}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;