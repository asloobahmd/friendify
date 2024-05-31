import { prismadb } from "../libs/db.js";

export const getUsers = async (req, res) => {
  const query = req.query.q ? req.query.q : "";

  // let query = req.query.q;
  // query = `%${query}%`;

  try {
    // Find users where username or name contains the query
    const users = await prismadb.user.findMany({
      where: {
        OR: [{ username: { contains: query } }, { name: { contains: query } }],
      },
      select: {
        id: true,
        username: true,
        name: true,
        profilePic: true,
      },
    });

    // Filter out the current user from the results
    const filteredUsers = users.filter((user) => user.id !== req.userId);

    return res.json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await prismadb.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, ...other } = user;

    return res.json(other);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, city, website, profilePic, coverPic } = req.body;
  const userId = req.userId;

  try {
    const updatedUser = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        email: email,
        city: city,
        website: website,
        profilePic: profilePic,
        coverPic: coverPic,
      },
    });

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.userId;

  try {
    await prismadb.user.delete({
      where: {
        id: userId,
      },
    });

    return res.status(204).json("User Account successfully deleted");
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
