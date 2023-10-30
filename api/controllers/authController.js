import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = (req, res) => {
  const { username, email, password, name } = req.body;

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) return res.json(500).json(err);
    if (data.length) return res.status(403).json("Username Already Exists");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const Values = [username, email, hash, name];
    const q = "INSERT INTO users (username, email, password, name) VALUES (?)";
    db.query(q, [Values], (err, data) => {
      if (err) return res.status(500).json(err);

      res.status(201).json("User successfully created");
    });
  });
};

export const Login = (req, res) => {
  const { username } = req.body;

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) return req.status(500).json(err);
    if (data.length == 0) return res.status(401).json("User not exist");

    const correctPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    ); // return true if matches
    if (!correctPassword)
      return res.status(403).json("username and password didnt match");

    const token = getJwtToken(data[0].id);

    const { password, ...other } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const Logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};

//util function
const getJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
