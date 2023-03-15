import express from "express";
// import multer from "multer";
import { getMarkers } from "../controllers/markers.js";


const router = express.Router();
// const upload = multer();

router.get("/", getMarkers);

export default router;
