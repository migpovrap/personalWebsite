import { RepoData, GithubJsonRepo } from "@/types/RepoData";

function jsonToRepoData(repo: GithubJsonRepo): RepoData {
  return {
    name: repo.name,
    git_name: repo.full_name,
    description: repo.description,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
    url: repo.html_url,
    tags: repo.topics,
  };
}

export async function getGithubProjects(username: string): Promise<RepoData[]> {

  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const rawJson: GithubJsonRepo[] = await response.json();

  const repoData = rawJson.map(jsonToRepoData);
  
  return repoData.concat(await getCollaboratorProjects());
}

async function getCollaboratorProjects(): Promise<RepoData[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN is not set in environment variables.');
  }

  const headers = {
    Authorization: `token ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  const response = await fetch('https://api.github.com/user/repos?affiliation=collaborator&visibility=public',
    {headers});

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const rawJson: GithubJsonRepo[] = await response.json();
  const colabData = rawJson.map(jsonToRepoData);

  return colabData;
}
