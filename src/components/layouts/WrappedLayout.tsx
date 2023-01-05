import React from "react";

interface WrappedLayoutProps {
  children: React.ReactNode;
}

const WrappedLayout: React.FC<WrappedLayoutProps> = ({ children }) => {
  return (
    <div className="p-10">
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
};

export default WrappedLayout;
