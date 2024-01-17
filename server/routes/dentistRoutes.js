const express = require("express");

const dentistController = require("../controllers/dentistController");

const router = express.Router();

// PROC: Kê đơn thuốc
router.route("/prescribe-medication").post(dentistController.prescribeMedication);
// PROC: Kê đơn thuốc chờ
router.route("/prescribe-medication-wait").post(dentistController.prescribeMedicationWait);

router.route("/patients").get(dentistController.getAllPatient);
router.route("/patient-records/:phone").get(dentistController.getPatientRecord);
router.route("/appointments/:phone").get(dentistController.getAppointments);
router.route("/").get(dentistController.getDentists);
router.route("/medicines").get(dentistController.getAllMedicines);
router.route("/medical-examinations/:id").get(dentistController.getMedicalExamination);

module.exports = router;
