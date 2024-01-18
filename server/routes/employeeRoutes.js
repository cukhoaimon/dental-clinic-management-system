const express = require("express");

const employeeController = require("../controllers/employeeController");

const router = express.Router();

router.route("/").get(employeeController.getEmployees);
router.route("/appointments").get(employeeController.getAppointments);
router.route("/records").get(employeeController.getRecords);

module.exports = router;
