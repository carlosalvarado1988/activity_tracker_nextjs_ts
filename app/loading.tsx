import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="absolute w-32 h-32 m-auto left-0 right-0 top-0 bottom-0 justify-center">
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
      </div>
    </section>
  );
};

export default Loading;
