import React from "react";

const LoadingSpinner: React.FC = ({}) => {
  return (
    <div className="h-6 w-6 flex-shrink-0 animate-spin rounded-full border-4 border-gray-800 border-t-primary"></div>
  );
};

export default LoadingSpinner;
