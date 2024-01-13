const express = require('express')

const medicineController = require('../controllers/medicineController');

const router = express.Router();

router.route('/').get(medicineController.LayTatCaThuoc)

module.exports = router;