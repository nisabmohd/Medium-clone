import express from "express";
import { googleAuth } from "../controllers/auth.controller";
const router = express.Router();

router.route("/google/oauth").get(googleAuth);

export default router;
