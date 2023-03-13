import express from "express";
import multer from "multer";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const upload = multer();

