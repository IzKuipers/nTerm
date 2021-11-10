import { Command } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const hist: Command = {
    execute: () => {
        if (!environment.hist.length) {
            userInterface.output("The history list is empty!");
            return;
        }

        const indexLength: number = environment.hist.length.toString().length + 1;

        for (let i = 0; i < environment.hist.length; i++) {
            userInterface.outputColor(`[${i.toString().padStart(indexLength, "0")}]: ${environment.hist[i]}`,`var(--yellow)`);
        }
    },
    description: "Display the history list",
    usage: "HIST"
}