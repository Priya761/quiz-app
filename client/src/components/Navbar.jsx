import React from "react";

const Navbar = () => {
  return (
    <div className="w-full px-10 py-2 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Quiz App!</h1>
      <button className="px-2 py-1 bg-blue-600 text-white">Login</button>
    </div>
  );
};

export default Navbar;
