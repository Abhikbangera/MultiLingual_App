import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LottieAnimation from '../components/LottieAnimation';

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/language');
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <div className="mb-6">
            <LottieAnimation 
              height={200} 
              width={200} 
              className="animate-float"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-fun font-bold text-gray-800 mb-4">
            {t('home.welcomeMessage')}
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-6">
            {t('home.letsLearn')}
          </p>

          <p className="text-lg sm:text-xl text-primary-600 font-semibold mb-8">
            {t('app.tagline')}
          </p>

          <button
            onClick={handleStartLearning}
            className="btn-hover bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xl sm:text-2xl font-bold py-4 px-8 sm:py-5 sm:px-12 rounded-2xl shadow-lg hover:shadow-xl"
          >
            {t('home.startLearning')} 🚀
          </button>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-fun font-bold text-center text-gray-700 mb-8">
            {t('home.chooseSubject')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div 
              className="subject-math card-hover rounded-3xl p-6 text-center cursor-pointer"
              onClick={() => navigate('/subjects')}
            >
              <div className="text-6xl sm:text-7xl mb-4">🔢</div>
              <h3 className="text-2xl font-fun font-bold text-amber-700 mb-2">
                {t('subjects.maths.name')}
              </h3>
              <p className="text-lg text-amber-600">
                {t('subjects.maths.description')}
              </p>
            </div>

            <div 
              className="subject-english card-hover rounded-3xl p-6 text-center cursor-pointer"
              onClick={() => navigate('/subjects')}
            >
              <div className="text-6xl sm:text-7xl mb-4">📚</div>
              <h3 className="text-2xl font-fun font-bold text-blue-700 mb-2">
                {t('subjects.english.name')}
              </h3>
              <p className="text-lg text-blue-600">
                {t('subjects.english.description')}
              </p>
            </div>

            <div 
              className="subject-evs card-hover rounded-3xl p-6 text-center cursor-pointer"
              onClick={() => navigate('/subjects')}
            >
              <div className="text-6xl sm:text-7xl mb-4">🌿</div>
              <h3 className="text-2xl font-fun font-bold text-green-700 mb-2">
                {t('subjects.evs.name')}
              </h3>
              <p className="text-lg text-green-600">
                {t('subjects.evs.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/80 rounded-2xl p-4 shadow-md card-hover">
              <div className="text-4xl mb-2">🎬</div>
              <p className="font-fun font-bold text-gray-700">Fun Animations</p>
            </div>
            <div className="bg-white/80 rounded-2xl p-4 shadow-md card-hover">
              <div className="text-4xl mb-2">📝</div>
              <p className="font-fun font-bold text-gray-700">Interactive Quizzes</p>
            </div>
            <div className="bg-white/80 rounded-2xl p-4 shadow-md card-hover">
              <div className="text-4xl mb-2">🌏</div>
              <p className="font-fun font-bold text-gray-700">3 Languages</p>
            </div>
            <div className="bg-white/80 rounded-2xl p-4 shadow-md card-hover">
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-fun font-bold text-gray-700">Track Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

