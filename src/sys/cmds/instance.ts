import { userInterface } from "./../ui";
import { environment } from "./../env";
import { Command } from "../cmd";
import { Instance } from "../instance";

export const instance: Command = {
  execute(...argv: string[]) {
    const showAll = argv[0] && argv[0].toLowerCase() == "plain";

    if (!showAll) {
      userInterface.outputColor(
        `[Note]: Showing summarized version. Use [INSTANCE PLAIN] to view everything.`,
        "var(--blue)"
      );
    }

    const replacers: [string, string][] = [
      ['"@@', ""],
      ['@@"', ""],
      ["[", "("],
      ["]", ")"],
      ['  "', "  ["],
      ['":', "]:"],
      ["{}", "{HTML}"],
    ];
    const json = JSON.parse(
      JSON.stringify(environment.currentInstance)
    ) as Instance;

    const instance = environment.currentInstance;
    const histLen = instance.env.hist.length;
    const kLogLen = instance.env.kLog.length;
    const argvLen = instance.env.argv.length;
    const buffSiz = instance.buffer.length;

    if (!showAll) {
      json.env.hist = [`@@HISTORY_LIST (${histLen} items)@@`];
      json.env.kLog = [`@@KERNEL_LOG (${kLogLen} items)@@`];
      json.env.argv = [`@@COMMAND_ARGUMENTS (${argvLen} items)@@`];

      json.buffer = `@@BUFFER (${buffSiz} bytes)@@`;
    }

    let str = JSON.stringify(json, null, 2);

    if (!showAll)
      for (let i = 0; i < replacers.length; i++) {
        str = str.split(replacers[i][0]).join(replacers[i][1]);
      }

    if (showAll) userInterface.output(`\nInstance ${str}`);
    else
      userInterface.outputColor(
        `\n[Instance #${instance.id}] ${str}`,
        "var(--yellow)"
      );
  },
  description: "Display current instance data as JSON",
  usage: "INSTANCE",
};
