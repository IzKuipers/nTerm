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
    span.innerHTML = `${utilities.makeHTMLTagsURLSafe(text)}${lineBreak ? "\n" : ""}`;

    environment.temp.append(span);

    this.flushTempToBuffer();

    this.syncTarget();
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

        const input = document.getElementById(
          environment.iId
        ) as HTMLInputElement;

        const span = document.createElement("span");
        span.innerText = environment.val;
        span.id = `UNFOCUSED ${environment.iId}`;
        console.warn(environment.val);

        try {
          input.insertAdjacentElement("beforebegin", span);

          input.remove();
        } catch {}

        environment.instance.buffer = environment.instance.target.innerHTML;
      }

      this.flushBufferToTemp();

      kernel.log(`Started userInterface.prompt`);

      this.outputColor(`\n${prompt}`, "var(--gray)", false);

      const input = document.createElement("input");

      input.className = "input";
      input.id = `#${Math.floor(Math.random() * 999999999)}`;
      input.style.width = `calc(100% - ${prompt.length}em)`;
      input.spellcheck = false;

      environment.iId = input.id;
      environment.temp.append(input);

      this.flushTempToBuffer();

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
    
    environment.hist.push(full);

    if (commands.has(command)) {
      environment.argv = value.slice(1);
      

      console.log(environment.hist);

      kernel.log(
        `Executing command "${command}" (${commands.get(command)?.description})`
      );

      try {
        await commands.get(command)?.execute();
      } catch (e) {
        kernel.panic();
      }
    } else {
      kernel.log(
        `Execution of command "${command}" failed: no such definition`
      );

      (document.getElementById(environment.iId)! as HTMLInputElement).value =
        full;
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
    const list = (
      variables.get(environment.promptVarName)?.value || environment.prompt
    ).split(" ");

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
      const isPart: boolean = x[i].startsWith("[") && x[i].endsWith("]");

      s.style.color = isPart ? pri : sec;
      s.innerText = utilities.makeHTMLTagsURLSafe(utilities.removeCharsFromString(x[i], ["[", "]"]));

      environment.temp.append(s);
    }

    this.flushTempToBuffer();

    this.output("", lineBreak);
  }

  flushTempToBuffer() {
    kernel.log(`Flushing temp to buffer...`);
    environment.instance.buffer = environment.temp.innerHTML;
  }

  flushBufferToTemp() {
    kernel.log(`Flushing buffer to temp...`);
    environment.temp.innerHTML = environment.instance.buffer;
  }

  syncTarget() {
    kernel.log(`Syncing instance target with instance buffer...`);
    environment.instance.target.innerHTML = environment.instance.buffer;
  }
}

export const userInterface = new UserInterface();
