class GitHubIntergration {
  async getUserRepos(username: string) {
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
