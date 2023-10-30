import express from "express";
const router = express.Router();
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(authMiddleware, getUsers)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

router.get("/:id", getUser);

export default router;
