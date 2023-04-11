import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import {
  courtsRoutes,
  authRoutes,
  markersRoutes,
  usersRoutes,
} from "./routes/index.js";
import { on } from "events";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use("/auth", authRoutes);
app.use("/courts", courtsRoutes);
app.use("/markers", markersRoutes);
app.use("/users", usersRoutes);

const PORT = process.env.PORT || 8800;
const server = createServer(app);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`Server run on port ${PORT}`));
  })
  .catch((error) => console.log(error));

const io = new Server(server, {
  pingTimeout: 60000,
  pingInterval: 5000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("leave_chat", (chatId) => {
    socket.leave(chatId);
  });

  socket.on("send_message", (data) => {
    const clients = io.sockets.adapter.rooms.get(data.chatId);
    console.log(clients);
    io.to(data.chatId).emit("receive_message", data);
  });
});
