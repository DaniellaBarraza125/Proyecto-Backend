const express = require("express");
const OrderController = require("../controllers/OrderController");
const { authentication, isAdmin } = require("../middleware/authentication");
const router = express.Router();

router.post("/", authentication, OrderController.create);

module.exports = router;
