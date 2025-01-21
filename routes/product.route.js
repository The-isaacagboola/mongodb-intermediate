const express = require("express");
const { addSampleProducts } = require("../controllers/add-sample.controllers");
const router = express.Router();

router.post("/add", addSampleProducts);

module.exports = router;
