const express = require("express");
const ReviewController = require("../controllers/ReviewControllers");
const { multiplePics } = require("../middleware/upload");
const router = express.Router();

router.post("/", multiplePics, ReviewController.create);
router.get("/", ReviewController.getAll);
router.delete("/id/:id", ReviewController.delete);

module.exports = router;
