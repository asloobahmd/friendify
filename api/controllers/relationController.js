import { db } from "../db.js";

export const getRelations = (req, res) => {
  const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

  db.query(q, [req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relation) => relation.followerUserId));
  });
};

export const addRelation = (req, res) => {
  const q =
    "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)";

  const VALUES = [req.userId, req.body.userId];

  db.query(q, [VALUES], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Following");
  });
};

export const delRelation = (req, res) => {
  const q =
    "DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?";

  db.query(q, [req.userId, req.query.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Unfollowed Successfully");
  });
};
