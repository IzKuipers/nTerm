import { environment } from "./env";
import { kernel } from "../kernel";
import { commands } from "./cmd";
import { kernelFunctions } from "./kf";
import { variables } from "./vars";

class UserInterface {
	output(str: string, lineBreak: boolean = true) {
		kernel.log(`Started userInterface.output`);

		let span = document.createElement("span");
		span.innerText = `${str}${lineBreak ? "\n" : ""}`;

		environment.dispOut.append(span);
	}

	prompt(prompt: string = variables.get("prompt")?.value || environment.prompt) {
		if (environment.iId) {
			kernel.log(`Unfocused input ${environment.iId}`);

			document
				.getElementById(environment.iId)
				?.setAttribute("disabled", "true");
		}

		kernel.log(`Started userInterface.prompt: ${prompt}`);

		this.output(`\n${prompt}`, false);

		let input = document.createElement("input");

		input.className = "input";
		input.id = `#${Math.floor(Math.random() * 999999999)}`;
		input.style.width = `calc(100% - ${prompt.length}em)`;
		input.spellcheck = false;

		environment.iId = input.id;
		environment.dispOut.append(input);

		this.output("");
	}

	evaluateCommand() {
		let input: HTMLInputElement = document.getElementById(
			environment.iId
		) as HTMLInputElement;

		environment.val = input?.value;

		let value: string[] = input?.value.split(" ");
		let command: string = value[0].toLowerCase();

		if (commands.has(command)) {
			environment.argv = value.splice(1, 1);
			environment.cmd = command;

			commands.get(command)?.execute();
		} else {
			console.log(`"${command}"`);
			if (command) kernelFunctions.get("default")?.execute();
		}
	}

	inputFocusLoop() {
		let ival = setInterval(() => {
			let input = document.getElementById(environment.iId);

			if (input) input.focus();
			if (environment.kHalt) clearInterval(ival);
		}, 50);
	}
}

export const userInterface = new UserInterface();
