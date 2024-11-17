// QUIZ ROUTES
const express = require("express");
const router = express.Router();
const {
  createQuiz,
  getQuizzes,
  getQuizById,
  getQuizzesByUserId,
  deleteQuiz,
} = require("../controllers/quizController");

router.post("/", createQuiz);
router.get("/", getQuizzes);
router.delete("/:id", deleteQuiz);
router.get("/:id", getQuizById); // Get quiz by quiz ID
router.get("/user/:userId", getQuizzesByUserId); // Get quizzes by user

module.exports = router;
