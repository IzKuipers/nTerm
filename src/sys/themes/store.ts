import { environment } from "../env";
import { Theme } from "./interface";

export const Themes = new Map<string, Theme>([
  [
    environment.defaultTheme,
    {
      name: environment.defaultTheme,
      author: environment.vendor,
      className: "color-scheme-default",
    },
  ],
  [
    "gruvbox",
    {
      name: "Gruvbox Dark",
      author: "github/morhertz",
      className: "color-scheme-gruvbox",
    },
  ],
  [
    "nord",
    {
      name: "Nord",
      author: "Arctic Ice Studio",
      className: "color-scheme-nord",
    },
  ],
  [
    "onedark",
    {
      name: "One Dark Pro",
      author: "Atom",
      className: "color-scheme-onedark",
    },
  ],
  [
    "deepocean",
    {
      name: "Deep Ocean",
      author: "Material Theme",
      className: "color-scheme-deepocean",
    },
  ],
  [
    "dracula",
    {
      name: "Dracula",
      author: "Zeno Rocha",
      className: "color-scheme-dracula",
    },
  ],
  [
    "nightowl",
    {
      name: "Night Owl",
      author: "GitHub/sdras",
      className: "color-scheme-nightowl",
    },
  ],
  [
    "monokai",
    {
      name: "Monokai Extended",
      author: "SuperPaintman",
      className: "color-scheme-monokai",
    },
  ],
  [
    "palenight",
    {
      name: "Pale Night",
      author: "Olaolu Olawuyi",
      className: "color-scheme-palenight",
    },
  ],
]);
