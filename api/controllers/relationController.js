import { prismadb } from "../libs/db.js";

export const getRelations = async (req, res) => {
  try {
    const relations = await prismadb.relationship.findMany({
      where: {
        followedUserId: parseInt(req.query.userId),
      },
      select: {
        followerUserId: true,
      },
    });

    res.status(200).json(relations.map((relation) => relation.followerUserId));
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addRelation = async (req, res) => {
  try {
    const newRelation = await prismadb.relationship.create({
      data: {
        followerUserId: req.userId,
        followedUserId: req.body.userId,
      },
    });

    res.status(201).json("Following is sucessfull");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const delRelation = async (req, res) => {
  try {
    const deletedRelation = await prismadb.relationship.deleteMany({
      where: {
        followerUserId: req.userId,
        followedUserId: parseInt(req.query.userId),
      },
    });

    if (deletedRelation.count === 0) {
      return res.status(404).json("Relation not found");
    }

    res.status(200).json("Unfollowed Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
