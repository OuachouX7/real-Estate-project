const express = require("express");
const MessageController = require("../controllers/MessageController.js");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

router.post("/getMessages", verifyToken, MessageController.getMessages);
router.post("/messages", verifyToken, MessageController.sendMessages);

module.exports = router;
