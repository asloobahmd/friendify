import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router
  .route("/")
  .get(getPosts)
  .post(addPost)
  .put(updatePost)
  .delete(deletePost);

router.get("/:id", getPost);

export default router;
