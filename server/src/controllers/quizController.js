const prisma = require("../prismaClient");

// Create a new quiz
const createQuiz = async (req, res) => {
  // quizTitle and quizDescription will be entered by the user who is creating the quiz and
  // createdBy (id of the user) will be getting from the Frontend.
  // will be creating quizId in the backend
  const { quizTitle, quizDescription, createdBy } = req.body;
  try {
    const quiz = await prisma.quiz.create({
      data: {
        quizTitle,
        quizDescription,
        createdBy,
      },
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all quizzes
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get quiz by Quiz ID
const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { quizID: id },
    });
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get quizzes by user ID (created by a specific user)
const getQuizzesByUserId = async (req, res) => {
  const { userId } = req.params; // the id will be sent by user from params

  try {
    const quizzes = await prisma.quiz.findMany({
      where: { createdBy: userId },
    });
    if (quizzes.length === 0) {
      return res
        .status(404)
        .json({ message: "No quizzes found for this user" });
    }
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Quiz by ID
const deleteQuiz = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const deletedQuiz = await prisma.quiz.delete({
      where: { quizID: id },
    });
    res.status(200).json({
      message: `Quiz ${deletedQuiz.quizID} has been removed`,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuizById,
  getQuizzesByUserId,
  deleteQuiz,
};
