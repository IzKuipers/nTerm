import { environment } from "./env";
import { userInterface } from "./ui";

export interface Instance {
    target: HTMLElement;
    name?: string;
    buffer: string;
}

class InstanceHandler {
    loadInstance(instance: Instance) {
        if (instance?.target) {
            document.title = instance?.name || environment.pName;

            environment.instance = instance;

            userInterface.syncTarget();
            return;
        }
        throw "oh, oh!"
    }
}

export const instanceHandler = new InstanceHandler();