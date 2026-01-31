import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LanguageSelector from './pages/LanguageSelector';
import SubjectSelector from './pages/SubjectSelector';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import Results from './pages/Results';
import TeacherDashboard from './pages/TeacherDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/language" element={<LanguageSelector />} />
        <Route path="/subjects" element={<SubjectSelector />} />
        <Route path="/lesson/:subject/:lessonId" element={<LessonPage />} />
        <Route path="/quiz/:subject/:quizId" element={<QuizPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/dashboard" element={<TeacherDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
