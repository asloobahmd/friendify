import { db } from "../db.js";

export const getUsers = (req, res) => {
  let query = req.query.q;
  query = `%${query}%`;

  const q =
    "SELECT id, username, name, profilePic FROM USERS WHERE username LIKE ? OR name LIKE ?";

  db.query(q, [query, query, query], (err, data) => {
    if (err) return res.status(500).json(err);

    const filteredData = data.filter((user) => user.id !== req.userId);

    return res.json(filteredData);
  });
};

export const getUser = (req, res) => {
  const userId = req.params.id;
  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);

    const { password, ...other } = data[0];
    return res.json(other);
  });
};

export const updateUser = (req, res) => {
  const { name, email, city, website, profilePic, coverPic } = req.body;

  const q =
    "UPDATE users SET name=?, email=?, city=?, website=?, profilePic=?, coverPic=? WHERE id = ? ";

  db.query(
    q,
    [name, email, city, website, profilePic, coverPic, req.userId],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows === 0)
        return res.json("you can only update your own Profile");
      return res.json("Profile updated successfully");
    }
  );
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM users WHERE id = ? ";
  db.query(q, [req.userId], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(204).json("User Account successfullt deleted");
  });
};
