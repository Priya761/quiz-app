import React from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ title, description }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full rounded-md border-blue-400 border-2 cursor-pointer"
      onClick={() => navigate("/ndcijo")}
    >
      <p className="px-2 py-1 font-semibold text-lg">{title}</p>
      <div className="w-full h-px bg-blue-400" />
      <p className="px-2 py-1">{description}</p>
    </div>
  );
};

export default QuizCard;
