import { useEditorSettings } from "@/context/EditorContext";
import { useModal } from "@/context/ModalContext";
import classNames from "classnames";
import React from "react";
import { X, Type, MousePointer, Droplet } from "react-feather";

const EditorSettingsModal: React.FC = ({}) => {
  const { setShowModal } = useModal();
  const { editorSettings, setEditorSettings } = useEditorSettings();

  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-0">
        {/* A dark overlay */}
        <div
          className="fixed inset-0 bg-bg-dark/80 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block transform overflow-x-hidden overflow-y-scroll rounded-lg bg-bg-dimmed p-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div
            className="absolute top-2 left-2 cursor-pointer rounded-full p-1 transition-colors hover:bg-bg-dark/70"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <X className="text-white" />
          </div>
          <h2 className="mb-2 text-center text-2xl font-bold md:text-4xl">
            Editor settings
          </h2>
          <p className="mb-8 text-center text-xs text-text-dimmed md:text-sm">
            Modify your editor preferences
          </p>
          <div className="space-y-5">
            <div className="flex items-end">
              <div className="mr-auto pr-2">
                <h4 className="-mb-1 text-base md:text-lg">Font size</h4>
                <p className="text-xs text-text-dimmed md:text-sm">
                  Determines the size of the text inside your editor
                </p>
              </div>
              <div className="relative">
                <select
                  name={"editor-font_size"}
                  id={"editor-font_size"}
                  value={editorSettings.fontSize}
                  onChange={(e) =>
                    setEditorSettings({
                      ...editorSettings,
                      fontSize: parseInt(e.target.value) as any,
                    })
                  }
                  className="rounded-lg bg-bg-dark py-1.5 pl-6 text-xs shadow-sm md:pl-7 md:text-sm"
                >
                  <option value={10}>10px</option>
                  <option value={12}>12px</option>
                  <option value={14}>14px</option>
                  <option value={16}>16px</option>
                  <option value={18}>18px</option>
                  <option value={20}>20px</option>
                  <option value={22}>22px</option>
                </select>
                <Type className="absolute top-1/2 left-1.5 h-3.5 w-3.5 -translate-y-1/2 text-text-dimmed md:h-4 md:w-4" />
              </div>
            </div>

            <div className="flex items-end">
              <div className="mr-auto pr-2">
                <h4 className="m-0 -mb-1 text-base md:text-lg">
                  Show line number
                </h4>
                <p className="m-0 text-xs text-text-dimmed md:text-sm">
                  Line numbers will be displayed on the left of your code
                </p>
              </div>

              <div
                className="relative h-6 w-12 rounded-full bg-bg-dark"
                onClick={() => {
                  setEditorSettings({
                    ...editorSettings,
                    showLineNumber: !editorSettings.showLineNumber,
                  });
                }}
              >
                <div
                  className={classNames(
                    "absolute mt-1 h-4 w-4 rounded-full transition-all",
                    editorSettings.showLineNumber
                      ? "left-7 bg-primary"
                      : "left-1 bg-text-dimmed"
                  )}
                ></div>
              </div>
            </div>

            <div className="flex items-end">
              <div className="mr-auto pr-2">
                <h4 className="m-0 -mb-1 text-base md:text-lg">Show minimap</h4>
                <p className="m-0 text-xs text-text-dimmed md:text-sm">
                  Minimap will be displayed on the right of your code
                </p>
              </div>
              <div
                className="relative h-6 w-12 rounded-full bg-bg-dark"
                onClick={() => {
                  setEditorSettings({
                    ...editorSettings,
                    minimap: !editorSettings.minimap,
                  });
                }}
              >
                <div
                  className={classNames(
                    "absolute mt-1 h-4 w-4 rounded-full transition-all",
                    editorSettings.minimap
                      ? "left-7 bg-primary"
                      : "left-1 bg-text-dimmed"
                  )}
                ></div>
              </div>
            </div>

            <div className="flex items-end">
              <div className="mr-auto pr-2">
                <h4 className="-mb-1 text-base md:text-lg">Cursor style</h4>
                <p className="text-xs text-text-dimmed md:text-sm">
                  Change the style of the cursor
                </p>
              </div>

              <div className="relative">
                <select
                  name="editor-cursor_style"
                  id="editor-cursor_style"
                  value={editorSettings.cursorStyle}
                  onChange={(e) =>
                    setEditorSettings({
                      ...editorSettings,
                      cursorStyle: e.target.value as any,
                    })
                  }
                  className="rounded-lg bg-bg-dark py-1.5 pl-6 text-xs shadow-sm md:pl-7 md:text-sm"
                >
                  <option value="line">Line</option>
                  <option value="line-thin">Line thin</option>
                  <option value="block">Block</option>
                  <option value="block-outline">Block outline</option>
                  <option value="underline">Underline</option>
                  <option value="underline-thin">Underline thin</option>
                </select>
                <MousePointer className="absolute top-1/2 left-1.5 h-3.5 w-3.5 -translate-y-1/2 text-text-dimmed md:h-4 md:w-4" />
              </div>
            </div>

            <div className="flex items-end">
              <div className="mr-auto pr-2">
                <h4 className="-mb-1 text-base md:text-lg">Editor theme</h4>
                <p className="text-xs text-text-dimmed md:text-sm">
                  Change color theme of your editor
                </p>
              </div>

              <div className="relative">
                <select
                  name="editor-theme"
                  id="editor-theme"
                  value={editorSettings.theme}
                  onChange={(e) =>
                    setEditorSettings({
                      ...editorSettings,
                      theme: e.target.value as any,
                    })
                  }
                  className="rounded-lg bg-bg-dark py-1.5 pl-6 text-xs shadow-sm md:pl-7 md:text-sm"
                >
                  <option value="light">Light</option>
                  <option value="vs-dark">Dark</option>
                  <option value="dracula">Dracula</option>
                  <option value="monokai">Monokai</option>
                  <option value="hallowsEve">Hallows Eve</option>
                  <option value="cobalt">Cobalt</option>
                  <option value="pastel">Pastel</option>
                </select>
                <Droplet className="absolute top-1/2 left-1.5 h-3.5 w-3.5 -translate-y-1/2 text-text-dimmed md:h-4 md:w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorSettingsModal;
