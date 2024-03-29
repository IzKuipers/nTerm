import { themes } from "./cmds/themes";
import { help } from "./cmds/help";
import { clear } from "./cmds/clear";
import { ver } from "./cmds/ver";
import { echo } from "./cmds/echo";
import { set } from "./cmds/set";
import { panic } from "./cmds/panic";
import { dir } from "./cmds/dir";
import { gh } from "./cmds/gh";
import { hist } from "./cmds/hist";
import { repeat } from "./cmds/repeat";
import { env } from "./cmds/env";
import { theme } from "./cmds/theme";
import { getjson } from "./cmds/getjson";
import { net } from "./cmds/net";
import { rnd } from "./cmds/rnd";
import { instance } from "./cmds/instance";
import { colors } from "./cmds/colors";
import { intro } from "./cmds/intro";

export interface Command {
  execute: (...argv: string[]) => void | number;
  description?: string;
  usage: string;
}

export const commands = new Map<string, Command>([
  ["help", help],
  ["clear", clear],
  ["ver", ver],
  ["echo", echo],
  ["set", set],
  ["panic", panic],
  ["dir", dir],
  ["gh", gh],
  ["hist", hist],
  ["repeat", repeat],
  ["env", env],
  ["theme", theme],
  ["themes", themes],
  ["getjson", getjson],
  ["net", net],
  ["rnd", rnd],
  ["instance", instance],
  ["colors", colors],
  ["intro", intro],
]);
