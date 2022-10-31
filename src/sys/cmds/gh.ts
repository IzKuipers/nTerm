import { Command } from "../cmd";
import { environment } from "../env";
import { GHIntergration } from "../github";
import { userInterface } from "../ui";
import { utilities } from "../util";

export const gh: Command = {
  execute: async (...argv) => {
    if (!argv.length)
      return userInterface.error(
        `No sub-command specified! Type "HELP GH" for help`
      );

    const subCommand = argv[0].toLowerCase();

    if (!subCommandMap.has(subCommand))
      return userInterface.error(`"${subCommand}" is not a valid sub-command!`);

    await subCommandMap.get(subCommand)?.();
  },
  description: "View information about GitHub repositories",
  usage: "GH <userrepo|orgrepo|repo|commits|user> <user/repo|user|org>",
};

const subCommandMap = new Map<string, () => void>([
  [
    "userrepo",
    async () => {
      const argv = environment.currentInstance.env.argv;
      const subSubCommand = argv[1];
      const repos = await GHIntergration.getUserRepos(subSubCommand);

      if (!repos.length)
        return userInterface.error(`User has no repos or user not found!`);

      for (let i = 0; i < repos.length; i++) {
        userInterface.output(`${repos[i].name.padEnd(35, " ")}: `, false);

        if (repos[i].description) {
          userInterface.output(repos[i].description);
        } else {
          userInterface.outputColor("[Description Not Found]", `var(--gray)`);
        }
      }
    },
  ],
  [
    "orgrepo",
    async () => {
      const subSubCommand = environment.currentInstance.env.argv[1];
      const repos = await GHIntergration.getOrgRepos(subSubCommand);

      if (!repos.length)
        return userInterface.error(
          `Organization has no repos or organization not found!`
        );

      for (let i = 0; i < repos.length; i++) {
        userInterface.output(`${repos[i].name.padEnd(35, " ")}: `, false);

        if (!repos[i].description) {
          userInterface.outputColor("[Description Not Found]", `var(--gray)`);
          continue;
        }

        userInterface.output(repos[i].description);
      }
    },
  ],
  [
    "repo",
    async () => {
      const subSubCommand = environment.currentInstance.env.argv[1];
      const repo = await GHIntergration.getRepoDetails(subSubCommand);
      const owner = repo.owner.login;
      const name = repo.full_name;
      const desc = repo.description || "No description";
      const url = repo.html_url;
      const gurl = `${repo.html.url}.git`;
      const upat = repo.updated_at;

      if (repo.message) {
      }

      if (!repo.message && !repo.documentation_url) {
        userInterface.output(`Owner           : ${owner}`);
        userInterface.output(`Full Name       : ${name}`);
        userInterface.output(`Description     : ${desc}\n`);
        userInterface.output(`URL             : ${url}`);
        userInterface.output(`Git URL         : ${gurl}.git\n`);
        userInterface.output(`Last Updated    : ${upat}`);
      } else {
        userInterface.error(`Unable to get repo information: ${repo.message}`);
      }
    },
  ],
  [
    "commits",
    async () => {
      const subSubCommand = environment.currentInstance.env.argv[1];
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
        userInterface.error(
          `Unable to get user information: ${commits.message}`
        );
      }
    },
  ],
  [
    "user",
    async () => {
      const subSubCommand = environment.currentInstance.env.argv[1];
      const userInfo = await GHIntergration.getUserDetails(subSubCommand);

      if (!userInfo.message && !userInfo.documentation_url) {
        userInterface.outputColor(
          `Fetching user information of [${subSubCommand}]...`,
          `var(--blue)`
        );
        userInterface.output(
          `GitHub Name   : ${userInfo.login || "Unknown"}\n` +
            `Full Name     : ${userInfo.name || "Not specified"}\n` +
            `Bio           : ${userInfo.bio || "No bio"}\n\n` +
            `Organization  : ${
              userInfo.company || "Not part of an organization"
            }\n` +
            `Website       : ${userInfo.blog || "No website specified"}\n` +
            `Email         : ${userInfo.email || "No email specified"}\n` +
            `URL           : ${
              userInfo.html_url || "Unable to fetch URL"
            }\n\n` +
            `Location      : ${userInfo.location || "Not specified"}\n` +
            `Followers     : ${userInfo.followers || 0}\n` +
            `Following     : ${userInfo.following || 0}\n`
        );
      } else {
        userInterface.error(
          `Unable to get user information: ${userInfo.message}`
        );
      }
    },
  ],
]);
