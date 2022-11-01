import { environment } from "./../env";
import { Command } from "../cmd";
import { themeHandler, Themes } from "../themes";
import { userInterface } from "../ui";

export const theme: Command = {
  execute: async (...argv) => {
    const name = argv[0];

    if ((await themeHandler.applyTheme(name)) && name) {
      userInterface.outputColor(
        `Applied theme [${Themes.get(name)?.name}] by [${
          Themes.get(name)?.author
        }]`,
        `var(--blue)`
      );
      return;
    }

    userInterface.outputColor(
      `Current theme: [${environment.currentInstance.env.CurrentTheme}]`,
      `var(--blue)`
    );
  },

  description: "Applies the specified theme",
  usage: "THEME <name>",
};
