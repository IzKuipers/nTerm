import { Command } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";
import { variables } from "../vars";

export const echo: Command = {
  execute: () => {
    let text = "";
    let Regx = environment.val.match(/"(.*?)"/)!;

    if (Regx && Regx.length > 1) {
      let list = Regx[1].split(" ");

      for (let i = 0; i < list.length; i++) {
        if (list[i].startsWith("$")) {
          let keyName = list[i].replace("$", "");

          console.log(keyName, variables.get(keyName)?.value);

          if (variables.has(keyName)) {
            let value = variables.get(keyName)?.value;
            list[i] = value ?? list[i];
          }
        }

        text += `${list[i]} `;
      }

      text = text.trimEnd();

      console.log(`"${text}"`);

      userInterface.output(text);
    } else {
      userInterface.output("Unable to echo: syntax invalid!");
    }
  },

  description: "Echo back the given text",
};
