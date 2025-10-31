import { RepoData, GithubJsonRepo } from "@/types/RepoData";

function jsonToRepoData(repo: GithubJsonRepo): RepoData {
  return {
    name: repo.name,
    git_name: repo.full_name,
    description: repo.description,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
    url: repo.html_url,
    homepage_url: repo.homepage,
    tags: repo.topics,
  };
}

const cache = new Map<string, { data: RepoData[]; timestamp: number }>();
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour in milliseconds
const blackList = [ "migpovrap/github-readme-stats", "migpovrap/neiist-website" ];

interface CloudflareEnv {
  GITHUB_TOKEN_CF_WORKER?: {
    get(): Promise<string>;
  };
}

async function getGitHubToken(): Promise<string | undefined> {
  try {
    const env = globalThis as unknown as CloudflareEnv;
    if (env.GITHUB_TOKEN_CF_WORKER) {
      return await env.GITHUB_TOKEN_CF_WORKER.get();
    }
    return process.env.GITHUB_TOKEN;
  } catch (error) {
    console.error('Failed to get GitHub token:', error);
    return undefined;
  }
}

export async function getGithubProjects(username: string): Promise<RepoData[]> {

  const cacheKey = `projects:${username}`;
  const cachedData = cache.get(cacheKey);

  // Check if cache is valid
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
    return cachedData.data; // Serve cached data
  }

  const token = await getGitHubToken();

  if (!token) {
    throw new Error('GITHUB_TOKEN is not set in environment variables.');
  }

  const headers: HeadersInit = {
    'User-Agent': 'request',
  };

  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { headers }
  );


  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const rawJson: GithubJsonRepo[] = await response.json();

  const repoData = rawJson.map(jsonToRepoData);

  const collaboratorProjects = await getCollaboratorProjects();
  let allProjects = repoData.concat(collaboratorProjects);

  allProjects = allProjects.filter( function (project) {
    return !blackList.includes(project.git_name);
  });
  
  cache.set(cacheKey, { data: allProjects, timestamp: Date.now() });
  
  return allProjects;
}

async function getCollaboratorProjects(): Promise<RepoData[]> {
  const token = await getGitHubToken();

  if (!token) {
    throw new Error('GITHUB_TOKEN is not set in environment variables.');
  }

  const headers = {
    Authorization: `token ${token}`,
    'User-Agent': 'request',
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
