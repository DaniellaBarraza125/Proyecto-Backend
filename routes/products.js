const express = require("express");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.delete("/id/:id", ProductController.delete);
router.put("/id/:id", ProductController.update);

module.exports = router;
