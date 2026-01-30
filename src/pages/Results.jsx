import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LottieAnimation from '../components/LottieAnimation';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const { score = 0, total = 1, answers = [], subject = 'maths', lessonId = 'lesson1' } = location.state || {};
  
  const percentage = Math.round((score / total) * 100);
  const getScoreBadge = () => {
    if (percentage >= 80) return { emoji: '🏆', title: t('quiz.greatWork'), class: 'from-yellow-400 to-orange-500' };
    if (percentage >= 60) return { emoji: '🌟', title: t('quiz.goodEffort'), class: 'from-blue-400 to-indigo-500' };
    return { emoji: '💪', title: t('quiz.keepTrying'), class: 'from-green-400 to-emerald-500' };
  };
  
  const badge = getScoreBadge();

  const handleRetry = () => {
    navigate(`/quiz/${subject}/${lessonId}`);
  };

  const handleContinue = () => {
    navigate('/subjects');
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <LottieAnimation height={180} width={180} className="animate-float mb-4" />
          <h1 className="text-3xl sm:text-4xl font-fun font-bold text-gray-800 mb-2">
            {t('lessons.lessonComplete')}!
          </h1>
          <p className="text-lg text-gray-600">{t('lessons.youLearned')}</p>
        </div>

        <div className={`bg-gradient-to-br ${badge.class} rounded-3xl p-8 text-white text-center mb-6 shadow-xl`}>
          <div className="text-6xl mb-4">{badge.emoji}</div>
          <h2 className="text-2xl sm:text-3xl font-fun font-bold mb-4">{badge.title}</h2>
          
          <div className="bg-white/20 rounded-2xl p-6 mb-4">
            <p className="text-lg mb-2">{t('common.yourScore')}</p>
            <p className="text-5xl sm:text-6xl font-bold mb-2">{score}/{total}</p>
            <p className="text-xl font-semibold">{percentage}%</p>
          </div>

          <div className="w-full bg-white/30 rounded-full h-4">
            <div 
              className="bg-white h-4 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {answers.length > 0 && (
          <div className="bg-white/80 rounded-3xl p-6 shadow-lg mb-6">
            <h3 className="text-xl font-fun font-bold text-gray-700 mb-4">
              📊 {t('quiz.correctAnswers')}
            </h3>
            <div className="space-y-3">
              {answers.map((answer, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-xl flex items-center space-x-3 ${
                    answer.isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <span className="text-2xl">
                    {answer.isCorrect ? '✅' : '❌'}
                  </span>
                  <span className="font-semibold">
                    {t('quiz.question')} {index + 1}: {answer.isCorrect ? t('common.correct') : t('common.incorrect')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRetry}
            className="btn-hover bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg"
          >
            🔄 {t('common.retry')}
          </button>
          
          <button
            onClick={handleContinue}
            className="btn-hover bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg"
          >
            📚 {t('common.continue')}
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 font-semibold"
          >
            🏠 {t('common.home')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;

