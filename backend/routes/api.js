import express from "express";
const router = express.Router();
import { black, white, whiteNum } from "../controllers/api.js";

router.get("/black", black);

router.get("/white", white);

router.get("/white/:num", whiteNum);

export default router;
