import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import * as themes from "thememirror";

export type FontSize = 10 | 12 | 14 | 16 | 18 | 20 | 22;
export type CursorStyle =
  | "line"
  | "block"
  | "underline"
  | "line-thin"
  | "block-outline"
  | "underline-thin";

export type ThemeNames = keyof typeof themes;
export type Theme = typeof themes["amy"];
export const themeNames = Object.keys(themes).filter(
  (t) => t !== "createTheme"
);

export interface Settings {
  fontSize: FontSize;
  showLineNumber: boolean;
  minimap: boolean;
  cursorStyle: CursorStyle;
  themeName: ThemeNames;
  zenMode: boolean;
}

// if no settings have been changed by the user, this will be their settings
const defaultSettings: Settings = {
  fontSize: 16,
  showLineNumber: true,
  minimap: true,
  cursorStyle: "line",
  themeName: "ayuLight",
  zenMode: false,
};

interface Context {
  editorSettings: Settings;
  setEditorSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const EditorContext = createContext<Context>({
  editorSettings: defaultSettings,
  setEditorSettings: () => null,
});

export function useEditorSettings() {
  return useContext(EditorContext);
}

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // works just like useState, but will be cached in local storage
  const [settings, setSettings] = useLocalStorage(
    "editor-settings",
    defaultSettings
  );

  useEffect(() => {
    setSettings({ ...settings, zenMode: false });
  }, []);

  const value = {
    editorSettings: settings,
    setEditorSettings: setSettings,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};
