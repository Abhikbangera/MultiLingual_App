import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LottieAnimation from '../components/LottieAnimation';

const LanguageSelector = () => {
  const { t, setLanguage, language } = useLanguage();
  const navigate = useNavigate();

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    navigate('/subjects');
  };

  const languages = [
    { code: 'en', flag: '🇬🇧', name: t('language.english'), color: 'from-blue-400 to-blue-600' },
    { code: 'hi', flag: '🇮🇳', name: t('language.hindi'), color: 'from-orange-400 to-orange-600' },
    { code: 'pa', flag: '🏏', name: t('language.punjabi'), color: 'from-green-400 to-green-600' }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <LottieAnimation 
            height={150} 
            width={150} 
            className="animate-float mb-4"
          />
          
          <h1 className="text-3xl sm:text-4xl font-fun font-bold text-gray-800 mb-4">
            {t('language.selectLanguage')}
          </h1>
          
          <p className="text-lg text-gray-600">
            Choose your preferred language to start learning
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`language-btn card-hover bg-gradient-to-br ${lang.color} rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}
            >
              <div className="text-6xl sm:text-7xl mb-4">
                {lang.flag}
              </div>
              <h3 className="text-2xl sm:text-3xl font-fun font-bold text-white mb-2">
                {lang.name}
              </h3>
              {language === lang.code && (
                <div className="text-white text-lg">
                  ✓ {t('common.selected')}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/')}
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

export default LanguageSelector;

