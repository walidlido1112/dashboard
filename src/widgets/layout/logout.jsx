import { useNavigate } from "react-router-dom";

// دالة لتسجيل الخروج
const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // إزالة التوكن من التخزين المحلي
    navigate("/auth/sign-in", { replace: true }); // إعادة التوجيه إلى صفحة تسجيل الدخول
  };

  return logout;
};
