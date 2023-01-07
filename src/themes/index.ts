// types
import type { Theme } from "@/context/EditorContext";
import type { editor } from "monaco-editor";

// taken from https://github.com/brijeshb42/monaco-themes
import cobalt from "./cobalt";
import dracula from "./dracula";
import github from "./github";
import hallowsEve from "./hallowsEve";
import monokai from "./monokai";
import pastel from "./pastel";

// 'light', 'vs-dark' and 'hc-black' dont need to be added as they come with monaco editor
type ExtraThemes = Exclude<Theme, "light" | "vs-dark" | "hc-black">;

export const themes: { [key in ExtraThemes]: editor.IStandaloneThemeData } = {
  cobalt,
  dracula,
  github,
  hallowsEve,
  monokai,
  pastel,
} as const;
