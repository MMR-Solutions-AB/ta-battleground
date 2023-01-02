import { useEditorSettings } from "@/context/EditorContext";
import { useModal } from "@/context/ModalContext";
import React from "react";
import { X, Type, MousePointer } from "react-feather";

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
          className="fixed inset-0 bg-pink-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="prose prose-gray inline-block max-h-[95vh] transform overflow-x-hidden overflow-y-scroll rounded-lg bg-sky-500 p-4 pb-6 text-left align-bottom shadow-xl transition-all dark:prose-invert sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div
            className="hover:bg-clr-bg absolute top-2 left-2 cursor-pointer rounded-full p-1 transition-colors"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <X className="text-black" />
          </div>
          <h2 className="m-0 mb-2 text-center text-2xl md:text-4xl">
            Editor settings
          </h2>
          <p className="text-center text-xs md:text-sm">
            Modify your editor preferences
          </p>

          <div className="mb-5 flex items-end">
            <div className="mr-auto pr-2">
              <h4 className="m-0 -mb-1 text-base md:text-lg">Font size</h4>
              <p className="m-0 text-xs text-gray-800 md:text-sm">
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
                className="rounded-lg border-green-500 bg-orange-500 py-1.5 pl-6 text-xs shadow-sm md:pl-7 md:text-sm"
              >
                <option value={10}>10px</option>
                <option value={12}>12px</option>
                <option value={14}>14px</option>
                <option value={16}>16px</option>
                <option value={18}>18px</option>
                <option value={20}>20px</option>
              </select>
              <Type className="absolute top-1/2 left-1.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-700 md:h-4 md:w-4" />
            </div>
          </div>

          <div className="mb-5 flex items-end">
            <div className="mr-auto pr-2">
              <h4 className="m-0 -mb-1 text-base md:text-lg">
                Show line number
              </h4>
              <p className="m-0 text-xs text-gray-800 md:text-sm">
                Line numbers will be displayed on the left of your code
              </p>
            </div>
            {/* <Switch
              checked={editorSettings.showLineNumber}
              onChange={(val) =>
                setEditorSettings({ ...editorSettings, showLineNumber: val })
              }
              srText="Use line numbers"
            /> */}
            <div className="h-5 w-10 bg-red-800">på dig</div>
          </div>

          <div className="mb-5 flex items-end">
            <div className="mr-auto pr-2">
              <h4 className="m-0 -mb-1 text-base md:text-lg">Show minimap</h4>
              <p className="m-0 text-xs text-gray-800 md:text-sm">
                Minimap will be displayed on the right of your code
              </p>
            </div>
            {/* <Switch
              checked={editorSettings.minimap}
              onChange={(val) =>
                setEditorSettings({ ...editorSettings, minimap: val })
              }
              srText="Use minimap"
            /> */}
            <div className="h-5 w-10 bg-red-800">hej</div>
          </div>

          <div className="mb-5 flex items-end">
            <div className="mr-auto pr-2">
              <h4 className="m-0 -mb-1 text-base md:text-lg">Cursor style</h4>
              <p className="m-0 text-xs text-gray-800 md:text-sm">
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
                className="rounded-lg border-green-500 bg-orange-500 py-1.5 pl-6 text-xs shadow-sm md:pl-7 md:text-sm"
              >
                <option value="line">Line</option>
                <option value="line-thin">Line thin</option>
                <option value="block">Block</option>
                <option value="block-outline">Block outline</option>
                <option value="underline">Underline</option>
                <option value="underline-thin">Underline thin</option>
              </select>
              <MousePointer className="absolute top-1/2 left-1.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-700 md:h-4 md:w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorSettingsModal;
