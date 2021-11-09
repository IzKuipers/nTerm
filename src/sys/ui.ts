import { environment } from "./env";
import { kernel } from "../kernel";
import { commands } from "./cmd";
import { kernelFunctions } from "./kf";
import { variables } from "./vars";

class UserInterface {
	output(str: string, lineBreak: boolean = true) {
		//kernel.log(`Started userInterface.output`);

		let span = document.createElement("span");
		span.innerText = `${str}${lineBreak ? "\n" : ""}`;

		environment.dispOut.append(span);
	}

	prompt() {
		if (!environment.kHalt) {
			kernel.log(`Started userInterface.prompt`);
			let prompt = this.getPrompt();
	
			if (environment.iId) {
				kernel.log(`Unfocused input ${environment.iId}`);
	
				document
					.getElementById(environment.iId)
					?.setAttribute("disabled", "true");
			}
	
			kernel.log(`Started userInterface.prompt`);
	
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
	}

	async evaluateCommand() {
		kernel.log(`Started userInterface.evaluateCommand`);

		let input: HTMLInputElement = document.getElementById(
			environment.iId
		) as HTMLInputElement;

		environment.val = input?.value;

		let value: string[] = input?.value.split(" ");
		let command: string = value[0].toLowerCase();

		if (commands.has(command)) {
			environment.argv = value.slice(1);
			environment.cmd = command;
			
			kernel.log(`Executing command "${command}" (${commands.get(command)?.description})`)

			await commands.get(command)?.execute();
			
		} else {
			kernel.log(`Execution of command "${command}" failed: no such definition`);
			
			if (command) kernelFunctions.get("default")?.execute();
		}

		this.prompt();
	}

	inputFocusLoop() {
		let ival = setInterval(() => {
			let input = document.getElementById(environment.iId);

			if (input) input.focus();
			if (environment.kHalt) clearInterval(ival);
		}, 50);
	}

	getPrompt() {
		let text = "";
		let list = (variables.get("prompt")?.value || environment.prompt).split(" ");

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

		text.trimEnd();

		return text;
	}
}

export const userInterface = new UserInterface();
