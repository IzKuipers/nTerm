import { environment } from "./env";
import { kernel } from "../kernel";
import { commands } from "./cmd";
import { kernelFunctions } from "./cf";
import { variables, varUtils } from "./vars";
import { utilities } from "./util";
import { Instance } from "./instance";

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
    if (environment.kHalt) return;

    kernel.log(`Started userInterface.prompt`);

    const prompt = this.getPrompt();
    const iId = environment.currentInstance.iId;

    let instance = environment.currentInstance;

    if (!instance) return;

    if (iId) instance = this.unloadOldPrompt(iId, instance);

    this.flushBufferToTemp();
    this.outputColor(`\n${utilities.reset(prompt)}`, "var(--green)", false);

    environment.currentInstance = this.createNewPrompt(instance, prompt);

    this.flushTempToBuffer();
    this.output("");

    setTimeout(() => {}, 100);
  }

  unloadOldPrompt(iId: string, instance: Instance): Instance {
    kernel.log(`Unfocused input ${iId}`);

    const input = document.getElementById(iId)! as HTMLInputElement;
    const span = document.createElement("span");

    span.innerText = `${instance.env.cmd} ${instance.env.argv.join(" ")!}`;
    span.id = `UNFOCUSED ${iId}`;

    try {
      input.insertAdjacentElement("beforebegin", span);

      input.remove();
    } catch {}

    instance.buffer = instance.target.innerHTML;

    return instance;
  }

  createNewPrompt(instance: Instance, prompt: string): Instance {
    const input = document.createElement("input");

    instance.env.argv = [];

    input.className = "input";
    input.id = `${instance.id}#${Math.floor(Math.random() * 999999999)}`;

    input.style.width = `calc(100% - ${prompt.length}em)`;
    input.spellcheck = false;

    instance.iId = input.id;
    instance.env.temp.append(input);

    return instance;
  }

  async evaluateCommand(override?: string, noPrompt?: boolean) {
    kernel.log(`Started userInterface.evaluateCommand`);

    const instance = environment.currentInstance;
    const iId = instance.iId;
    const input = document.getElementById(iId) as HTMLInputElement;

    instance.env.argv = [];

    let value: string[];
    let command: string;
    let full: string;

    if (!override) {
      full = input.value;
      instance.env.val = input?.value;
      value = input?.value.split(" ");
      command = value[0].toLowerCase();
    } else {
      full = override;
      value = override.split(" ");
      command = value[0].toLowerCase();
    }

    instance.env.cmd = command;

    if (instance.env) instance.env.hist.push(full);

    if (commands.has(command) && instance.env) {
      const cmd = commands.get(command);

      if (cmd) {
        instance.env.argv = value.slice(1);

        kernel.log(`Executing command "${command}" (${cmd.description})`);

        try {
          if (instance.env) await cmd.execute(...instance.env.argv);
        } catch (e) {
          kernel.panic();

          throw e;
        }
      }
    } else {
      kernel.log(
        `Execution of command "${command}" failed: no such definition`
      );

      input.value = full;

      if (command) kernelFunctions.get("default")?.execute();
    }

    if (!noPrompt) {
      this.prompt();

      userInterface.focusInput();
    }

    environment.currentInstance = instance;
  }

  inputFocusLoop() {
    function event(e: MouseEvent) {
      const path = e.composedPath();
      const instanceNode = document.getElementById(
        `${environment.currentInstance.id}`
      );

      if (!instanceNode) return;

      if (path.includes(instanceNode)) {
        userInterface.focusInput();

        if (environment.kHalt) document.removeEventListener("mousedown", event);
      }

      e.stopPropagation();
      e.stopImmediatePropagation();
    }

    document.addEventListener("click", event);
  }

  focusInput() {
    const instance = environment.currentInstance;
    const input = document.getElementById(instance.iId);

    if (!input || !instance) return;

    input.focus();
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
