import { kernel } from "../kernel";

class GitHubIntergration {
  async getUserRepos(username: string) {
    kernel.log(
      `GitHub Intergration: getting repositories from user "${username}"...`
    );
    const data = await fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return this.defaultReturnValue;
      });

    return data;
  }

  async getOrgRepos(orgname: string) {
    kernel.log(
      `GitHub Intergration: getting repositories from organization "${orgname}"...`
    );
    const data = await fetch(`https://api.github.com/orgs/${orgname}/repos`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return this.defaultReturnValue;
      });

    return data;
  }

  async getRepoDetails(repo: string) {
    kernel.log(
      `GitHub Intergration: getting details for repository "${repo}"...`
    );
    const data = await fetch(`https://api.github.com/repos/${repo}`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return this.defaultReturnValue;
      });

    return data;
  }

  async getCommits(repo: string) {
    kernel.log(
      `GitHub Intergration: getting commits from repository "${repo}"...`
    );
    const data = await fetch(`https://api.github.com/repos/${repo}/commits`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return this.defaultReturnValue;
      });

    return data;
  }

  async getUserDetails(user: string) {
    kernel.log(
      `GitHub Intergration: getting details of user "${user}"...`
    );

    const data = await fetch(`https://api.github.com/users/${user}`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch(() => {
        return this.defaultReturnValue;
      });

    return data;
  }

  defaultReturnValue = {
    message: "Internet Connection couldn't be established", documentation_url: "none"
  }
}

export const GHIntergration = new GitHubIntergration();
