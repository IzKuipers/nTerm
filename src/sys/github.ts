import { kernel } from "../kernel";

class GitHubIntergration {
  async getUserRepos(username: string) {
    kernel.log(`GitHub Intergration: getting repositories from user "${username}"...`);
    const data = await fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      }).catch(() => {
        return {};
      });

    return data;
  }

  async getOrgRepos(orgname: string) {
    kernel.log(`GitHub Intergration: getting repositories from organization "${orgname}"...`);
    const data = await fetch(`https://api.github.com/orgs/${orgname}/repos`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      }).catch(() => {
        return {};
      });

    return data;
  }

  async getRepoDetails(repo: string) {
    kernel.log(`GitHub Intergration: getting details for repository "${repo}"...`);
    const data = await fetch(`https://api.github.com/repos/${repo}`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      }).catch(() => {
        return {};
      });

    return data;
  }

  async getCommits(repo:string) {
    kernel.log(`GitHub Intergration: getting commits from repository "${repo}"...`);
    const data = await fetch(`https://api.github.com/repos/${repo}/commits`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    }).catch(() => {
      return {};
    });

  return data;
  }
}

export const GHIntergration = new GitHubIntergration();
