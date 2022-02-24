import { kernel } from "../kernel";

class GitHubIntergration {
  async getUserRepos(username: string) {
    kernel.log("Started GitHubIntergration.getUserRepos");

    return await this.getFromAPI(`users/${username}/repos`);
  }

  async getOrgRepos(orgname: string) {
    kernel.log("Started GitHubIntergration.getOrgRepos");

    return await this.getFromAPI(`orgs/${orgname}/repos`);
  }

  async getRepoDetails(repo: string) {
    kernel.log("Started GitHubIntergration.getRepoDetails");

    return await this.getFromAPI(`repos/${repo}`);
  }

  async getCommits(repo: string) {
    kernel.log("Started GitHubIntergration.getCommits");

    return await this.getFromAPI(`repos/${repo}/commits`);
  }

  async getUserDetails(user: string) {
    kernel.log("Started GitHubIntergration.getUserDetails");

    return await this.getFromAPI(`users/${user}`);
  }

  async getFromAPI(prefix: string) {
    kernel.log("Started GitHubIntergration.getFromAPI");

    return await this.fetchJson(`https://api.github.com/${prefix}`);
  }

  async fetchJson(url: string) {
    kernel.log("Started GitHubIntergration.fetchJson");
    
    let returnData = await (await fetch(url)).json();
    if (!returnData) {
      return this.defaultReturnValue;
    } else if (returnData?.message == "Server Error") {
      return this.serverDownReturnValue;
    } else {
      return returnData;
    }
  }

  defaultReturnValue = {
    message: "Internet Connection couldn't be established",
    documentation_url: "none",
  };

  serverDownReturnValue = {
    message: "GitHub API offline!",
    documentation_url: "https://www.githubstatus.com/",
  };
}

export const GHIntergration = new GitHubIntergration();
