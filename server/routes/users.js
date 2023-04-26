import express from "express";
import multer from "multer";
import {
  updateUserInfo,
  getUserInfo,
  addSocialLink,
  delSocialLink,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const upload = multer();

// GET USER INFO
router.get("/:id", getUserInfo);

// UPDATE USER INFO
router.patch("/:id", upload.none(), verifyToken, updateUserInfo);

// ADD SOCIAL LINK
router.post("/:userId/links", upload.none(), verifyToken, addSocialLink);

// DELETE SOCIAL LINK
router.delete("/:userId/links/:linkId", verifyToken, delSocialLink);

export default router;
