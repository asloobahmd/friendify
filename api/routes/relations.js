import express from "express";
import {
  addRelation,
  delRelation,
  getRelations,
} from "../controllers/relationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(getRelations)
  .post(authMiddleware, addRelation)
  .delete(authMiddleware, delRelation);

export default router;
