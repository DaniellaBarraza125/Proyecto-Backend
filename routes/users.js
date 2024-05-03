const express = require("express");
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middleware/authentication");

const router = express.Router();

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.get("/name/:name", UserController.getByName);
router.post("/login", UserController.login);
router.delete("/id/:id", UserController.delete);
router.delete("/logout", authentication, UserController.delete);

module.exports = router;
