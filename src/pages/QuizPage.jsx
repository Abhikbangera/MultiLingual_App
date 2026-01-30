import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LottieAnimation from '../components/LottieAnimation';

const quizzesData = {
  maths: {
    lesson1: {
      questions: [
        {
          id: 1,
          question: { en: 'What is 2 + 3?', hi: '2 + 3 क्या है?', pa: '2 + 3 ਕਿੰਨਾ ਹੈ?' },
          options: { en: ['4', '5', '6', '7'], hi: ['4', '5', '6', '7'], pa: ['4', '5', '6', '7'] },
          correctAnswer: 1,
          explanation: { en: 'Great job! 2 + 3 = 5', hi: 'बहुत बढ़िया! 2 + 3 = 5', pa: 'ਬਹੁਤ ਵਧੀਆ! 2 + 3 = 5' }
        },
        {
          id: 2,
          question: { en: 'What is 4 + 2?', hi: '4 + 2 क्या है?', pa: '4 + 2 ਕਿੰਨਾ ਹੈ?' },
          options: { en: ['5', '6', '7', '8'], hi: ['5', '6', '7', '8'], pa: ['5', '6', '7', '8'] },
          correctAnswer: 1,
          explanation: { en: 'Excellent! 4 + 2 = 6', hi: 'शाबाश! 4 + 2 = 6', pa: 'ਸ਼ਾਬਾਸ਼! 4 + 2 = 6' }
        },
        {
          id: 3,
          question: { en: 'What is 1 + 1?', hi: '1 + 1 क्या है?', pa: '1 + 1 ਕਿੰਨਾ ਹੈ?' },
          options: { en: ['1', '2', '3', '4'], hi: ['1', '2', '3', '4'], pa: ['1', '2', '3', '4'] },
          correctAnswer: 1,
          explanation: { en: 'Perfect! 1 + 1 = 2', hi: 'बिल्कुल सही! 1 + 1 = 2', pa: 'ਬਿਲਕੁਲ ਸਹੀ! 1 + 1 = 2' }
        }
      ]
    }
  },
  english: {
    lesson1: {
      questions: [
        {
          id: 1,
          question: { en: 'Which letter comes after A?', hi: 'A के बाद कौन सा अक्षर आता है?', pa: 'A ਤੋਂ ਬਾਅਦ ਕਿਹੜਾ ਅੱਖਰ ਆਉਂਦਾ ਹੈ?' },
          options: { en: ['B', 'C', 'D', 'E'], hi: ['B', 'C', 'D', 'E'], pa: ['B', 'C', 'D', 'E'] },
          correctAnswer: 0,
          explanation: { en: 'Correct! B comes after A', hi: 'सही! B, A के बाद आता है', pa: 'ਸਹੀ! B, A ਤੋਂ ਬਾਅਦ ਆਉਂਦਾ ਹੈ' }
        },
        {
          id: 2,
          question: { en: 'What starts with letter B?', hi: 'कौन B अक्षर से शुरू होता है?', pa: 'ਕੀ B ਅੱਖਰ ਨਾਲ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ?' },
          options: { en: ['Apple', 'Ball', 'Cat', 'Dog'], hi: ['Apple', 'Ball', 'Cat', 'Dog'], pa: ['Apple', 'Ball', 'Cat', 'Dog'] },
          correctAnswer: 1,
          explanation: { en: 'Great! Ball starts with B', hi: 'बहुत अच्छे! Ball B से शुरू होता है', pa: 'ਬਹੁਤ ਵਧੀਆ! Ball B ਨਾਲ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ' }
        }
      ]
    }
  },
  evs: {
    lesson1: {
      questions: [
        {
          id: 1,
          question: { en: 'What do plants need to grow?', hi: 'पौधों को बढ़ने के लिए क्या चाहिए?', pa: 'ਪੌਦਿਆਂ ਨੂੰ ਵਧਣ ਲਈ ਕੀ ਚਾਹੀਦਾ ਹੈ?' },
          options: { en: ['Sunlight', 'TV', 'Phone', 'Computer'], hi: ['धूप', 'टीवी', 'फोन', 'कंप्यूटर'], pa: ['ਧੁੰਦ', 'ਟੀਵੀ', 'ਫੋਨ', 'ਕੰਪਿਊਟਰ'] },
          correctAnswer: 0,
          explanation: { en: 'Correct! Plants need sunlight', hi: 'सही! पौधों को धूप चाहिए', pa: 'ਸਹੀ! ਪੌਦਿਆਂ ਨੂੰ ਧੁੰਦ ਚਾਹੀਦੀ ਹੈ' }
        },
        {
          id: 2,
          question: { en: 'What do plants give us?', hi: 'पौधे हमें क्या देते हैं?', pa: 'ਪੌਦੇ ਸਾਨੂੰ ਕੀ ਦਿੰਦੇ ਹਨ?' },
          options: { en: ['Oxygen', 'Pizza', 'Ice cream', 'Candy'], hi: ['ऑक्सीजन', 'पिज़्ज़ा', 'आइसक्रीम', 'कैंडी'], pa: ['ਆਕਸੀਜਨ', 'ਪਿੱਜ਼ਾ', 'ਆਈਸਕ੍ਰੀਮ', 'ਕੈਂਡੀ'] },
          correctAnswer: 0,
          explanation: { en: 'Perfect! Plants give us oxygen', hi: 'बिल्कुल सही! पौधे हमें ऑक्सीजन देते हैं', pa: 'ਬਿਲਕੁਲ ਸਹੀ! ਪੌਦੇ ਸਾਨੂੰ ਆਕਸੀਜਨ ਦਿੰਦੇ ਹਨ' }
        }
      ]
    }
  }
};

