const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const { authentication, isAdmin } = require("../middleware/authentication");

const router = express.Router();

router.post("/", authentication, isAdmin, CategoryController.create);
router.put("/id/:id", CategoryController.update);
router.get("/category/:category", CategoryController.getByCategory);
router.get("/", CategoryController.getAll);
router.get("/id/:id", CategoryController.getById);
router.delete("/id/:id", CategoryController.delete);

module.exports = router;
