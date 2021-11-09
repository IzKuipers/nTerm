class GitHubIntergration {
  async getUserRepos(username: string) {
    let data = await fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });

    return data;
  }

  async getOrgRepos(orgname: string) {
    let data = await fetch(`https://api.github.com/orgs/${orgname}/repos`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });

    return data;
  }
}

export const GHIntergration = new GitHubIntergration();
