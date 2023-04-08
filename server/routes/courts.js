import express from "express";
import multer from "multer";
import {
  addCourt,
  getCourt,
  addRemoveFav,
  checkInOnCourt,
  checkOutOnCourt,
  getCourtPlayers,
  updateCourtInfo,
  getChatMessages,
  postChatMessage,
  // updateChatMessage,
  // deleteChatMessage,
} from "../controllers/courts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const upload = multer();

// ADD COURT
router.post("/", upload.none(), addCourt);

// UPDATE COURT INFO
router.patch("/:id", upload.none(), updateCourtInfo);

// GET COURT
router.get("/:id", getCourt);

// ADD/REMOVE FAVOURITE
router.patch("/:courtId/fav", upload.none(), verifyToken, addRemoveFav);

// CHECK-IN
router.post("/:courtId/checkin", upload.none(), verifyToken, checkInOnCourt);

// CHECK-OUT
router.post("/:courtId/checkout", upload.none(), verifyToken, checkOutOnCourt);

// GET PLAYERS LIST
router.get("/:courtId/players", getCourtPlayers);

// GET CHAT MESSAGES
router.get("/:courtId/chat/:chatId", getChatMessages);

// POST CHAT MESSAGE
router.post("/:courtId/chat/:chatId/messages", postChatMessage);

// // UPDATE CHAT MESSAGE
// router.put("/:courtId/chat/:chatId/messages/:messageId", updateChatMessage);

// // DELETE CHAT MESSAGE
// router.delete("/:courtId/chat/:chatId/messages/:messageId", deleteChatMessage);

export default router;
