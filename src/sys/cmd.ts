export interface Command {
  execute: () => void;
  description?: string;
  usage: string
}

export const commands = new Map<string, Command>([
  ["help", await help],
  ["clear", await clear],
  ["ver", await ver],
  ["echo", await echo],
  ["set", await set],
  ["panic", await panic],
  ["dir", await dir],
  ["gh", await gh],
  ["hist", await hist],
  ["repeat", await repeat]
]);

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