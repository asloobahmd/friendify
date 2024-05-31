import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prismadb } from "../libs/db.js";

export const Register = async (req, res) => {
  const { username, email, password, name } = req.body;
  try {
    if (!username || !email || !password || !name) {
      return res.status(400).json("All fields are required");
    }

    const existUser = await prismadb.user.findFirst({
      where: {
        username: username,
      },
    });

    if (existUser)
      return res.status(409).json("User with same username Already Exists");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const createdUser = await prismadb.user.create({
      data: {
        username: username,
        email: email,
        password: hash,
        name: name,
      },
    });

    return res
      .status(201)
      .json({ message: "User successfully created", user: createdUser });
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existUser = await prismadb.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!existUser) {
      return res.status(404).json("User does not exist");
    }

    const isCorrectPassword = bcrypt.compareSync(password, existUser.password);
    if (!isCorrectPassword) {
      return res.status(403).json("Username and password do not match");
    }

    const token = getJwtToken(existUser.id);

    const { password: userPassword, ...other } = existUser;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
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
