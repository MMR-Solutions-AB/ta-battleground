import React from "react";

const BouncingBalls: React.FC = ({}) => {
  return (
    <div className="flex w-max">
      <div className="h-16 w-16 flex-shrink-0 animate-bounce rounded-full bg-primary"></div>
      <div className="-ml-6 h-16 w-16 flex-shrink-0 animate-bounce rounded-full bg-secondary [animation-delay:-250ms]"></div>
    </div>
  );
};

export default BouncingBalls;
