export const kernelFunctions = new Map<string, CoreFunction>([
  ["default", dfault],
  ["intro", intro],
]);

export interface CoreFunction {
  execute: () => void;
}

import { dfault } from "./kf/default";
import { intro } from "./kf/intro";
