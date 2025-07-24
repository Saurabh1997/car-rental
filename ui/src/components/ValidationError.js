import React from "react";

function ValidationError({ validationErrorText }) {
  return (
    <div className="text-red-400 font-medium mb-2">{validationErrorText}</div>
  );
}

export default ValidationError;
