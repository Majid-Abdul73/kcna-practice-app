import React from 'react';
import type { Question } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number;
  onSelectAnswer: (index: number) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 leading-relaxed">
        {question.question}
      </h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label 
            key={index} 
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedAnswer === index 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <input
              type="radio"
              name="answer"
              value={index}
              checked={selectedAnswer === index}
              onChange={() => onSelectAnswer(index)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2 mr-4"
            />
            <span className="text-gray-700 dark:text-gray-300 flex-1">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;