const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  removeUser,
} = require("../controllers/userController");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById); // Get user by ID
router.delete("/:id", removeUser);

module.exports = router;
