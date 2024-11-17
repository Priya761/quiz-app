const express = require("express");
const router = express.Router();
const {
  createScore,
  getScoresByUserId,
  getScoresByQuizId,
} = require("../controllers/scoreboardController");

router.post("/", createScore); // Create a new score entry
router.get("/user/:userId", getScoresByUserId); // Get scores by user ID // will act as individual scoreboard
router.get("/quiz/:quizId", getScoresByQuizId); // Get scores by quiz ID  // Will act as Leaderboard - universal ranking

module.exports = router;
