import axios from 'axios';

// إنشاء نسخة مخصصة من axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// إعداد التوكن بشكل افتراضي إذا كان موجودًا
axiosInstance.interceptors.request.use(
  (config) => {
    // الحصول على التوكن من التخزين المحلي
    const token = localStorage.getItem('token');

    // إذا كان هناك توكن، أضفها إلى رأس الطلب
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
