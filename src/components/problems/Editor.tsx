import React, { useState } from "react";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import TestCases from "./TestCases";

interface EditorProps {
  s?: "s";
}

const Editor: React.FC<EditorProps> = ({}) => {
  const [code, setCode] = useState("function main() {\n\n}");
  return (
    <>
      <div className="flex flex-shrink-0 bg-bg-dark pt-4 pb-2 text-sm text-text-dimmed">
        <span>{`{ ${code.length} }`}</span>
      </div>

      <div className="flex h-full flex-col overflow-y-scroll">
        <div className="h-full bg-green-500">
          <MonacoEditor
            wrapperProps={{
              style: {
                position: "relative",
                display: "flex",
                textAlign: "initial",
                width: "100%",
                height: "100%",
              },
              // style: 'padding:10px;position:absolute;'
              // className: '!p-1 !background-red-500 !block'
            }}
            className={""}
            height={"100%"}
            language={"javascript"}
            value={code}
            onChange={(val) => setCode(val || "")}
            theme={"vs-dark"}
            options={{
              scrollBeyondLastLine: false,
              automaticLayout: true,
              minimap: {
                enabled: false,
              },
              scrollbar: {
                alwaysConsumeMouseWheel: false,
              },
              fontSize: 16,
              cursorStyle: "block",
              wordWrap: "on",
              lineNumbers: "on",
              // wordWrap: 'wordWrapColumn',
              // wordWrapColumn: 90,
              // wordWrapBreakAfterCharacters: 'continue',

              // try "same", "indent" or "none"
              wrappingIndent: "same",
            }}
          />
        </div>
        <TestCases code={code} />
      </div>
    </>
  );
};

export default Editor;
