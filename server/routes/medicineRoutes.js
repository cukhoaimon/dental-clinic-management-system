const express = require("express");

const medicineController = require("../controllers/medicineController");

const router = express.Router();

router.route("/").get(medicineController.getMedicines);
router.route("/:id").patch(medicineController.updateMedicine);

module.exports = router;
