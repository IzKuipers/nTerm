export interface Command {
  execute: () => void;
  description?: string;
}

export const commands = new Map<string, Command>([
  ["help", help],
  ["clear", clear],
  ["ver", ver],
  ["echo", echo],
  ["set", set],
  ["panic", panic],
  ["dir",dir]
]);

import { help } from "./cmds/help";
import { clear } from "./cmds/clear";
import { ver } from "./cmds/ver";
import { echo } from "./cmds/echo";
import { set } from "./cmds/set";
import { panic } from "./cmds/panic";
import { dir } from "./cmds/dir";