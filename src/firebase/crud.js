// Firebase CRUD Operations for Student Data, Quizzes, and Progress

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// Collection references
const STUDENTS_COLLECTION = 'students';
const SCORES_COLLECTION = 'scores';
const LESSONS_COLLECTION = 'lessons';
const TEACHERS_COLLECTION = 'teachers';

// ==================== STUDENT OPERATIONS ====================

// Create a new student
export const createStudent = async (studentData) => {
  try {
    const docRef = await addDoc(collection(db, STUDENTS_COLLECTION), {
      ...studentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating student:', error);
    return { success: false, error: error.message };
  }
};

// Get all students
export const getAllStudents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, STUDENTS_COLLECTION));
    const students = [];
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: students };
  } catch (error) {
    console.error('Error getting students:', error);
    return { success: false, error: error.message };
  }
};

// Get student by ID
export const getStudentById = async (studentId) => {
  try {
    const docRef = doc(db, STUDENTS_COLLECTION, studentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: 'Student not found' };
    }
  } catch (error) {
    console.error('Error getting student:', error);
    return { success: false, error: error.message };
  }
};

// Update student progress
export const updateStudentProgress = async (studentId, progressData) => {
  try {
    const docRef = doc(db, STUDENTS_COLLECTION, studentId);
    await updateDoc(docRef, {
      ...progressData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating student progress:', error);
    return { success: false, error: error.message };
  }
};

// ==================== SCORE OPERATIONS ====================

// Save quiz score
export const saveQuizScore = async (scoreData) => {
  try {
    const docRef = await addDoc(collection(db, SCORES_COLLECTION), {
      ...scoreData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving score:', error);
    return { success: false, error: error.message };
  }
};

// Get scores by student
export const getScoresByStudent = async (studentId) => {
  try {
    const q = query(
      collection(db, SCORES_COLLECTION),
      where('studentId', '==', studentId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const scores = [];
    querySnapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: scores };
  } catch (error) {
    console.error('Error getting scores:', error);
    return { success: false, error: error.message };
  }
};

// Get all scores (for teacher dashboard)
export const getAllScores = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, SCORES_COLLECTION));
    const scores = [];
    querySnapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: scores };
  } catch (error) {
    console.error('Error getting all scores:', error);
    return { success: false, error: error.message };
  }
};

// ==================== LESSON OPERATIONS ====================

// Get all lessons
export const getAllLessons = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, LESSONS_COLLECTION));
    const lessons = [];
    querySnapshot.forEach((doc) => {
      lessons.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: lessons };
  } catch (error) {
    console.error('Error getting lessons:', error);
    return { success: false, error: error.message };
  }
};

// Mark lesson as completed
export const markLessonCompleted = async (studentId, lessonId) => {
  try {
    const completedLessonsRef = doc(db, STUDENTS_COLLECTION, studentId);
    const docSnap = await getDoc(completedLessonsRef);
    
    if (docSnap.exists()) {
      const completedLessons = docSnap.data().completedLessons || [];
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        await updateDoc(completedLessonsRef, {
          completedLessons,
          updatedAt: serverTimestamp()
        });
      }
    }
    return { success: true };
  } catch (error) {
    console.error('Error marking lesson completed:', error);
    return { success: false, error: error.message };
  }
};

// ==================== TEACHER OPERATIONS ====================

// Verify teacher login (simple email check)
export const verifyTeacher = async (email) => {
  try {
    const q = query(
      collection(db, TEACHERS_COLLECTION),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    return { success: true, exists: !querySnapshot.empty };
  } catch (error) {
    console.error('Error verifying teacher:', error);
    return { success: false, error: error.message };
  }
};

// Get student progress summary for dashboard
export const getStudentProgressSummary = async () => {
  try {
    const studentsResult = await getAllStudents();
    const scoresResult = await getAllScores();
    
    if (!studentsResult.success || !scoresResult.success) {
      throw new Error('Failed to fetch data');
    }
    
    const students = studentsResult.data;
    const scores = scoresResult.data;
    
    // Calculate progress for each student
    const progressSummary = students.map(student => {
      const studentScores = scores.filter(s => s.studentId === student.id);
      const totalQuizzes = studentScores.length;
      const averageScore = totalQuizzes > 0 
        ? Math.round(studentScores.reduce((acc, s) => acc + s.percentage, 0) / totalQuizzes)
        : 0;
      const completedLessons = student.completedLessons?.length || 0;
      
      return {
        ...student,
        totalQuizzes,
        averageScore,
        completedLessons
      };
    });
    
    return { success: true, data: progressSummary };
  } catch (error) {
    console.error('Error getting progress summary:', error);
    return { success: false, error: error.message };
  }
};

