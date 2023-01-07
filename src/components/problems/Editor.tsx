import React, { useState } from "react";
import TestCases from "./TestCases";
import { generateStarterCode } from "@/utils/generateStarterCode";
import { Code, PenTool, Settings, RefreshCw } from "react-feather";
import { minify } from "terser";
import { useEditorSettings, allThemes } from "@/context/EditorContext";
import { useModal } from "@/context/ModalContext";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "codemirror";
import { js_beautify } from "js-beautify";

interface EditorProps {
  starterCode?: string;
  problemName: string;
  problemArgs: string[];
}

const Editor: React.FC<EditorProps> = ({
  starterCode,
  problemName,
  problemArgs,
}) => {
  const { editorSettings } = useEditorSettings();
  const { setShowModal } = useModal();
  const [code, setCode] = useState(
    starterCode || generateStarterCode(problemName, problemArgs)
  );

  console.log(editorSettings.themeName);
  console.log(editorSettings);

  return (
    <div className="grid grid-rows-[auto_1fr] overflow-y-scroll">
      <div className="flex flex-shrink-0 flex-wrap items-center justify-between bg-bg-dark pb-2 pr-2 pt-2 text-sm text-text-dimmed">
        <span>{`{ ${code.length} }`}</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={async () => {
              setCode(generateStarterCode(problemName, problemArgs));
            }}
            className="flex items-center gap-2 rounded-md bg-bg-dimmed py-1 px-3"
          >
            <RefreshCw className="h-3 w-3" />
            Reset code
          </button>
          <button
            onClick={async () => {
              try {
                setCode(js_beautify(code));
              } catch (error) {
                alert(
                  "Kunde inte formatera din kod eftersom att du har syntax errors, fixa dem och försök igen"
                );
              }
            }}
            className="flex items-center gap-2 rounded-md bg-bg-dimmed py-1 px-3"
          >
            <PenTool className="h-3 w-3" />
            Format code
          </button>
          <button
            onClick={async () => {
              try {
                const r = await minify(code);
                setCode(r.code || "");
              } catch (error) {
                alert(
                  "Kunde inte minify din kod eftersom att du har syntax errors, fixa dem och försök igen"
                );
              }
            }}
            className="flex items-center gap-2 rounded-md bg-bg-dimmed py-1 px-3"
          >
            <Code className="h-3 w-3" /> Minify code
          </button>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-md bg-bg-dimmed py-1 px-3"
          >
            <Settings className="h-3 w-3" /> Editor settings
          </button>
        </div>
      </div>

      <div className="w-full overflow-y-scroll">
        <div className="grid h-[calc(100vh-176px)] w-full flex-1 flex-shrink-0 overflow-y-scroll">
          <CodeMirror
            value={code}
            onChange={setCode}
            height="100%"
            style={{
              width: "calc(50vw-8px)",
              fontSize: editorSettings.fontSize,
            }}
            basicSetup={{
              crosshairCursor: true,
            }}
            theme={
              (typeof allThemes[editorSettings.themeName] === "function"
                ? (allThemes[editorSettings.themeName] as () => any)()
                : allThemes[editorSettings.themeName] ||
                  allThemes["vscodeDark"]) as any
            }
            extensions={[javascript(), EditorView.lineWrapping]}
          />
        </div>
        <TestCases code={code} />
      </div>
    </div>
  );
};

export default Editor;
