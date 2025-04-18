const messageModel = require("../models/messages.js");

const getMessages = async (req, res) => {
  try {
    const userIds = req.body.userIds;

    if (!userIds || userIds.length < 2) {
      return res.status(400).json({ message: "Invalid or missing userIds" });
    }

    const messages = await messageModel.find({
      $or: [
        { sender: userIds[0], receiver: userIds[1] },
        { sender: userIds[1], receiver: userIds[0] },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching messages" });
  }
};

const sendMessages = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    const newMessage = new messageModel({
      sender,
      receiver,
      message,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending message" });
  }
};

module.exports = {
  getMessages,
  sendMessages,
};
