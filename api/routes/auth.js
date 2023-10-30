import express from "express";
const router = express.Router();
import { Login, Logout, Register } from "../controllers/authController.js";

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;
