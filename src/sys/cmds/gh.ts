import { Command } from "../cmd";
import { environment } from "../env";
import { GHIntergration } from "../github";
import { userInterface } from "../ui";
import { utilities } from "../util";

export const gh: Command = {
  execute: async () => {
    if (environment.argv.length) {
      const subCommand = environment.argv[0].toLowerCase();

      if (subCommandMap.has(subCommand)) {
        await subCommandMap.get(subCommand)?.();
      } else {
        userInterface.error(`"${subCommand}" is not a valid sub-command!`);
      }
    } else {
      userInterface.error(`No sub-command specified! Type "HELP GH" for help`);
    }
  },
  description: "View information about GitHub repositories",
  usage: "GH <userrepo|orgrepo|repo|commits> <user/repo|user|org>",
};

const subCommandMap = new Map<string, () => void>([
  [
    "userrepo",
    async () => {
      const subSubCommand = environment.argv[1];
      const repos = await GHIntergration.getUserRepos(subSubCommand);

      for (let i = 0; i < repos.length; i++) {
        userInterface.output(`${repos[i].name.padEnd(35, " ")}: `, false);
        if (repos[i].description) {
          userInterface.output(repos[i].description);
        } else {
          userInterface.outputColor("[Description Not Found]", `var(--gray)`);
        }
      }

      if (!repos.length) {
        userInterface.error(`User has no repos or user not found!`);
      }
    },
  ],
  [
    "orgrepo",
    async () => {
      const subSubCommand = environment.argv[1];
      const repos = await GHIntergration.getOrgRepos(subSubCommand);
      for (let i = 0; i < repos.length; i++) {
        userInterface.output(`${repos[i].name.padEnd(35, " ")}: `, false);
        if (repos[i].description) {
          userInterface.output(repos[i].description);
        } else {
          userInterface.outputColor("[Description Not Found]", `var(--gray)`);
        }
      }
      if (!repos.length) {
        userInterface.error(`Organization has no repos or organization not found!`);
      }
    },
  ],
  [
    "repo",
    async () => {
      const subSubCommand = environment.argv[1];
      const repo = await GHIntergration.getRepoDetails(subSubCommand);
      if (!repo.message && !repo.documentation_url) {
        userInterface.output(`Owner           : ${repo.owner.login}`);
        userInterface.output(`Full Name       : ${repo.full_name}`);
        userInterface.output(
          `Description     : ${repo.description || "Description Not Found"}\n`
        );
        userInterface.output(`URL             : ${repo.html_url}`);
        userInterface.output(`Git URL         : ${repo.html_url}.git\n`);
        userInterface.output(`Last Updated    : ${repo.updated_at}`);
      } else {
        userInterface.error(`Unable to get repo information: GitHub API returned "${repo.message}"`);
      }
    },
  ],
  [
    "commits",
    async () => {
      const subSubCommand = environment.argv[1];
      const commits = await GHIntergration.getCommits(subSubCommand);

      if (!commits.message && !commits.documentation_url) {
        userInterface.output("");
        for (let i = 0; i < commits.length; i++) {
          const title = `Commit ${commits[i].sha}`;
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
        userInterface.error(`Unable to get user information: GitHub API returned "${commits.message}"`);
      }
    },
  ],
  [
    "user",
    async () => {
      const subSubCommand = environment.argv[1];
      const userInfo = await GHIntergration.getUserDetails(subSubCommand);

      if (!userInfo.message && !userInfo.documentation_url) {
        userInterface.outputColor(`Fetching user information of [${subSubCommand}] . . .`,`var(--blue)`);
        userInterface.output(
          `GitHub Name   : ${userInfo.login || "Unknown"}\n` +
            `Full Name     : ${userInfo.name || "Not specified"}\n` +
            `Bio           : ${userInfo.bio || "No bio"}\n\n` +
            `Organization  : ${
              userInfo.company || "Not part of an organization"
            }\n` +
            `Website       : ${userInfo.blog || "No website specified"}\n` +
            `Email         : ${userInfo.email || "No email specified"}\n` +
            `URL           : ${userInfo.html_url || "Unable to fetch URL"}\n\n` +
            `Location      : ${userInfo.location || "Not specified"}\n` +
            `Followers     : ${userInfo.followers || 0}\n` +
            `Following     : ${userInfo.following || 0}\n`
        );
      } else {
        userInterface.error(`Unable to get user information: GitHub API returned "${userInfo.message}"`);
      }
    },
  ],
]);
