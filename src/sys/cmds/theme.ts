import { environment } from "./../env";
import { Command } from "../cmd";
import { themeHandler } from "../themes";
import { userInterface } from "../ui";
import { Themes } from "../themes/store";

export const theme: Command = {
  execute: async (...argv) => {
    const name = argv[0];

    if ((await themeHandler.applyTheme(name)) && name) {
      const theme = Themes.get(name);

      if (!theme) return;

      userInterface.outputColor(
        `Applied theme [${theme.name}] by [${theme.author}]`,
        `var(--blue)`
      );

      return;
    }

    const currentTheme = environment.currentInstance.env.CurrentTheme;

    if (!argv[0])
      return userInterface.outputColor(
        `Current theme: [${currentTheme}]`,
        `var(--blue)`
      );

    userInterface.error(`Theme [${argv[0]}] not found!`);
    userInterface.outputColor(
      `\nUse [THEMES] to get a list of available themes`,
      "var(--blue)"
    );

    return;
  },

  description: "Applies the specified theme",
  usage: "THEME [name]",
};
