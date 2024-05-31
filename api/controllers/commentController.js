import moment from "moment";
import { prismadb } from "../libs/db.js";

export const getComments = async (req, res) => {
  try {
    const comments = await prismadb.comment.findMany({
      where: {
        postId: parseInt(req.query.postId),
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePic: true,
          },
        },
      },
    });

    const formattedComments = comments.map((comment) => ({
      ...comment,
      name: comment.user.name,
      profilePic: comment.user.profilePic,
    }));

    res.status(200).json(formattedComments);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getCommentCount = async (req, res) => {
  try {
    const comments = await prismadb.comment.findMany({
      where: {
        postId: parseInt(req.params.id),
      },
      select: {
        userId: true,
      },
    });

    res.json(comments.map((comment) => comment.userId));
  } catch (err) {
    res.status(500).json(err);
  }
};

export const postComments = async (req, res) => {
  try {
    const newComment = await prismadb.comment.create({
      data: {
        desc: req.body.desc,
        createdAt: moment().toDate(),
        userId: req.userId,
        postId: req.body.postId,
      },
    });

    res.status(201).json("Comment has been added");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteComments = async (req, res) => {
  try {
    const deletedComment = await prismadb.comment.deleteMany({
      where: {
        id: parseInt(req.params.id),
        userId: req.userId,
      },
    });

    if (deletedComment.count > 0) {
      res.status(200).json("Comment has been DELETED");
    } else {
      res
        .status(404)
        .json("Comment not found or you are not authorized to delete it");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
