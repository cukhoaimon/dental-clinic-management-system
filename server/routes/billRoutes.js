const express = require('express')


const billController = require('../controllers/billController');

const router = express.Router();

// PROC: Khóa tài khoản người dùng

router.route('/:id').get(billController.getBill)
.post(billController.createBill)
// PROC: Đăng nhập

module.exports = router;