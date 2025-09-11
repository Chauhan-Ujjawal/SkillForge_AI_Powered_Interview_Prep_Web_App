import React from "react";

const SpinnerLoader = () => {
  return (
    <svg
      aria-hidden="true"
      className="inline w-5 h-5 text-white animate-spin"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="4 4" // ye make it dotted
        fill="none"
      />
    </svg>
  );
};

export default SpinnerLoader;
