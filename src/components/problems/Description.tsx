import React from "react";
import { marked } from "marked";
import { Edit } from "react-feather";
interface DescriptionProps {
  description: string;
  problemName: string;
  warName: string | undefined;
}

const Description: React.FC<DescriptionProps> = ({
  description,
  problemName,
  warName,
}) => {
  const trimmedProblemName = problemName
    .trim()
    .toLowerCase()
    .split(" ")
    .join("-");

  const trimmedWarName = (warName || "")
    .trim()
    .toLowerCase()
    .split(" ")
    .join("-");

  return (
    <div className="py-5 px-3">
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: marked.parse(description),
        }}
      ></div>
      <div className="mt-10">
        <p className="text-text-dimmed">Ser du något du vill ändra?</p>

        <a
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-sm text-primary underline"
          href={`https://github.com/MMR-Solutions-AB/ta-battleground/tree/main/src/data/${
            warName ? `wars/${trimmedWarName}/` : ""
          }problems/${trimmedProblemName}/description.md`}
        >
          Redigera denna uppgift
          <Edit className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export default Description;
