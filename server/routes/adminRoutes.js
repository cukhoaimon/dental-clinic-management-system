const express = require('express')

const adminController = require('../controllers/adminController');

const router = express.Router();

// PROC: Khóa tài khoản người dùng
router.route('/manage-users').patch(adminController.LockUser)

module.exports = router;