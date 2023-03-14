import express from "express";
import multer from "multer";
import { addCourt, getCourts } from "../controllers/courts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const upload = multer();

// ADD COURT 
router.post("/", upload.none(), addCourt);

// GET COURTS
router.get("/", getCourts);

export default router;
