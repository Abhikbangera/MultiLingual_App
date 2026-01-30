import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getStudentProgressSummary } from '../firebase/crud';
import LottieAnimation from '../components/LottieAnimation';

const TeacherDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalLessons: 0,
    averageProgress: 0
  });

  const demoStudents = [
    { id: '1', name: 'Amit Kumar', class: '3', completedLessons: 5, totalQuizzes: 8, averageScore: 75, progress: 60 },
    { id: '2', name: 'Priya Sharma', class: '4', completedLessons: 8, totalQuizzes: 12, averageScore: 88, progress: 85 },
    { id: '3', name: 'Rahul Singh', class: '2', completedLessons: 3, totalQuizzes: 5, averageScore: 62, progress: 40 },
    { id: '4', name: 'Sneha Gupta', class: '5', completedLessons: 10, totalQuizzes: 15, averageScore: 92, progress: 95 },
    { id: '5', name: 'Vikram Patel', class: '3', completedLessons: 6, totalQuizzes: 9, averageScore: 71, progress: 65 },
    { id: '6', name: 'Anita Devi', class: '4', completedLessons: 9, totalQuizzes: 14, averageScore: 85, progress: 80 },
  ];

  useEffect(() => {
    if (isLoggedIn) loadStudentData();
  }, [isLoggedIn]);

  const loadStudentData = async () => {
    setLoading(true);
    try {
      const result = await getStudentProgressSummary();
      if (result.success && result.data.length > 0) setStudents(result.data);
      else setStudents(demoStudents);
    } catch (error) {
      setStudents(demoStudents);
    }
    setStats({
      totalStudents: demoStudents.length,
      totalLessons: demoStudents.reduce((acc, s) => acc + s.completedLessons, 0),
      averageProgress: Math.round(demoStudents.reduce((acc, s) => acc + s.progress, 0) / demoStudents.length)
    });
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (email && password.length >= 6) {
        setIsLoggedIn(true);
        setLoading(false);
      } else {
        setError('Please enter valid credentials');
        setLoading(false);
      }
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setStudents([]);
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <LottieAnimation height={150} width={150} className="animate-float mb-4" />
            <h1 className="text-3xl sm:text-4xl font-fun font-bold text-gray-800 mb-2">
              👩‍🏫 {t('dashboard.teacherLogin')}
            </h1>
          </div>
          <div className="bg-white/80 rounded-3xl p-6 shadow-lg">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">📧 {t('dashboard.email')}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none text-lg"
                  placeholder="teacher@school.com" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">🔒 {t('dashboard.password')}</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none text-lg"
                  placeholder="••••••••" required minLength={6} />
              </div>
              {error && <div className="bg-red-100 border-2 border-red-300 rounded-xl p-3 text-red-700 text-center">{error}</div>}
              <button type="submit" disabled={loading}
                className="w-full btn-hover bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-4 rounded-2xl shadow-lg">
                {loading ? t('common.loading') : `🚀 ${t('dashboard.login')}`}
              </button>
            </form>
          </div>
          <div className="mt-6 text-center">
            <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700 font-semibold">← {t('common.back')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-3xl sm:text-4xl font-fun font-bold text-gray-800">👩‍🏫 {t('dashboard.welcomeTeacher')}</h1>
          </div>
          <button onClick={handleLogout}
            className="btn-hover bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full shadow-lg">
            🚪 {t('dashboard.logout')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
            <div className="text-4xl mb-2">👨‍🎓</div>
            <p className="text-3xl sm:text-4xl font-bold">{stats.totalStudents}</p>
            <p className="text-lg opacity-90">{t('dashboard.totalStudents')}</p>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-6 text-white shadow-lg">
            <div className="text-4xl mb-2">📚</div>
            <p className="text-3xl sm:text-4xl font-bold">{stats.totalLessons}</p>
            <p className="text-lg opacity-90">{t('dashboard.totalLessons')}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-3xl sm:text-4xl font-bold">{stats.averageProgress}%</p>
            <p className="text-lg opacity-90">{t('dashboard.averageProgress')}</p>
          </div>
        </div>

        <div className="bg-white/80 rounded-3xl p-6 shadow-lg">
          <h2 className="text-2xl font-fun font-bold text-gray-800 mb-6">📊 {t('dashboard.studentProgress')}</h2>
          {loading ? (
            <div className="flex justify-center items-center py-12"><div className="loading-spinner"></div></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="dashboard-table w-full">
                <thead>
                  <tr>
                    <th className="rounded-tl-xl">{t('dashboard.studentName')}</th>
                    <th>{t('dashboard.class')}</th>
                    <th>{t('dashboard.lessonsCompleted')}</th>
                    <th>{t('dashboard.quizzesTaken')}</th>
                    <th>{t('dashboard.averageScore')}</th>
                    <th className="rounded-tr-xl">{t('dashboard.progress')}</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-green-50">
                      <td className="font-semibold text-gray-800">{student.name}</td>
                      <td>{student.class}</td>
                      <td>{student.completedLessons}</td>
                      <td>{student.totalQuizzes}</td>
                      <td><span className={`score-badge ${getScoreClass(student.averageScore)}`}>{student.averageScore}%</span></td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-3">
                            <div className={`h-3 rounded-full ${student.progress >= 80 ? 'bg-green-500' : student.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${student.progress}%` }}></div>
                          </div>
                          <span className="text-sm font-semibold">{student.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {students.length === 0 && !loading && (
            <div className="text-center py-12"><p className="text-xl text-gray-500">{t('dashboard.noStudents')}</p></div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700 font-semibold">🏠 {t('common.home')}</button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

