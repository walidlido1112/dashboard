const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // تأكد من صحة المسار
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile
} = require('../controllers/userController'); // تأكد من صحة المسار

const router = express.Router();
const User = require('../models/User'); // تأكد من صحة المسار إلى نموذج المستخدم

// تعريف المسارات
router.get('/', protect, getUsers);  // استرجاع جميع المستخدمين
router.get('/:id', protect, getUserById);  // استرجاع مستخدم حسب المعرف
router.put('/:id', protect, updateUser);  // تحديث مستخدم حسب المعرف
router.delete('/:id', protect, deleteUser);  // حذف مستخدم حسب المعرف

router.get('/profile', async (req, res) => {
  try {
    // هنا يمكنك استخدام `req.user` للوصول إلى معلومات المستخدم إذا كنت تستخدم التوكن
    const user = await User.findById(req.user.id); // افتراضًا أنك تقوم بعمل توثيق
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
