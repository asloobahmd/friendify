import express from "express";
import { addLikes, delLikes, getLikes } from "../controllers/likeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(getLikes)
  .post(authMiddleware, addLikes)
  .delete(authMiddleware, delLikes);

export default router;
