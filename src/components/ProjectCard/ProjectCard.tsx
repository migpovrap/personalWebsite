import React from "react";
import styles from "./ProjectCard.module.css";
import { RepoData } from "@/types/RepoData";
import { FaGithub } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

export default function ProjectCard({name, description, stargazers_count, language, url, tags}: RepoData) {
  return(
    <div className={styles.card}>
      <a className={styles.link} href={url} target="_blank" rel="noopener noreferrer">
        <div className={styles.content}>
            <div className={styles.header}>
              <h3 className={styles.title}>{name}</h3>
              <FaGithub />
            </div>
            <p className={styles.description}>
              {description || 'No description available'}
            </p>
            <div className={styles.tags}>
              <span>{language}</span>
              <span> <AiFillStar /> {stargazers_count}</span>
              <span>{tags}</span>
            </div>
        </div>
      </a>
    </div>
  );
}