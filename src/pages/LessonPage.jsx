import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LottieAnimation from '../components/LottieAnimation';

const lessonsData = {
  maths: {
    lesson1: {
      title: 'Addition',
      animation: 'math_addition.json',
      description: 'Learn how to add numbers!',
      content: {
        en: 'Addition is putting numbers together. When you have 2 apples and add 3 more, you have 5 apples!',
        hi: 'जोड़ संख्याओं को एक साथ रखना है। जब आपके पास 2 सेब हैं और 3 और जोड़ते हैं, तो आपके पास 5 सेब हैं!',
        pa: 'ਜੋੜ ਨੰਬਰਾਂ ਨੂੰ ਇਕੱਠੇ ਕਰਨਾ ਹੈ। ਜਦੋਂ ਤੁਹਾਡੇ ਕੋਲ 2 ਸੇਬ ਹਨ ਅਤੇ 3 ਹੋਰ ਜੋੜਦੇ ਹੋ, ਤਾਂ ਤੁਹਾਡੇ ਕੋਲ 5 ਸੇਬ ਹਨ!'
      }
    },
    lesson2: {
      title: 'Subtraction',
      animation: 'math_subtraction.json',
      description: 'Learn how to subtract numbers!',
      content: {
        en: 'Subtraction is taking away. If you have 5 candies and give away 2, you have 3 left!',
        hi: 'घटाव छीनना है। यदि आपके पास 5 कैंडी हैं और आप 2 दे देते हैं, तो 3 बच जाते हैं!',
        pa: 'ਘਟਾਓ ਲੈਣਾ ਹੈ। ਜੇ ਤੁਹਾਡੇ ਕੋਲ 5 ਕੈਂਡੀ ਹਨ ਅਤੇ ਤੁਸੀਂ 2 ਦੇ ਦਿੱਤੀਆਂ, ਤਾਂ 3 ਬਾਕੀ ਰਹਿੰਦੀਆਂ ਹਨ!'
      }
    }
  },
  english: {
    lesson1: {
      title: 'Alphabet',
      animation: 'english_alphabet.json',
      description: 'Learn the letters of the alphabet!',
      content: {
        en: 'The alphabet has 26 letters. Each letter makes a different sound. A for Apple, B for Ball!',
        hi: 'वर्णमाला में 26 अक्षर हैं। प्रत्येक अक्षर एक अलग ध्वनि बनाता है। A सेब के लिए, B गेंद के लिए!',
        pa: 'ਵਰਣਮਾਲਾ ਵਿੱਚ 26 ਅੱਖਰ ਹਨ। ਹਰ ਅੱਖਰ ਇੱਕ ਵੱਖਰੀ ਆਵਾਜ਼ ਬਣਾਉਂਦਾ ਹੈ। A ਸੇਬ ਲਈ, B ਗੇਂਦ ਲਈ!'
      }
    }
  },
  evs: {
    lesson1: {
      title: 'Plants',
      animation: 'evs_plants.json',
      description: 'Learn about plants and nature!',
      content: {
        en: 'Plants need sunlight, water, and soil to grow. They give us food, oxygen, and beautiful flowers!',
        hi: 'पौधों को बढ़ने के लिए धूप, पानी और मिट्टी की जरूरत होती है। वे हमें भोजन, ऑक्सीजन और सुंदर फूल देते हैं!',
        pa: 'ਪੌਦਿਆਂ ਨੂੰ ਵਧਣ ਲਈ ਧੁੰਦ, ਪਾਣੀ ਅਤੇ ਮਿੱਟੀ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ। ਉਹ ਸਾਨੂੰ ਖਾਣਾ, ਆਕਸੀਜਨ ਅਤੇ ਸੁੰਦਰ ਫੁੱਲ ਦਿੰਦੇ ਹਨ!'
      }
    }
  }
};

const LessonPage = () => {
  const { subject, lessonId } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(true);

  const lesson = lessonsData[subject]?.[lessonId] || lessonsData.maths.lesson1;

  const handleTakeQuiz = () => {
    navigate(`/quiz/${subject}/${lessonId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/subjects')}
          className="mb-6 text-gray-500 hover:text-gray-700 font-semibold flex items-center space-x-2"
        >
          <span>←</span>
          <span>{t('common.back')}</span>
        </button>

        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-fun font-bold text-gray-800 mb-2">
            {lesson.title}
          </h1>
          <p className="text-lg text-gray-600">
            {lesson.description}
          </p>
        </div>

        <div className="bg-white/80 rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-fun font-bold text-gray-700">
              {t('lessons.watchAnimation')}
            </h2>
            <button
              onClick={() => setShowAnimation(!showAnimation)}
              className="text-sm bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full font-semibold"
            >
              {showAnimation ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showAnimation && (
            <div className="flex justify-center">
              <LottieAnimation 
                animationName={lesson.animation}
                height={280}
                width={280}
                className="animate-float"
              />
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-fun font-bold text-gray-700 mb-4">
            📖 {t('lessons.startLesson')}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {lesson.content[language] || lesson.content.en}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleTakeQuiz}
            className="btn-hover bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl"
          >
            {t('lessons.takeQuiz')} 🎯
          </button>
          
          <button
            onClick={() => navigate('/subjects')}
            className="btn-hover bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl"
          >
            {t('subjects.selectSubject')} 📚
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;

