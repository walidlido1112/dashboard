const express = require('express');
const router = express.Router();

// تعريف المسار لملف البروفايل
router.get('/profile', (req, res) => {
  res.json({
    name: 'Richard Davis',
    email: 'richard.davis@example.com',
    phone: '(123) 456-7890',
    avatar: '/img/bruce-mars.jpeg',
    role: 'CEO / Co-Founder'
  });
});

module.exports = router;
