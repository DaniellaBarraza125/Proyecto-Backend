const express = require("express");
const ReviewController = require("../controllers/ReviewControllers");
const router = express.Router();

router.post("/", ReviewController.create);
router.get("/", ReviewController.getAll);
router.delete("/id/:id", ReviewController.delete);

module.exports = router;
