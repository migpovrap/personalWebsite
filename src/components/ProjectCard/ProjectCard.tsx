import React from "react";
import Image from "next/image";
import styles from "./ProjectCard.module.css";
import { RepoData } from "@/types/RepoData";
import { FaGithub } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { languageIconMap } from "@/provider/DevIconMap";

export default function ProjectCard({name, git_name, description, stargazers_count, language, url, tags}: RepoData) {
  const iconSrc = languageIconMap[language] || languageIconMap["Unknown"];
  return(
    <div className={styles.card}>
      <a className={styles.link} href={url} target="_blank" rel="noopener noreferrer">
        <div className={styles.content}>
          <div className={styles.header}>
            <div>
              <h3 className={styles.title}>{name}</h3>
              <h6 className={styles.gitName}>{git_name}</h6>
            </div>
            <FaGithub />
          </div>
          <p className={styles.description}>
            {description || 'No description available'}
          </p>
          <div className={styles.footer}>
            <div>
              <span>
                <Image src={iconSrc} alt={`${language} icon`} width={18} height={18} className={styles.languageIcon} />
              </span>
              <span> <AiFillStar /> {stargazers_count}</span>
            </div>
            <div className={styles.tags}>
              <span>{tags?.join("  ")}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}