export type GithubJsonRepo = {
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  homepage: string;
  topics: string[];
};

export type RepoData = {
  name: string;
  git_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  url: string;
  homepage_url: string;
  tags: string[];
};
