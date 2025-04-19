import { getGithubProjects } from "@/lib/projects"
import styles from "@/app/styles/Projects.module.css";
import ProjectCard from "@/components/ProjectCard/ProjectCard";

export default async function Projects() {
  const repoData = await getGithubProjects('migpovrap');
 
  return(
    <div className={styles.container}>
      <div className={styles.flexLayout}>
      {repoData.map((repoData) => (
      <ProjectCard 
        key={repoData.name}
        name={repoData.name}
        description={repoData.description}
        stargazers_count={repoData.stargazers_count}
        language={repoData.language}
        url={repoData.url}
        tags={repoData.tags}
      />
     ))}
      </div>
    </div>
  );
}