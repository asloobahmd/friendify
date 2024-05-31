import moment from "moment";
import { prismadb } from "../libs/db.js";

export const getPosts = async (req, res) => {
  const userId = req.query.userId;

  try {
    let posts;
    if (userId) {
      posts = await prismadb.post.findMany({
        where: {
          userId: parseInt(userId),
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
    } else {
      posts = await prismadb.post.findMany({
        where: {
          OR: [
            { userId: req.userId },
            {
              user: {
                followedUser: {
                  some: {
                    followerUserId: req.userId,
                  },
                },
              },
            },
          ],
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
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addPost = async (req, res) => {
  try {
    const newPost = await prismadb.post.create({
      data: {
        desc: req.body.desc,
        img: req.body.img,
        userId: req.userId,
        createdAt: moment().toDate(),
      },
    });

    res.status(201).json("Post has been added");
  } catch (err) {
    res.status(500).json(err);
  }
};

// implement in future if needed
export const getPost = (req, res) => {};

export const updatePost = async (req, res) => {
  const { desc } = req.body;
  const postId = parseInt(req.query.postId);

  try {
    const updatedPost = await prismadb.post.updateMany({
      where: {
        id: postId,
        userId: req.userId,
      },
      data: {
        desc: desc,
      },
    });

    if (updatedPost.count === 0) {
      return res.status(409).json("You can only update your posts");
    }

    res.status(200).json("Your Post has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletePost = async (req, res) => {
  const postId = parseInt(req.query.postId);

  try {
    const deletedPost = await prismadb.post.deleteMany({
      where: {
        id: postId,
        userId: req.userId,
      },
    });

    if (deletedPost.count === 0) {
      return res.status(409).json("You can only delete your posts");
    }

    res.status(200).json("Your Post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
