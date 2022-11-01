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

      const ins = environment.currentInstance;
      const env = ins.env;
      const def = `color-scheme-${environment.defaultTheme}`;
      const oldCName = Themes.get(env.oldTheme!)?.className || def;
      const newCName = Themes.get(name)?.className || def;

      env.oldTheme = env.CurrentTheme;
      env.CurrentTheme = name;

      const instances = document.querySelectorAll("div.instanceDiv");

      for (let i = 0; i < instances.length; i++) {
        const instance = instances[i] as HTMLDivElement;

        const classList = instances[i].classList;

        for (let j = 0; j < classList.length; j++) {
          const className = classList[j];

          if (className.includes("color-scheme-")) {
            classList.remove(className);
            document.body.classList.remove(className);
          }
        }

        instance.classList.remove(oldCName);
        document.body.classList.remove(oldCName);

        setTimeout(() => {
          document.body.classList.add(newCName);
          instance.classList.add(newCName);
        }, 100);

        environment.currentInstance = ins;
      }

      localStorage.setItem("theme", env.CurrentTheme as string);

      variables.set("THEME", {
        value: name,
        readonly: true,
      });

      ins.env = env;
      environment.currentInstance = ins;

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
