const express = require('express');
const { addAdmin } = require('../controllers/userController');
const router = express.Router();

// Route لإضافة مدير
router.post('/add-admin', addAdmin);

module.exports = router;
