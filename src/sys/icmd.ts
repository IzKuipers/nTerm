export const internalCommands = new Map<string, InternalCommand>([
  ["default", dfault],
  ["intro", intro],
]);

export interface InternalCommand {
  execute: () => void;
}

import { dfault } from "./intercmds/default";
import { intro } from "./intercmds/intro";
