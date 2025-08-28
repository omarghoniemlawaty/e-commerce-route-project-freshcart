import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-100 loading d-flex justify-content-center align-items-center">
      <ScaleLoader color="#d9dddf" height="25px" />
    </div>
  );
};

export default Loading;
