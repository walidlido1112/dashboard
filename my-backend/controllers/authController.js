const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// تسجيل مستخدم جديد
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body; // تأكد من تضمين الدور إذا كان موجودًا في التسجيل

  if (!name || !email || !password || !phone) {
    res.status(400);
    throw new Error('يرجى ملء جميع الحقول بما في ذلك رقم الهاتف');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('المستخدم موجود بالفعل. يرجى تسجيل الدخول أو استخدام بريد إلكتروني مختلف.');
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: role || 'employee', // تعيين الدور الافتراضي إلى "موظف" إذا لم يكن محددًا
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role, // إرجاع الدور في الاستجابة
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error('فشل في تسجيل المستخدم. يرجى المحاولة مرة أخرى.');
  }
});

// تسجيل الدخول
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role, // إرجاع الدور في الاستجابة
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401);
    throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق وإعادة المحاولة.');
  }
});

module.exports = { registerUser, loginUser };
