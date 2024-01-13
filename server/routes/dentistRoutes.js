const express = require("express");

const dentistController = require("../controllers/dentistController");

const router = express.Router();

// PROC: Kê đơn thuốc
router.route("/prescribe-medication").post(dentistController.KeDonThuoc);
router.route("/").get(dentistController.getDentists);

module.exports = router;
