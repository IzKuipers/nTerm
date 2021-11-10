import { Command } from "../cmd";
import { environment } from "../env";
import { themeHandler, Themes } from "../themes";
import { userInterface } from "../ui";

export const theme:Command = {
    execute: async () => {
        const name = environment.argv[0];

        if (await themeHandler.applyTheme(name) && name) {
            userInterface.outputColor(`Applied theme [${Themes.get(name)?.name}] by [${Themes.get(name)?.author}]`,`var(--blue)`);
            return;
        }
        userInterface.error(`Unable to apply theme: not found`);
    },

    description: "Applies the specified theme",
    usage: "THEME <name>"
}