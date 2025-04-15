const { json } = require("body-parser");
const messageModel = require("../models/messages.js");

const getMessages = async (req, res) => {
  try {
    const Rbody = req.body.userIds;
    const messages = await messageModel.find({
      $or: [
        { sender: Rbody[0], receiver: Rbody[1] },
        { sender: Rbody[1], receiver: Rbody[0] },
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
