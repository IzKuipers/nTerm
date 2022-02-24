import { kernel } from "../kernel";
import { environment } from "./env";
import { variables } from "./vars";

export interface Theme {
  path: () => void;
  name: string;
  author: string;
  className: string;
}

export const Themes = new Map<string, Theme>([
  [
    environment.defaultTheme,
    {
      path: async () => import("../themes/default.scss"),
      name: environment.defaultTheme,
      author: environment.vendor,
      className: "color-scheme-default",
    },
  ],
  [
    "gruvbox",
    {
      path: async () => import("../themes/gruvbox.scss"),
      name: "Gruvbox Dark",
      author: "github/morhertz",
      className: "color-scheme-gruvbox",
    },
  ],
  [
    "nord",
    {
      path: async () => import("../themes/nord.scss"),
      name: "Nord",
      author: "Arctic Ice Studio",
      className: "color-scheme-nord",
    },
  ],
  [
    "onedark",
    {
      path: async () => import("../themes/onedark.scss"),
      name: "One Dark Pro",
      author: "Atom",
      className: "color-scheme-onedark",
    },
  ],
]);

class ThemeHandler {
  async applyTheme(name: string) {
    if (Themes.has(name)) {
      kernel.log(`Applying theme "${name}"...`);

      environment.currentInstance.env.oldTheme =
        environment.currentInstance.env.CurrentTheme;
      environment.currentInstance.env.CurrentTheme = name;

      await Themes.get(name)?.path();

      const instances = document.querySelectorAll("div.instanceDiv");

      for (let i = 0; i < instances.length; i++) {
        const instance = instances[i] as HTMLDivElement;

        instance.classList.remove(
          Themes.get(environment.currentInstance.env.oldTheme!)?.className ||
            `color-scheme-${environment.defaultTheme}`
        );
      
        instance.classList.add(
          Themes.get(name)?.className ||
            `color-scheme-${environment.defaultTheme}`
        );

        document.body.classList.remove(
          Themes.get(environment.currentInstance.env.oldTheme!)?.className ||
            `color-scheme-${environment.defaultTheme}`
        );
      
        document.body.classList.add(
          Themes.get(name)?.className ||
            `color-scheme-${environment.defaultTheme}`
        );
      }

      localStorage.setItem(
        "theme",
        environment.currentInstance.env.CurrentTheme
      );

      variables.set("THEME", {
        value: name,
        readonly: true,
      });

      return true;
    }
    return false;
  }

  async loadStoredTheme() {
    kernel.log(`Loading stored theme from LocalStorage...`);

    const theme: string | null = localStorage.getItem("theme");

    await this.applyTheme(theme || environment.defaultTheme);
  }
}

export const themeHandler = new ThemeHandler();
