const userModel = require("../models/users.js");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Configure multer for file uploads
const uploadFolderPath = path.join(__dirname, "../uploads"); 
if (!fs.existsSync(uploadFolderPath)) {
  fs.mkdirSync(uploadFolderPath);
}

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolderPath); 
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const name = file.originalname.split(".")[0];
    const newFileName = `${name}-${Date.now()}.${ext}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: diskStorage });

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const SignUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const avatar = req.file ? req.file.filename : null; 

    const newUser = new userModel({
      name,
      email,
      phone,
      password,
      profile_picture: avatar,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

module.exports = {
  getUsers,
  SignUp,
  upload,
};
