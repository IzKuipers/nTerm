class GitHubIntergration {
  async getUserRepos(username: string) {
    let data = await fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      }).catch(() => {
        return {};
      });

    return data;
  }

  async getOrgRepos(orgname: string) {
    let data = await fetch(`https://api.github.com/orgs/${orgname}/repos`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      }).catch(() => {
        return {};
      });

    return data;
  }

  async getRepoDetails(repo: string) {
    let data = await fetch(`https://api.github.com/repos/${repo}`)
      .then((response) => response.json())
      .then((json) => {
        return json;
      }).catch(() => {
        return {};
      });

    return data;
  }

  async getCommits(repo:string) {
    let data = await fetch(`https://api.github.com/repos/${repo}/commits`)
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
