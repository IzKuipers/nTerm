import { environment } from "./env";

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