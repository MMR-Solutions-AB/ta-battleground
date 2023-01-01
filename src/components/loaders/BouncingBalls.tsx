import classNames from "classnames";
import React from "react";

interface BouncingBallsProps {
  size?: "small" | "medium" | "large" | "xl";
}

const BouncingBalls: React.FC<BouncingBallsProps> = ({ size = "medium" }) => {
  const defaultClassName = classNames(
    "flex-shrink-0 animate-bounce rounded-full",
    size === "small"
      ? "h-12 w-12"
      : size === "large"
      ? "h-20 w-20"
      : size === "xl"
      ? "h-24 w-24"
      : "h-16 w-16"
  );

  return (
    <div className="flex w-max">
      <div className={classNames(defaultClassName, "bg-primary")}></div>
      <div
        className={classNames(
          defaultClassName,
          "-ml-6 bg-secondary [animation-delay:-250ms]"
        )}
      ></div>
    </div>
  );
};

export default BouncingBalls;
