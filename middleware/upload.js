const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        cb(null, originalName);
    },
});
const upload = multer({ storage });

const singlePic = upload.single("profile");
const multiplePics = upload.array("photos", 5);

module.exports = { singlePic, multiplePics };
