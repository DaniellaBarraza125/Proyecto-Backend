const express = require("express");
const ReviewController = require("../controllers/ReviewControllers");
const router = express.Router();

module.exports = router;

router.get("/", ReviewController.create);
