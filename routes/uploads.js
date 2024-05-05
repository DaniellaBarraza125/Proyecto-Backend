const multer = require("multer");
const express = require("express");
const UploadController = require("../controllers/uploadController");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/profile", upload.single("profile"), UploadController.profile);
router.post(
    "/produtcs",
    upload.array("products", 5),
    UploadController.products,
);

module.exports = router;
