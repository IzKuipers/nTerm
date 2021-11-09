import { Command } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const repeat: Command = {
    execute: () => {
        let Regx: RegExpMatchArray = environment.val.match(/"(.*?)"/)!;
        let text: string = "";
        let amnt: number = parseInt(environment.argv[0]);

        if (Regx && Regx.length > 1 && !!amnt) {
            text = Regx[1];

            userInterface.output(`Repeating "${text}" ${amnt} times...\n`);

            for (let i = 0; i < amnt; i++) {
                userInterface.evaluateCommand(text, true);
            }
        } else {
            userInterface.output("Unable to repeat: syntax invalid!");
        }
    },

    description: "Repeat the specified command a specified amount of times",
    usage: `REPEAT <amount> "<command>"`
}