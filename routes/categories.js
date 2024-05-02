const express = require("express");
const CategoryController = require("../controllers/CategoryController");

const router = express.Router();

router.post("/", CategoryController.create);
router.put("/id/:id", CategoryController.update);

module.exports = router;
