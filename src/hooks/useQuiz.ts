import { useState, useEffect } from 'react';
import type { Question, QuizResult } from '../types/quiz';
import { kcnaQuestions } from '../data/kcna-questions';

export const useQuiz = (questionCount: number = 30) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  // Timer effect
  useEffect(() => {
    if (isQuizStarted && !isQuizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsQuizCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isQuizStarted, isQuizCompleted, timeLeft]);

  const startQuiz = () => {
    try {
      // Shuffle and select random questions from the local array
      const shuffledQuestions = [...kcnaQuestions].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffledQuestions.slice(0, Math.min(questionCount, kcnaQuestions.length));
      
      setQuestions(selectedQuestions);
      setSelectedAnswers(new Array(selectedQuestions.length).fill(-1));
      setCurrentQuestionIndex(0);
      setTimeLeft(60 * 60); // 60 minutes in seconds
      setIsQuizStarted(true);
      setIsQuizCompleted(false);
      setStartTime(Date.now());
    } catch (error) {
      console.error('Error starting quiz:', error);
    }
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    setIsQuizCompleted(true);
  };

  const calculateResults = (): QuizResult => {
    const answers = questions.map((question, index) => ({
      questionId: question.id,
      selectedAnswer: selectedAnswers[index],
      isCorrect: selectedAnswers[index] === question.correctAnswer
    }));

    const score = answers.filter(answer => answer.isCorrect).length;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    return {
      score,
      totalQuestions: questions.length,
      answers,
      timeSpent
    };
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    questions,
    currentQuestionIndex,
    selectedAnswers,
    timeLeft,
    isQuizStarted,
    isQuizCompleted,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    calculateResults,
    formatTime
  };
};