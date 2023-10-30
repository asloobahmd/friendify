import { db } from "../db.js";

export const getLikes = (req, res) => {
  const q = "SELECT userId FROM likes WHERE postId = ?";

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.userId));
  });
};

export const addLikes = (req, res) => {
  const q = "INSERT INTO likes (userId, postId) VALUES (?)";

  const VALUES = [req.userId, req.body.postId];

  db.query(q, [VALUES], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Like has been added");
  });
};

export const delLikes = (req, res) => {
  const q = "DELETE FROM likes WHERE userId = ? AND postId = ?";

  db.query(q, [req.userId, req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Like has been Deleted successfully");
  });
};
