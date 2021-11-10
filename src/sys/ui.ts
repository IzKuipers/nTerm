import { environment } from "./env";
import { kernel } from "../kernel";
import { commands } from "./cmd";
import { kernelFunctions } from "./cf";
import { variables, varUtils } from "./vars";
import { utilities } from "./util";

class UserInterface {
	output(str: string, lineBreak = true) {
		const text = varUtils.replaceVariables(str);

		const span = document.createElement("span");
		span.innerText = `${text}${lineBreak ? "\n" : ""}`;

		environment.dispOut.append(span);
	}

	error(str: string, lineBreak = true) {
		this.outputColor(`[Error]: ${str}`, `var(--red)`, lineBreak);
	}

	prompt() {
		if (!environment.kHalt) {
			kernel.log(`Started userInterface.prompt`);
			const prompt = this.getPrompt();

			if (environment.iId) {
				kernel.log(`Unfocused input ${environment.iId}`);

				document
					.getElementById(environment.iId)
					?.setAttribute("disabled", "true");
			}

			kernel.log(`Started userInterface.prompt`);

			this.outputColor(`\n${prompt}`, 'var(--gray)', false);

			const input = document.createElement("input");

			input.className = "input";
			input.id = `#${Math.floor(Math.random() * 999999999)}`;
			input.style.width = `calc(100% - ${prompt.length}em)`;
			input.spellcheck = false;

			environment.iId = input.id;
			environment.dispOut.append(input);

			this.output("");
		}
	}

	async evaluateCommand(override?: string, noPrompt?: boolean) {
		kernel.log(`Started userInterface.evaluateCommand`);

		const input: HTMLInputElement = document.getElementById(
			environment.iId
		) as HTMLInputElement;

		let value: string[];
		let command: string;
		let full: string;

		if (!override) {
			full = input.value;
			environment.val = input?.value;
			value = input?.value.split(" ");
			command = value[0].toLowerCase();
		} else {
			full = override;
			value = override.split(" ");
			command = value[0].toLowerCase();
		}

		environment.cmd = command;

		if (commands.has(command)) {
			environment.argv = value.slice(1);
			environment.hist.push(full);

			console.log(environment.hist);

			kernel.log(`Executing command "${command}" (${commands.get(command)?.description})`)

			try {
				await commands.get(command)?.execute();
			} catch (e) {
				kernel.panic()
			}
		} else {
			kernel.log(`Execution of command "${command}" failed: no such definition`);

			if (command) kernelFunctions.get("default")?.execute();
		}

		if (!noPrompt) this.prompt();
	}

	inputFocusLoop() {
		const ival = setInterval(() => {
			const input = document.getElementById(environment.iId);

			if (input) input.focus();
			if (environment.kHalt) clearInterval(ival);
		}, 50);
	}

	getPrompt() {
		let text = "";
		const list = (variables.get(environment.promptVarName)?.value || environment.prompt).split(" ");

		for (let i = 0; i < list.length; i++) {
			if (list[i].startsWith("$")) {
				const keyName = list[i].replace("$", "");

				if (variables.has(keyName)) {
					const value = variables.get(keyName)?.value;
					list[i] = value ?? list[i];
				}
			}

			text += `${list[i]} `;
		}

		text.trimEnd();

		return text;
	}

	outputColor(text: string, pri = "var(--red)", lineBreak = true, sec = "") {
		const x = text.split(/(\[[^\]]*\])/);

		for (let i = 0; i < x.length; i++) {
			const s: HTMLSpanElement = document.createElement("span");
			const isPart: boolean = (x[i].startsWith("[") && x[i].endsWith("]"))

			s.style.color = isPart ? pri : sec;
			s.innerText = utilities.removeCharsFromString(x[i], ["[", "]"]);

			environment.dispOut.append(s);
		}

		this.output("", lineBreak);
	}
}

export const userInterface = new UserInterface();
