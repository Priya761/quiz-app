const prisma = require("../prismaClient");

// Create a new question
// Quiz will be created by a User
const createQuestion = async (req, res) => {
  const { question, opt1, opt2, opt3, opt4, answer, quizID } = req.body;
  console.log(req.body);
  try {
    const newQuestion = await prisma.questions.create({
      data: {
        question,
        opt1,
        opt2,
        opt3,
        opt4,
        answer,
        quizID,
      },
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a question by ID
// Can any User delete a question? Or the one who has created this question (of the Quiz) can only delete
// the question? How will will do this?
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuestion = await prisma.questions.delete({
      where: { questionId: id },
    });
    res.status(200).json({
      message: `Question ${deletedQuestion.questionId} has been deleted`,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Update a question by ID (question id)
const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, opt1, opt2, opt3, opt4, answer } = req.body;
  try {
    const updatedQuestion = await prisma.questions.update({
      where: { questionId: id },
      data: {
        question,
        opt1,
        opt2,
        opt3,
        opt4,
        answer,
      },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get a question by ID (question id)
const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    // inside question we will get complete row as object
    const question = await prisma.questions.findUnique({
      where: { questionId: id },
    });
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get questions by quiz ID
const getQuestionsByQuizId = async (req, res) => {
  const { quizId } = req.params;
  try {
    // const questions will get array of all question objects with the given quiz id
    const questions = await prisma.questions.findMany({
      where: { quizID: quizId },
    });
    if (questions.length === 0) {
      return res
        .status(404)
        .json({ error: "No questions found for this quiz" });
    }
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getQuestionById,
  getQuestionsByQuizId,
};
