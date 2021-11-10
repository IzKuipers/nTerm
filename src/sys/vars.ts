import { environment } from "./env";

class VarUtils {
    replaceVariables(input: string) {
        let text = "";
        const list = input.split(" ");

        for (let i = 0; i < list.length; i++) {
            if (list[i].startsWith("$")) {
                const keyName = list[i].replace("$", "");

                console.log(keyName, variables.get(keyName)?.value);

                if (variables.has(keyName)) {
                    const value = variables.get(keyName)?.value;
                    list[i] = value ?? list[i];
                }
            }
        }

        text = list.join(" ");

        return text;
    }
}

export const varUtils = new VarUtils();

const vars = new Map<string, Variable>(
    [
        [environment.promptVarName, {
            value: environment.prompt,
            readonly: false
        }],
        ["VER", {
            value: environment.pVer,
            readonly: true
        }],
        ["AUTHOR", {
            value: environment.vendor,
            readonly: true
        }],
        ["PRODUCTNAME", {
            value: environment.pName,
            readonly: true
        }],
        ["THEME", {
            value: environment.CurrentTheme || environment.defaultTheme,
            readonly: true
        }]
    ]
);

export interface Variable {
    value: string;
    readonly: boolean
}

export const variables = vars;