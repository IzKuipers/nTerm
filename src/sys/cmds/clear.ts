import { Command } from "../cmd";
import { environment } from "../env";
import { userInterface } from "../ui";

export const clear: Command = {
	execute: () => {
		environment.instance.buffer = "";
		userInterface.syncTarget();
	},

	description: "Clear the screen",
	usage: "CLEAR"
};
