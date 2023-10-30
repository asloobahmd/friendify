import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

import AuthRouter from "./routes/auth.js";
import PostRouter from "./routes/posts.js";
import LikesRouter from "./routes/Likes.js";
import CommentRouter from "./routes/comments.js";
import UserRoutes from "./routes/users.js";
import RelationRoute from "./routes/relations.js";

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    // credentials: true,
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(401).json("Image is null");
  res.status(200).json(file.filename);
});

app.use("/api/auth", AuthRouter);
app.use("/api/posts", PostRouter);
app.use("/api/users", UserRoutes);
app.use("/api/likes", LikesRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/relations", RelationRoute);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
