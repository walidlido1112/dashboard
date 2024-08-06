import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  let userRole = null;

  if (token) {
    try {
      // فك تشفير التوكن للحصول على بيانات المستخدم
      const decoded = JSON.parse(atob(token.split('.')[1]));
      userRole = decoded.role;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  // التحقق مما إذا كان التوكن موجودًا وتطابق الدور
  if (!token || userRole !== role) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // عرض العناصر (الصفحة المحمية) إذا كان كل شيء صحيح
  return children;
};

export default ProtectedRoute;
