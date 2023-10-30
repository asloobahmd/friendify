import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  try {
    if (!token) return res.status(401).json("Not logged in");

    const userData = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = userData.id;
    next();
  } catch (error) {
    return res.status(500).json("token not valid");
  }
};
