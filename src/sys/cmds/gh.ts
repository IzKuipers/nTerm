import { Command } from "../cmd";
import { environment } from "../env";
import { GHIntergration } from "../github";
import { userInterface } from "../ui";
import { utilities } from "../util";

export const gh: Command = {
  execute: async () => {
    if (environment.argv.length) {
      let subCommand = environment.argv[0].toLowerCase();

      if (subCommandMap.has(subCommand)) {
        await (subCommandMap.get(subCommand)!());
      } else {
        userInterface.output(`"${subCommand}" is not a valid sub-command!`);
      }
    } else {
      userInterface.output(`No sub-command specified! Type "HELP GH" for help`);
    }

  },
  description: "View information about GitHub repositories",
  usage: "GH <userrepo|orgrepo|repo|commits> <user/repo|user|org>"
};

const subCommandMap = new Map<string, Function>([
  [
    "userrepo",
    async () => {
      let subSubCommand = environment.argv[1];
      let repos = await GHIntergration.getUserRepos(subSubCommand);

      for (let i = 0; i < repos.length; i++) {
        userInterface.output(
          `${repos[i].name.padEnd(35, " ")}: ${repos[i].description || "Description Not Found"
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
          `${repos[i].name.padEnd(35, " ")}: ${repos[i].description || "Description Not Found"
          }`
        );
      }
    },
  ],
  [
    "repo",
    async () => {
      let subSubCommand = environment.argv[1];
      let repo = await GHIntergration.getRepoDetails(subSubCommand);
      if (!repo.message && !repo.documentation_url) {
        userInterface.output(`Owner           : ${repo.owner.login}`);
        userInterface.output(`Full Name       : ${repo.full_name}`);
        userInterface.output(`Description     : ${repo.description || "Description Not Found"}\n`);
        userInterface.output(`URL             : ${repo.html_url}`);
        userInterface.output(`Git URL         : ${repo.html_url}.git\n`);
        userInterface.output(`Last Updated    : ${repo.updated_at}`);

      } else {
        userInterface.output(`Error: failed to fetch repository information: repository not found`)
      }
    }
  ],
  [
    "commits",
    async () => {
      let subSubCommand = environment.argv[1];
      let commits = await GHIntergration.getCommits(subSubCommand);

      if (!commits.message && !commits.documentation_url) {
        userInterface.output("");
        for (let i = 0; i < commits.length; i++) {
          let title = `Commit ${commits[i].sha}`;
          userInterface.output(
            `${title}\n` +
            `${utilities.createSeparatorFor(title)}\n` +
            `Message:\n` +
            `${commits[i].commit.message}\n` +
            `Date: ${commits[i].commit.author.date}\n` +
            `Created By: ${commits[i].commit.author.name} (${commits[i].commit.author.email})\n`
          );
        }
      } else {
        userInterface.output(`Error: failed to fetch commits: repository not found`)
      }
    }
  ]
]);
