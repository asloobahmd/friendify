import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
import {
  AddPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";

router.use(authMiddleware);

router
  .route("/")
  .get(getPosts)
  .post(AddPost)
  .put(updatePost)
  .delete(deletePost);

router.get("/:id", getPost);

export default router;
