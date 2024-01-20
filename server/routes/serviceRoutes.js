const express = require("express");

const serviceController = require("../controllers/serviceController");

const router = express.Router();

router.route("/").get(serviceController.getAllServices);

module.exports = router;
