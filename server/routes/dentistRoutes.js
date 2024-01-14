const express = require("express");

const dentistController = require("../controllers/dentistController");

const router = express.Router();

// PROC: Kê đơn thuốc
router.route("/prescribe-medication").post(dentistController.KeDonThuoc);
router.route("/patients").get(dentistController.getAllPatient);
router.route("/patient-records/:phone").get(dentistController.getPatientRecord);
router.route("/appointments/:phone").get(dentistController.getAppointments);
router.route("/").get(dentistController.getDentists);

module.exports = router;
