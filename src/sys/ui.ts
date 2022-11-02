import { environment } from "./env";
import { kernel } from "../kernel";
import { commands } from "./cmd";
import { kernelFunctions } from "./cf";
import { variables, varUtils } from "./vars";
import { utilities } from "./util";
import { Instance } from "./instance";

class UserInterface {
  output(str: string, lineBreak = true) {
    kernel.log(`UserInterface: output: Outputting ${str.length} characters.`);

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

  prompt(argv?: string[]) {
    if (environment.kHalt) return;

    kernel.log(`Started userInterface.prompt`);

    const prompt = this.getPrompt();
    const iId = environment.currentInstance.iId;

    let instance = environment.currentInstance;

    console.warn(argv);
    ("");

    if (!instance) return;
    if (iId) instance = this.unloadOldPrompt(iId, instance, argv);

    this.flushBufferToTemp();

    const pr = this.outputColor(
      `\n${utilities.resetHTMLChars(prompt)}`,
      "var(--green)",
      false
    );

    environment.currentInstance = this.createNewPrompt(instance, pr);

    this.flushTempToBuffer();
    this.output("");

    setTimeout(() => {}, 100);
  }

  unloadOldPrompt(iId: string, instance: Instance, argv?: string[]): Instance {
    kernel.log(`Unfocused input ${iId}`);

    const input = document.getElementById(iId)! as HTMLInputElement;
    const span = document.createElement("span");

    span.innerText = `${instance.env.cmd} ${(argv || instance.env.argv).join(
      " "
    )!}`;
    span.id = `UNFOCUSED ${iId}`;

    try {
      input.insertAdjacentElement("beforebegin", span);
      input.remove();
    } catch {
      kernel.panic();
    }

    instance.buffer = instance.target.innerHTML;

    return instance;
  }

  createNewPrompt(instance: Instance, prompt: HTMLSpanElement): Instance {
    const input = document.createElement("input");

    instance.env.argv = [];

    input.className = "input";
    input.id = `${instance.id}#${Math.floor(Math.random() * 999999999)}`;
    input.style.width = `calc(100% - ${prompt.offsetWidth}px)`;
    input.spellcheck = false;

    instance.iId = input.id;
    instance.env.temp.append(input);

    return instance;
  }

  async evaluateCommand(override?: string, noPrompt?: boolean) {
    kernel.log(`Started userInterface.evaluateCommand`);

    console.warn(environment.currentInstance.env.argv);

    const instance = environment.currentInstance;
    const iId = instance.iId;
    const input = document.getElementById(iId) as HTMLInputElement;

    let value: string[];
    let command: string;
    let full: string;

    if (!instance.env) return;

    instance.env.argv = [];

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
    instance.env.argv = value.slice(1);

    instance.env.hist.push(full);

    if (commands.has(command)) {
      const cmd = commands.get(command);

      if (!cmd) return userInterface.error("Fetching function failed!");

      kernel.log(`Executing command "${command}" (${cmd.description})`);

      try {
        await cmd.execute(...instance.env.argv);
      } catch (e) {
        kernel.panic();
      }
    } else {
      kernel.log(
        `Execution of command "${command}" failed: no such definition`
      );

      input.value = full;
      console.log(instance.env.argv);

      environment.currentInstance = instance;

      if (command) kernelFunctions.get("default")?.execute();
    }

    environment.currentInstance = instance;

    if (!noPrompt) {
      this.prompt(instance.env.argv);

      userInterface.focusInput();
    }
  }

  inputFocusLoop() {
    kernel.log("inputFocusLoop: starting mouse listener");
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

    kernel.log(`Focussing to input ${instance.iId}`);

    if (!input || !instance) return;

    input.focus();
  }

  getPrompt() {
    kernel.log(`getPrompt: Fetching $PS variable from variables`);

    const prompt = variables.get("PS")?.value || environment.prompt;

    return `${varUtils.replaceVariables(prompt).trim()} `;
  }

  outputColor(text: string, pri = "var(--red)", lineBreak = true, sec = "") {
    kernel.log(`UserInterface: output: Outputting ${text.length} characters.`);

    const x = text.split(/(\[[^\]]*\])/);

    const out = document.createElement("span");

    for (let i = 0; i < x.length; i++) {
      const s = document.createElement("span");

      const isPart = x[i].startsWith("[") && x[i].endsWith("]");

      s.style.color = isPart ? pri : sec;
      s.innerText = utilities.resetHTMLChars(
        utilities.makeHTMLTagsURLSafe(
          utilities.removeCharsFromString(x[i], ["[", "]"])
        )
      );

      out.append(s);
    }

    if (environment.currentInstance)
      environment.currentInstance.env.temp.append(out);

    this.flushTempToBuffer();
    this.output("", lineBreak);
    this.syncTarget();

    const target = environment.currentInstance.target;
    const children = target.children;
    const promptChild = children[children.length - 2];

    console.log(
      promptChild.textContent?.length,
      (promptChild as HTMLSpanElement).offsetWidth
    );

    return promptChild as HTMLSpanElement;
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
