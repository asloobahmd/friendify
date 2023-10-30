import express from "express";
const router = express.Router();
import {
  deleteComments,
  getCommentCount,
  getComments,
  postComments,
} from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.route("/").get(getComments).post(authMiddleware, postComments);

router
  .route("/:id")
  .get(getCommentCount)
  .delete(authMiddleware, deleteComments);

export default router;
