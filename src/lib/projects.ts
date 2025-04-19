import { RepoData, GithubJsonRepo } from "@/types/RepoData";

function jsonToRepoData(repo: GithubJsonRepo): RepoData {
  return {
    name: repo.name,
    description: repo.description,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
    url: repo.html_url,
    tags: repo.topics,
  };
}

export async function getGithubProjects(username: string): Promise<RepoData[]> {

  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const rawJson: GithubJsonRepo[] = await response.json();

  const repoData = rawJson.map(jsonToRepoData);

  return repoData;
}