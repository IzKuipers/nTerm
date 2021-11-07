import { environment } from "./env";
import { kernel } from "../kernel";
import { commands } from "./cmd";
import { internalCommands } from "./icmd";

class UserInterface {
  output(str: string, lineBreak: boolean = true) {
    kernel.log(`Started userInterface.output`);

    let span = document.createElement("span");
    span.innerText = `${str}${lineBreak ? "\n" : ""}`;

    environment.displayOutput.append(span);
  }

  prompt(prompt: string = environment.prompt) {
    if (environment.inputId) {
      kernel.log(`Unfocused input ${environment.inputId}`);

      document
        .getElementById(environment.inputId)
        ?.setAttribute("disabled", "true");
    }

    kernel.log(`Started userInterface.prompt: ${prompt}`);

    this.output(`\n${prompt}`, false);

    let input = document.createElement("input");

    input.className = "input";
    input.id = `#${Math.floor(Math.random() * 999999999)}`;
    input.style.width = `calc(100% - ${prompt.length}em)`;

    environment.inputId = input.id;
    environment.displayOutput.append(input);
    
    this.output("");
  }

  evaluateCommand() {
    let input = document.getElementById(
      environment.inputId
    ) as HTMLInputElement;

    let command = input?.value;

    if (commands.has(command)) {
      commands.get(command)?.execute();
    } else {
      internalCommands.get("default")?.execute();
    }
  }

  inputFocusLoop() {
    let ival = setInterval(() => {
      let input = document.getElementById(environment.inputId);

      if (input) input.focus();
      if (environment.kernelHalt) clearInterval(ival);
    }, 50);
  }
}

export const userInterface = new UserInterface();
