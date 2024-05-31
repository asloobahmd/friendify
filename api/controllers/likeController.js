import { prismadb } from "../libs/db.js";

export const getLikes = async (req, res) => {
  try {
    const likes = await prismadb.like.findMany({
      where: {
        postId: parseInt(req.query.postId),
      },
      select: {
        userId: true,
      },
    });

    res.status(200).json(likes.map((like) => like.userId));
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addLikes = async (req, res) => {
  try {
    const newLike = await prismadb.like.create({
      data: {
        userId: req.userId,
        postId: req.body.postId,
      },
    });

    res.status(201).json("Like has been added");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const delLikes = async (req, res) => {
  try {
    const deletedLike = await prismadb.like.deleteMany({
      where: {
        userId: req.userId,
        postId: parseInt(req.query.postId),
      },
    });

    if (deletedLike.count > 0) {
      res.status(200).json("Like has been deleted successfully");
    } else {
      res
        .status(404)
        .json("Like not found or you are not authorized to delete it");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
