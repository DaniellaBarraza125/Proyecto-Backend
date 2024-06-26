const express = require("express");
const ProductController = require("../controllers/ProductController");
const { authentication, isAdmin } = require("../middleware/authentication");
const { singlePic } = require("../middleware/upload");
const router = express.Router();

router.post("/", authentication, isAdmin, singlePic, ProductController.create);
router.get("/", ProductController.getAll);
router.get("/orderAsc", ProductController.oderAsc);
router.get("/orderDesc", ProductController.oderDesc);
router.get("/id/:id", ProductController.getById);
router.get("/name/:name", ProductController.getByName);
router.get("/price/:price", ProductController.getByPrice);
router.delete("/id/:id", authentication, isAdmin, ProductController.delete);
router.put(
    "/id/:id",
    authentication,
    isAdmin,
    singlePic,
    ProductController.update,
);

module.exports = router;
