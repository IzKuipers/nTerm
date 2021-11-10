import { environment } from "./env"
import { variables } from "./vars";

export interface Theme {
    path: () => void,
    name: string,
    author: string,
}

export const Themes = new Map<string, Theme>(
    [
        [environment.defaultTheme, {
            path: async () => import("../themes/default.scss"),
            name: environment.defaultTheme,
            author: environment.vendor
        }],
        ["gruvbox", {
            path: async () => import("../themes/gruvbox.scss"),
            name: "Gruvbox Dark",
            author: "github/morhertz"
        }],
        ["nord", {
            path: async () => import("../themes/nord.scss"),
            name: "Nord",
            author: "Arctic Ice Studio"
        }]
    ]
)

class ThemeHandler {
    async applyTheme(name: string) {
        if (Themes.has(name)) {
            environment.CurrentTheme = name;

            await Themes.get(name)?.path();

            localStorage.setItem("theme", environment.CurrentTheme);

            variables.set("THEME", {
                value: name,
                readonly: true
            });

            this.loadStoredTheme();

            return true;
        }
        return false;
    }

    async loadStoredTheme() {
        const theme: string | null = localStorage.getItem("theme");

        await this.applyTheme(theme || environment.defaultTheme);
    }
}

export const themeHandler = new ThemeHandler();