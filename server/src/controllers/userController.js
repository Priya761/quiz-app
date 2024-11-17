const prisma = require("../prismaClient");

// Create a new user
const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { username, password }, // these both are field names
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length !== 0) res.status(200).json(users);
    else res.status(400).json({ error: "No users found" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { userID: id },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a User by ID
const removeUser = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const removedUser = await prisma.user.delete({
      where: { userID: id },
    });
    res.status(200).json({
      message: `User ${removedUser.userID} has been removed`,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, getUsers, getUserById, removeUser };
