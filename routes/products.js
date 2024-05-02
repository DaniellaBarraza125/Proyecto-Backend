const express = require("express");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.delete("/id/:id", ProductController.delete);

module.exports = router;
