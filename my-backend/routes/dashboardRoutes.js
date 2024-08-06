const express = require('express');
const router = express.Router();

// إضافة المسارات الخاصة بالـ Dashboard هنا

// مثال لمسار GET
router.get('/some-path', (req, res) => {
  res.json({ message: 'This is a protected route for the dashboard.' });
});

module.exports = router;
