import React from "react";

const BlockView = ({ children }) => {
  return (
    <div className="flex justify-center items-center text-white m-1 w-full">
      {children}
    </div>
  );
};

export default BlockView;
