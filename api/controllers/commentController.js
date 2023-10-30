import { db } from "../db.js";
import moment from "moment";

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments c JOIN users u ON c.userId = u.id 
        WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getCommentCount = (req, res) => {
  const postId = req.params.id;
  const q = "SELECT userId FROM comments WHERE postId = ?";

  db.query(q, [postId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.json(data.map((comm) => comm.userId));
  });
};

export const postComments = (req, res) => {
  const q =
    "INSERT INTO comments (`desc`, createdAt, userId, postId) VALUES (?)";

  const VALUES = [
    req.body.desc,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    req.userId,
    req.body.postId,
  ];

  db.query(q, [VALUES], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Comment has been added");
  });
};

export const deleteComments = (req, res) => {
  const q = "DELETE FROM comments WHERE id = ? AND userId = ?";

  db.query(q, [req.params.id, req.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Comment has been DELETED");
  });
};
