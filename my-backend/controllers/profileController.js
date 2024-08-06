// profileController.js
const User = require('../models/User'); // تأكد من صحة مسار النموذج

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // تأكد من أن هذا هو المعرّف الصحيح من التوكن
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

module.exports = {
  getProfile,
};
