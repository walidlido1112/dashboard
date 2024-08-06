const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// دالة الحصول على جميع المستخدمين
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// دالة الحصول على مستخدم بواسطة ID
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// دالة تحديث مستخدم
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        user.password = password; // تأكد من تشفير كلمة المرور قبل حفظها
      }
      user.role = role || user.role;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// دالة حذف مستخدم
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    // الحصول على معرف المستخدم من req.user
    const userId = req.user._id;

    // العثور على المستخدم
    const user = await User.findById(userId);
    if (user) {
      res.json({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
});
module.exports = { getUsers, getUserById, updateUser, deleteUser, getUserProfile };
