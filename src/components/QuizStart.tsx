import React from 'react';

interface QuizStartProps {
  onStart: () => void;
}

const QuizStart: React.FC<QuizStartProps> = ({ onStart }) => {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">KCNA Practice Quiz</h1>
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Quiz Information</h2>
        <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            60 random questions from the question bank
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            90 minutes time limit
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Multiple choice questions
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Results and explanations shown after completion
          </li>
        </ul>
      </div>
      <button 
        onClick={onStart} 
        className="px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;