import { kernel } from "../kernel";
import { environment } from "./env";
import { userInterface } from "./ui";

export interface Instance {
  target: HTMLElement;
  name?: string;
  buffer: string;
  id: number;
}

class InstanceHandler {
  loadInstance(instance: Instance) {
    kernel.log(`Loading instance #${instance.id} . . .`);
    if (instance?.target) {
      document.title = instance?.name || environment.pName;

      environment.instance = instance;

      userInterface.syncTarget();
      return;
    }
  }
}

export const instanceHandler = new InstanceHandler();
