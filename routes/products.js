const express = require("express");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/orderAsc", ProductController.oderAsc);
router.get("/orderDesc", ProductController.oderDesc);

router.get("/id/:id", ProductController.getById);
router.get("/name/:name", ProductController.getByName);
router.get("/price/:price", ProductController.getByPrice);
router.delete("/id/:id", ProductController.delete);
router.put("/id/:id", ProductController.update);

module.exports = router;
