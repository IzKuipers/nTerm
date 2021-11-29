import {Command} from "../cmd";
import { userInterface } from "../ui";

export const rnd:Command = {
    execute: (...argv) => {
        const max = parseInt(argv.join(""));

        userInterface.output(Math.floor(Math.random() * max).toString());
    },

    usage: "RND <MAX>",
    description: "Generate a random number"
}