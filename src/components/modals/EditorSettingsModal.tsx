import { useEditorSettings, themeNames } from "@/context/EditorContext";
import { useModal } from "@/context/ModalContext";
import classNames from "classnames";
import React from "react";
import { X, Type, MousePointer, Droplet, ExternalLink } from "react-feather";

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
            Ändra din editors utseende
          </p>
          <div className="space-y-5">
            <div className="flex items-end">
              <div className="mr-auto pr-2">
                <h4 className="-mb-1 text-base md:text-lg">Font size</h4>
                <p className="text-xs text-text-dimmed md:text-sm">
                  Ändrar text storleken på din kod
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
                <h4 className="-mb-1 text-base md:text-lg">Editor theme</h4>
                <a
                  className="flex items-center gap-1 text-xs text-text-dimmed underline md:text-sm"
                  href="https://uiwjs.github.io/react-codemirror/#/theme/home"
                  target="_blank"
                  rel="noreferrer"
                >
                  För att enklare hitta rätt theme för dig
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <div className="relative">
                <select
                  name="editor-theme"
                  id="editor-theme"
                  value={editorSettings.themeName}
                  onChange={(e) => {
                    console.log(e.target.value);

                    setEditorSettings({
                      ...editorSettings,
                      themeName: e.target.value as any,
                    });
                  }}
                  className="rounded-lg bg-bg-dark py-1.5 pl-6 text-xs shadow-sm md:pl-7 md:text-sm"
                >
                  {themeNames.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
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
