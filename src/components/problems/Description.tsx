import React from "react";
import { marked } from "marked";

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div
      className="prose prose-invert max-w-none py-5 px-3"
      dangerouslySetInnerHTML={{
        __html: marked.parse(description),
      }}
    ></div>
  );
};

export default Description;
