import React from "react";

const Error = ({ error }) => {
  return (
    <div className="h-screen container w-4/5 mx-auto my-0 flex justify-center items-center text-center ">
      {error}
    </div>
  );
};

export default Error;
