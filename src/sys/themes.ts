import { kernel } from "../kernel";
import { environment } from "./env";
import { Themes } from "./themes/store";
import { variables } from "./vars";

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

        document.body.classList.add(newCName);
        instance.classList.add(newCName);

        environment.currentInstance = ins;
      }

      if (instances.length == 0) {
        document.body.classList.add(newCName);
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
