class GitHubIntergration {
  async getUserRepos(username: string) {
    return await this.getFromAPI(`users/${username}/repos`);
  }

  async getOrgRepos(orgname: string) {
    return await this.getFromAPI(`orgs/${orgname}/repos`);
  }

  async getRepoDetails(repo: string) {
    return await this.getFromAPI(`repos/${repo}`);
  }

  async getCommits(repo: string) {
    return await this.getFromAPI(`repos/${repo}/commits`)
  }

  async getUserDetails(user: string) {
    return await this.getFromAPI(`users/${user}`);
  }

  async getFromAPI(prefix: string) {
    return await this.fetchJson(`https://api.github.com/${prefix}`);
  }

  async fetchJson(url: string) {
    return (await (await fetch(url)).json()) || this.defaultReturnValue;
  }

  defaultReturnValue = {
    message: "Internet Connection couldn't be established", documentation_url: "none"
  }
}

export const GHIntergration = new GitHubIntergration();
