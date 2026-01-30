import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LottieAnimation from '../components/LottieAnimation';

const SubjectSelector = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const subjects = [
    {
      id: 'maths',
      emoji: '🔢',
      title: t('subjects.maths.name'),
      description: t('subjects.maths.description'),
      color: 'subject-math',
      animation: 'math_addition.json'
    },
    {
      id: 'english',
      emoji: '📚',
      title: t('subjects.english.name'),
      description: t('subjects.english.description'),
      color: 'subject-english',
      animation: 'english_alphabet.json'
    },
    {
      id: 'evs',
      emoji: '🌿',
      title: t('subjects.evs.name'),
      description: t('subjects.evs.description'),
      color: 'subject-evs',
      animation: 'evs_plants.json'
    }
  ];

  const handleSubjectSelect = (subjectId) => {
    navigate(`/lesson/${subjects.find(s => s.id === subjectId)?.id || subjectId}/lesson1`);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <LottieAnimation 
            height={120} 
            width={120} 
            className="animate-float mb-4"
          />
          
          <h1 className="text-3xl sm:text-4xl font-fun font-bold text-gray-800 mb-4">
            {t('subjects.selectSubject')}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => handleSubjectSelect(subject.id)}
              className={`${subject.color} card-hover rounded-3xl p-6 text-center shadow-lg hover:shadow-xl transform transition-all`}
            >
              <div className="text-6xl sm:text-7xl mb-4 animate-bounce-slow">
                {subject.emoji}
              </div>
              <h3 className="text-2xl sm:text-3xl font-fun font-bold mb-3">
                {subject.title}
              </h3>
              <p className="text-lg opacity-80">
                {subject.description}
              </p>
              <div className="mt-4">
                <span className="inline-block bg-white/50 rounded-full px-4 py-2 text-sm font-bold">
                  {t('lessons.startLesson')} →
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/language')}
            className="text-gray-500 hover:text-gray-700 font-semibold flex items-center justify-center mx-auto space-x-2"
          >
            <span>←</span>
            <span>{t('common.back')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelector;

