import { environment } from "./env";

class VarUtils {
    replaceVariables(input:string) {
        let text: string = "";
		let list = input.split(" ");

		for (let i = 0; i < list.length; i++) {
			if (list[i].startsWith("$")) {
				let keyName = list[i].replace("$", "");

				console.log(keyName, variables.get(keyName)?.value);

				if (variables.has(keyName)) {
					let value = variables.get(keyName)?.value;
					list[i] = value ?? list[i];
				}
			}	
		}

        text = list.join(" ");

        return text;
    }
}

export const varUtils = new VarUtils();

const prompt: Variable = {
    value: environment.prompt,
    readonly: false
}

const vars = new Map<string, Variable>(
    [
        ["prompt", prompt]
    ]
);

export interface Variable {
    value: string;
    readonly: boolean
}

export const variables = vars;