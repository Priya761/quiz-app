const express = require("express");
const router = express.Router();
const {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getQuestionById,
  getQuestionsByQuizId,
} = require("../controllers/questionController");

router.post("/", createQuestion);
router.delete("/:id", deleteQuestion);
router.put("/:id", updateQuestion);
router.get("/:id", getQuestionById);
router.get("/quiz/:quizId", getQuestionsByQuizId);

module.exports = router;
