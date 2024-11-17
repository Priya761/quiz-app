-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Quiz" (
    "quizID" TEXT NOT NULL PRIMARY KEY,
    "quizTitle" TEXT NOT NULL,
    "quizDescription" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Quiz_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Questions" (
    "questionId" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "opt1" TEXT NOT NULL,
    "opt2" TEXT NOT NULL,
    "opt3" TEXT NOT NULL,
    "opt4" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "quizID" TEXT NOT NULL,
    CONSTRAINT "Questions_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quiz" ("quizID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Scoreboard" (
    "scoreId" TEXT NOT NULL PRIMARY KEY,
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marksObtained" INTEGER NOT NULL,
    CONSTRAINT "Scoreboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Scoreboard_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("quizID") ON DELETE RESTRICT ON UPDATE CASCADE
);
