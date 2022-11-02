import { environment } from "./../env";
import { userInterface } from "./../ui";
import { Command } from "../cmd";
import { Themes } from "../themes/store";

export const themes: Command = {
  execute() {
    for (const theme of Themes) {
      const keyStr = theme[0].padEnd(9, " ");
      const cTheme = environment.currentInstance.env.CurrentTheme;
      const prefix = cTheme == theme[0] ? "*" : " ";

      userInterface.outputColor(
        `${prefix} [${keyStr}] by [${theme[1].author}]`,
        "var(--blue)"
      );
    }
  },
  description: "Shows you a list of themes you can apply",
  usage: "themes",
};
