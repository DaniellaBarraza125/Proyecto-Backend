const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const { authentication, isAdmin } = require("../middleware/authentication");

const router = express.Router();

router.post("/", authentication, CategoryController.create);
router.put("/id/:id", CategoryController.update);
router.delete("/id/:id", CategoryController.delete);

module.exports = router;
