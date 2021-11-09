import { Command } from "../cmd";
import { environment } from "../env";
import { GHIntergration } from "../github";
import { userInterface } from "../ui";

export const gh: Command = {
  execute: async () => {
    let subCommand = environment.argv[0];

    await subCommandMap.get(subCommand)!();
  },
  description: "GitHub intergration",
};

const subCommandMap = new Map<string, Function>([
  [
    "userrepo",
    async () => {
      let subSubCommand = environment.argv[1];
      let repos = await GHIntergration.getUserRepos(subSubCommand);

      for (let i = 0; i < repos.length; i++) {
        userInterface.output(
          `${repos[i].name.padEnd(35, " ")}: ${
            repos[i].description || "Description Not Found"
          }`
        );
      }
    },
  ],
  [
    "orgrepo",
    async () => {
      let subSubCommand = environment.argv[1];
      let repos = await GHIntergration.getOrgRepos(subSubCommand);
      for (let i = 0; i < repos.length; i++) {
        userInterface.output(
          `${repos[i].name.padEnd(35, " ")}: ${
            repos[i].description || "Description Not Found"
          }`
        );
      }
    },
  ],    
]);
