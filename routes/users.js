const express = require("express");
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middleware/authentication");
const { singlePic } = require("../middleware/upload");

const router = express.Router();

router.post("/", singlePic, UserController.create);
router.get("/", UserController.getAll);
router.get("/name/:name", UserController.getByName);
router.post("/login", UserController.login);
router.delete("/id/:id", authentication, isAdmin, UserController.delete);
router.delete("/logout", authentication, UserController.logout);
router.get("/profile", authentication, UserController.showUser);

module.exports = router;
