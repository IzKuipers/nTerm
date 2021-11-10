import { kernel } from "../kernel";
import { environment } from "./env"
import { variables } from "./vars";

export interface Theme {
    path: () => void,
    name: string,
    author: string,
    className: string
}

export const Themes = new Map<string, Theme>(
    [
        [environment.defaultTheme, {
            path: async () => import("../themes/default.scss"),
            name: environment.defaultTheme,
            author: environment.vendor,
            className: "color-scheme-default"
        }],
        ["gruvbox", {
            path: async () => import("../themes/gruvbox.scss"),
            name: "Gruvbox Dark",
            author: "github/morhertz",
            className: "color-scheme-gruvbox"
        }],
        ["nord", {
            path: async () => import("../themes/nord.scss"),
            name: "Nord",
            author: "Arctic Ice Studio",
            className: "color-scheme-nord"
        }]
    ]
)

class ThemeHandler {
    async applyTheme(name: string) {
        
        if (Themes.has(name)) {
            kernel.log(`Applying theme "${name}"...`)
            environment.oldTheme = environment.CurrentTheme;
            environment.CurrentTheme = name;

            await Themes.get(name)?.path();

            document.body.classList.remove(Themes.get(environment.oldTheme)?.className || `color-scheme-${environment.defaultTheme}`)
            document.body.classList.add(Themes.get(name)?.className || `color-scheme-${environment.defaultTheme}`);

            localStorage.setItem("theme", environment.CurrentTheme);

            variables.set("THEME", {
                value: name,
                readonly: true
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