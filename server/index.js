import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const port = 4545;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello");
});

io.on("connection", (Socket) => {
  console.log("User Connected " + Socket.id);

  Socket.emit("welcome", "Welcome to the realtime data" + Socket.id);
  Socket.on("message", (s) => {
    console.log(s, Socket.id);
    io.emit("recive", s);
  });
  // Socket.broadcast.emit("welcome", "Welcome to the realtime data" + Socket.id);
  Socket.on("disconnect", () => {
    console.log(`User Disconnect ${Socket.id}`);
  });
});

server.listen(port, () => {
  console.log("server is rinning at port", port);
});
