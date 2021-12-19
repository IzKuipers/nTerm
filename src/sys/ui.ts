import { environment } from "./env";
import { kernel } from "../kernel";
import { commands } from "./cmd";
import { kernelFunctions } from "./cf";
import { variables, varUtils } from "./vars";
import { utilities } from "./util";

class UserInterface {
  output(str: string, lineBreak = true) {
    this.flushBufferToTemp();
    const text = varUtils.replaceVariables(str);

    const span = document.createElement("span");
    span.innerHTML = `${utilities.makeHTMLTagsURLSafe(text)}${
      lineBreak ? "\n" : ""
    }`;

    if (environment.currentInstance)
      environment.currentInstance.env.temp.append(span);

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

      if (environment.currentInstance.iId) {
        kernel.log(`Unfocused input ${environment.currentInstance.iId}`);

        const input = document.getElementById(
          `${environment.currentInstance.iId}`
        )! as HTMLInputElement;

        const span = document.createElement("span");
        span.innerText = `${
          environment.currentInstance.env.cmd
        } ${environment.currentInstance.env.argv.join(" ")!}`;
        span.id = `UNFOCUSED ${environment.currentInstance.iId}`;

        try {
          input.insertAdjacentElement("beforebegin", span);

          input.remove();
        } catch {}

        environment.currentInstance.buffer =
          environment.currentInstance.target.innerHTML;
      }

      this.flushBufferToTemp();

      kernel.log(`Started userInterface.prompt`);

      this.outputColor(`\n${utilities.reset(prompt)}`, "var(--gray)", false);

      const input = document.createElement("input");

      input.className = "input";
      input.id = `${environment.currentInstance.id}#${Math.floor(
        Math.random() * 999999999
      )}`;
      input.style.width = `calc(100% - ${prompt.length}em)`;
      input.spellcheck = false;

      environment.currentInstance.iId = input.id;
      environment.currentInstance.env.temp.append(input);

      this.flushTempToBuffer();

      this.output("");
    }
  }

  async evaluateCommand(override?: string, noPrompt?: boolean) {
    kernel.log(`Started userInterface.evaluateCommand`);

    const input: HTMLInputElement = document.getElementById(
      environment.currentInstance.iId
    ) as HTMLInputElement;

    let value: string[];
    let command: string;
    let full: string;

    if (!override) {
      full = input.value;
      environment.currentInstance.env.val = input?.value;
      value = input?.value.split(" ");
      command = value[0].toLowerCase();
    } else {
      full = override;
      value = override.split(" ");
      command = value[0].toLowerCase();
    }

    environment.currentInstance.env.cmd = command;

    if (environment.currentInstance.env)
      environment.currentInstance.env.hist.push(full);

    if (commands.has(command) && environment.currentInstance.env) {
      environment.currentInstance.env.argv = value.slice(1);

      kernel.log(
        `Executing command "${command}" (${commands.get(command)?.description})`
      );

      try {
        if (environment.currentInstance.env)
          await commands
            .get(command)
            ?.execute(...environment.currentInstance.env.argv);
      } catch (e) {
        kernel.panic();
        throw e;
      }
    } else {
      kernel.log(
        `Execution of command "${command}" failed: no such definition`
      );

      (
        document.getElementById(
          environment.currentInstance.iId
        )! as HTMLInputElement
      ).value = full;
      if (command) kernelFunctions.get("default")?.execute();
    }

    if (!noPrompt) {
      this.prompt();

      document.getElementById(environment.currentInstance.iId)!.focus();
    }
  }

  inputFocusLoop() {
    function event(e: MouseEvent) {
      const path = e.composedPath();

      const input = document.getElementById(environment.currentInstance.iId)!;

      if (
        path.includes(
          document.getElementById(`${environment.currentInstance.id}`)!
        )
      ) {
        input.focus();

        if (environment.kHalt) document.removeEventListener("mousedown", event);
      }

      e.stopPropagation();
      e.stopImmediatePropagation();
    }

    document.addEventListener("click", event);
  }

  getPrompt() {
    let text = "";
    const list = (variables.get("PS")?.value || environment.prompt).split(" ");

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
      s.innerText = utilities.reset(
        utilities.makeHTMLTagsURLSafe(
          utilities.removeCharsFromString(x[i], ["[", "]"])
        )
      );

      if (environment.currentInstance)
        environment.currentInstance.env.temp.append(s);
    }

    this.flushTempToBuffer();

    this.output("", lineBreak);
  }

  flushTempToBuffer() {
    kernel.log(`Flushing temp to buffer...`);
    if (environment.currentInstance)
      environment.currentInstance.buffer =
        environment.currentInstance.env.temp.innerHTML;
  }

  flushBufferToTemp() {
    kernel.log(`Flushing buffer to temp...`);
    if (environment.currentInstance)
      environment.currentInstance.env.temp.innerHTML =
        environment.currentInstance.buffer;
  }

  syncTarget() {
    kernel.log(`Syncing instance target with instance buffer...`);
    if (environment.currentInstance)
      environment.currentInstance.target.innerHTML =
        environment.currentInstance.buffer;
  }
}

export const userInterface = new UserInterface();
