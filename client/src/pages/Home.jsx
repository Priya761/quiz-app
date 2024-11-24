import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import QuizCard from "../components/QuizCard";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function fetchQuzzies() {
      const response = await fetch("http://localhost:3000/api/quizzes");
      const data = await response.json();
      console.log(data);

      if (data) {
        setQuizzes(data);
      }
    }
    fetchQuzzies();
  }, []);

  return (
    <>
      <Navbar />
      <p className="text-center font-bold">Quizes</p>
      <div className="grid grid-cols-3 gap-2 px-6">
        {quizzes.map((quiz) => {
          return (
            <QuizCard
              title={quiz.quizTitle}
              description={quiz.quizDescription}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
