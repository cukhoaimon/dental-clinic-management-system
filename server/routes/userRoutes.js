const express = require('express')

const userController = require('../controllers/userController');

const router = express.Router();

// PROC: Xem thông tin cá nhân
router.route('/:id').get(userController.getProfile)

// PROC: Xem hồ sơ bệnh nhân - Ghi nhận lần khám
router.route('/:id/medical-record').get(userController.getMedicalRecord).post(userController.recordExamination)

module.exports = router;