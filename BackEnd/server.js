const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const Message = require("./model/message");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Update to your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Update to your frontend URL
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/", userRouter);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join room (for private messaging)
  socket.on("joinRoom", (receiverId) => {
    socket.join(receiverId);
  });

  // Handle sending messages
  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, text } = data;

    const message = new Message({
      senderId,
      receiverId,
      message: text,
    });

    try {
      await message.save();
      console.log("Message saved:", message);
      io.to(receiverId).emit("messageReceived", message);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

mongoose.connect("mongodb://localhost:27017/Taranslate", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

server.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
