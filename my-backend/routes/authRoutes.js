// authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// مسار التسجيل لا يحتاج إلى توكن
router.post('/register', registerUser);

// مسار تسجيل الدخول يحتاج إلى توكن إذا كان لديك تحققات
router.post('/login', loginUser);

module.exports = router;
