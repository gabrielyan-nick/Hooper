import express from "express";
import multer from "multer";
import { addCourt, getCourt, addRemoveFav } from "../controllers/courts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const upload = multer();

// ADD COURT
router.post("/", upload.none(), addCourt);

// GET COURT
router.get("/:id", getCourt);

// ADD/REMOVE FAVOURITE
router.patch("/:courtId/fav", upload.none(), verifyToken, addRemoveFav);

export default router;
