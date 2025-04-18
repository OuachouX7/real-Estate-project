const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const http = require("http");
const connectDB = require("./connection/connection.js");
const UserController = require("./controllers/UserController.js");
const MessageController = require("./controllers/MessageController.js");
const verifyToken = require("./middlewares/verifyToken.js");
const { EventEmitter } = require("events");
EventEmitter.defaultMaxListeners = 20;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (message) => {
    console.log("Message received:", message);

    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 5000;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

try {
  app.get("/users", verifyToken, UserController.getUsers);
  app.get("/users/:id", verifyToken, UserController.getUserById);
  app.post(
    "/users",
    UserController.upload.single("avatar"),
    UserController.SignUp
  );
  app.post("/getMessages", verifyToken, MessageController.getMessages);
  app.post("/messages", verifyToken, MessageController.sendMessages);
  app.post("/login", UserController.Login);
} catch (error) {
  console.error("Error in server setup:", error);
  process.exit(1);
}

server.listen(PORT, () => {
  console.log("listening on port 5000");
});
