import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import UserPage from "./pages/user/UserPage";
import Home from "./pages/dashboard/Home";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAuthenticated(true);
        setRole(decoded.role); // افترض أن التوكن يحتوي على الدور في الحقل "role"
      } catch (error) {
        console.error("Invalid token:", error);
        setIsAuthenticated(false);
        setRole(null);
      }
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }
  }, [location]);

  return (
    <Routes>
      {/* التوجيهات الخاصة بالتوثيق */}
      <Route path="/auth/*" element={<Auth />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>

      {/* التوجيه بناءً على حالة التوثيق */}
      {!isAuthenticated ? (
        <>
          {/* صفحة تسجيل الدخول كصفحة رئيسية */}
          <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
          <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
        </>
      ) : (
        <>
          {/* التوجيهات الخاصة بلوحة التحكم */}
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            {/* يمكنك إضافة المزيد من التوجيهات الخاصة بلوحة التحكم هنا */}
          </Route>

          {/* التوجيه الخاص بصفحة المستخدم */}
          <Route path="/user" element={<UserPage />} />

          {/* التوجيه بناءً على الدور */}
          <Route
            path="/"
            element={
              role === "admin" ? (
                <Navigate to="/dashboard/home" replace />
              ) : (
                <Navigate to="/user" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
