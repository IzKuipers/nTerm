export interface Command {
  execute: () => void;
  description?: string;
}

export const commands = new Map<string, Command>([
  ["help", help],
  ["clear", clear],
]);

import { help } from "./cmds/help";
import { clear } from "./cmds/clear";
