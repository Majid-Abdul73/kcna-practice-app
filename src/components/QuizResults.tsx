import React, { useState } from 'react';
import type { Question, QuizResult } from '../types/quiz';

interface QuizResultsProps {
  results: QuizResult;
  questions: Question[];
  selectedAnswers: number[];
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  results,
  questions,
  selectedAnswers,
  onRestart
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const percentage = Math.round((results.score / results.totalQuestions) * 100);
  
  const getGrade = (percentage: number): string => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'A': return 'text-green-600';
      case 'B': return 'text-blue-600';
      case 'C': return 'text-yellow-600';
      case 'D': return 'text-orange-600';
      default: return 'text-red-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-6 sm:mb-8">Quiz Results</h1>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-4 sm:p-8 rounded-lg mb-6 sm:mb-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">Your Score</h2>
          <div className="text-4xl sm:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {results.score}/{results.totalQuestions}
          </div>
          <div className="text-2xl sm:text-4xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            {percentage}%
          </div>
          <div className={`text-xl sm:text-2xl font-bold mb-2 ${getGradeColor(getGrade(percentage))}`}>
            Grade: {getGrade(percentage)}
          </div>
          <div className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Time: {formatTime(results.timeSpent)}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm sm:text-base"
        >
          {showDetails ? 'Hide' : 'Show'} Detailed Results
        </button>
        <button 
          onClick={onRestart} 
          className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
        >
          Take Quiz Again
        </button>
      </div>

      {showDetails && (
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">Question by Question Review</h3>
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div 
                key={question.id} 
                className={`p-4 sm:p-6 rounded-lg border-2 ${
                  isCorrect 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3">
                  Question {index + 1}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                  {question.question}
                </p>
                
                <div className="space-y-2 mb-3 sm:mb-4">
                  {question.options.map((option, optionIndex) => {
                    let className = 'p-2 sm:p-3 rounded border text-sm sm:text-base ';
                    if (optionIndex === question.correctAnswer) {
                      className += 'bg-green-100 dark:bg-green-800 border-green-500 text-green-800 dark:text-green-200 font-semibold';
                    } else if (optionIndex === userAnswer && !isCorrect) {
                      className += 'bg-red-100 dark:bg-red-800 border-red-500 text-red-800 dark:text-red-200 font-semibold';
                    } else {
                      className += 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300';
                    }
                    
                    return (
                      <div key={optionIndex} className={className}>
                        <span className="flex items-center justify-between">
                          <span className="flex-1 pr-2">{option}</span>
                          <span className="flex-shrink-0">
                            {optionIndex === question.correctAnswer && (
                              <span className="text-green-600 font-bold">✓</span>
                            )}
                            {optionIndex === userAnswer && optionIndex !== question.correctAnswer && (
                              <span className="text-red-600 font-bold">✗</span>
                            )}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded border-l-4 border-blue-500">
                  <strong className="text-blue-800 dark:text-blue-200 text-sm sm:text-base">Explanation:</strong>
                  <span className="text-blue-700 dark:text-blue-300 ml-2 italic text-sm sm:text-base block sm:inline mt-1 sm:mt-0">
                    {question.explanation}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizResults;