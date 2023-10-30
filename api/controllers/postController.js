import { db } from "../db.js";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;

  const q = userId
    ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts p JOIN users u ON p.userId = u.id WHERE p.userId = ? ORDER BY p.createdAt DESC`
    : `SELECT p.*, u.id AS userId, name, profilePic FROM posts p JOIN users u ON p.userId = u.id 
        LEFT JOIN relationships r ON p.userId = r.followedUserId WHERE r.followerUserId = ? OR p.userId = ?
        ORDER BY p.createdAt DESC
        `;

  const values = userId ? [userId] : [req.userId, req.userId];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const AddPost = (req, res) => {
  const q = "INSERT INTO posts (`desc`, img, userId, createdAt) VALUES (?)";

  const VALUES = [
    req.body.desc,
    req.body.img,
    req.userId,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  ];

  db.query(q, [VALUES], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Post has been added");
  });
};

export const getPost = (req, res) => {};

export const updatePost = (req, res) => {
  const { desc } = req.body;
  const postId = req.query.postId;

  const q = "UPDATE posts SET `desc`= ? WHERE id = ? AND userId = ?";

  db.query(q, [desc, postId, req.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(409).json("You can only update Your posts");
    return res.status(200).json("Your Post has been updated");
  });
};

export const deletePost = (req, res) => {
  const postId = req.query.postId;

  const q = "DELETE FROM posts WHERE id = ? AND userId = ?";

  db.query(q, [postId, req.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0)
      return res.status(409).json("You can only delete Your posts");
    return res.status(200).json("Your Post has been Deleted");
  });
};