const QuizPage = () => {
  const { subject, lessonId } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const quiz = quizzesData[subject]?.[lessonId] || quizzesData.maths.lesson1;
  const questions = quiz.questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswerSelect = (index) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const isCorrect = index === questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore(score + 1);
    
    setAnswers([...answers, {
      questionId: questions[currentQuestion].id,
      selectedAnswer: index,
      correctAnswer: questions[currentQuestion].correctAnswer,
      isCorrect
    }]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleViewResults = () => {
    navigate('/results', { state: { score, total: questions.length, answers, subject, lessonId } });
  };

  const percentage = Math.round((score / questions.length) * 100);

  if (quizCompleted) {
    return (
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-8 text-center">
          <LottieAnimation height={200} width={200} className="animate-float mb-6" />
          <h1 className="text-3xl sm:text-4xl font-fun font-bold text-gray-800 mb-4">{t('lessons.lessonComplete')} 🎉</h1>
          <div className="bg-white/80 rounded-3xl p-8 shadow-lg mb-6">
            <div className="text-6xl mb-4">{percentage >= 70 ? '🏆' : percentage >= 50 ? '🌟' : '💪'}</div>
            <h2 className="text-2xl font-fun font-bold text-gray-700 mb-2">{t('quiz.greatWork')}</h2>
            <p className="text-xl text-gray-600 mb-4">{t('common.yourScore')}: {score} / {questions.length}</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full progress-bar" style={{ width: `${percentage}%` }}></div>
            </div>
            <p className="text-lg font-bold text-primary-600">{percentage}%</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleViewResults} className="btn-hover bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg">📊 {t('common.submit')}</button>
            <button onClick={() => navigate('/subjects')} className="btn-hover bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg">🏫 {t('subjects.selectSubject')}</button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex justify-between text-sm font-semibold text-gray-600 mb-2">
            <span>{t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {questions.length}</span>
            <span>{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full progress-bar" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-white/80 rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="text-xl sm:text-2xl font-fun font-bold text-gray-800 mb-6">{question.question[language] || question.question.en}</h2>
          <div className="space-y-3">
            {question.options[language]?.map((option, index) => {
              let optionClass = 'quiz-option bg-white border-3 border-gray-200';
              if (showExplanation) {
                if (index === question.correctAnswer) optionClass += ' correct';
                else if (index === selectedAnswer) optionClass += ' incorrect';
              } else if (selectedAnswer === index) optionClass += ' selected';
              return (
                <button key={index} onClick={() => handleAnswerSelect(index)} disabled={showExplanation} className={`${optionClass} w-full text-left p-4 rounded-xl font-semibold text-lg transition-all`}>
                  <span className="inline-block w-8 h-8 bg-gray-100 rounded-full text-center mr-3">{String.fromCharCode(65 + index)}</span>
                  {option}
                </button>
              );
            })}
          </div>
          {showExplanation && (
            <div className={`mt-6 p-4 rounded-xl ${selectedAnswer === question.correctAnswer ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'}`}>
              <p className={`font-bold text-lg ${selectedAnswer === question.correctAnswer ? 'text-green-700' : 'text-red-700'}`}>
                {selectedAnswer === question.correctAnswer ? '✅ ' : '❌ '}
                {selectedAnswer === question.correctAnswer ? t('common.correct') : t('common.incorrect')}
              </p>
              <p className="text-gray-700 mt-2">{question.explanation[language] || question.explanation.en}</p>
            </div>
          )}
        </div>

        {showExplanation && (
          <button onClick={handleNext} className="btn-hover w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xl font-bold py-4 rounded-2xl shadow-lg">
            {currentQuestion < questions.length - 1 ? t('common.next') + ' →' : t('common.submit')}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;

