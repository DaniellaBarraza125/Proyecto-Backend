const multer = require("multer");
const express = require("express");
const UploadController = require("../controllers/uploadController");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/single", upload.single("profile"), UploadController.profile);

module.exports = router;
