const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./connection/connection.js");
const UserController = require("./controllers/UserController.js");
const MessageController = require("./controllers/MessageController.js");

const app = express();

const PORT = 5000;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

try {
  app.get("/", UserController.getUsers);
  app.post(
    "/users",
    UserController.upload.single("avatar"),
    UserController.SignUp
  );
  app.get("/messages", MessageController.getMessages);
  app.post("/messages", MessageController.sendMessages);
} catch (error) {
  console.error("Error in server setup:", error);
  process.exit(1);
}

app.listen(PORT, () => {
  console.log("listening on port 5000");
});
