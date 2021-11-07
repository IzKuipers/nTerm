import { Command, commands } from "../cmd";
import { userInterface } from "../ui";

export const help: Command = {
  execute: () => {
    let cmdList = commands.entries();
    
    for (let i of cmdList) {
      userInterface.output(`${i[0].padEnd(10, " ")}${i[1].description}`);
    }
  },

  description: "Display a list of built-in commands",
};
