import { Command } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const hist: Command = {
  execute: () => {
    if (!environment.currentInstance.env.hist.length) {
      userInterface.output("The history list is empty!");
      
      return;
    }

    const indexLength: number =
      environment.currentInstance.env.hist.length.toString().length + 1;

    for (let i = 0; i < environment.currentInstance.env.hist.length; i++) {
      userInterface.outputColor(
        `[${i.toString().padStart(indexLength, "0")}]: ${
          environment.currentInstance.env.hist[i]
        }`,
        `var(--yellow)`
      );
    }
  },
  description: "Display the history list",
  usage: "HIST",
};
