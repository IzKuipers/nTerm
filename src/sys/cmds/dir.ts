import { Command } from "../cmd";
import { userInterface } from "../ui";

export const dir: Command = {
    execute: () => {
        userInterface.output("Error: not implemented")
    },

    description: "Display the contents of the current directory",
    usage: "DIR <path>"
}