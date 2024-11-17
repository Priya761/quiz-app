const prisma = require("../prismaClient");

// Create a new score entry
const createScore = async (req, res) => {
  // marksObtained will be calculated in the Frontend and will be sent from the frontend to the backend, over here
  const { quizId, userId, marksObtained } = req.body;
  try {
    const newScore = await prisma.scoreboard.create({
      data: {
        quizId,
        userId,
        marksObtained,
      },
    });
    res.status(201).json(newScore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get scores by user ID
// getScoresByUserId to get which all Quizes/scoreboards have the user played
const getScoresByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const scores = await prisma.scoreboard.findMany({
      where: { userId },
      include: {
        Quiz: {
          select: { quizTitle: true },
        },
      },
    });
    if (scores.length === 0) {
      return res.status(404).json({ error: "No scores found for this user" });
    }
    res.status(200).json(scores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get scores by quiz ID
// getScoresByQuizId to get all Users/scoreboards who played this quiz
const getScoresByQuizId = async (req, res) => {
  const { quizId } = req.params;
  try {
    const scores = await prisma.scoreboard.findMany({
      where: { quizId },
      include: {
        User: {
          select: { username: true },
        },
      },
    });
    if (scores.length === 0) {
      return res.status(404).json({ error: "No scores found for this quiz" });
    }
    res.status(200).json(scores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createScore, getScoresByUserId, getScoresByQuizId };
