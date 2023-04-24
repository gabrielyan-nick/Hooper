import express from "express";
import multer from "multer";
import {
  updateUserInfo,
  getUserInfo,
  addSocialLink,
  //   delSocialLink
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
// router.delete("/:id/links/:linkId", upload.none(), verifyToken, delSocialLink);

// EDIT SOCIAL LINK
// router.patch("/:id/links/:linkId", upload.none(), verifyToken, editSocialLink);

export default router;
