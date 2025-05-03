import React from "react";
import Image from "next/image";
import styles from "./ProjectCard.module.css";
import { RepoData } from "@/types/RepoData";
import { AiFillStar } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { languageIconMap } from "@/lib/DevIconMap";
import Tag from "./Tag";

export default function ProjectCard({ name, git_name, description, stargazers_count, language, url, homepage_url, tags }: RepoData) {
  const iconSrc = languageIconMap[language] || languageIconMap["Unknown"];
  
  return (
    <div className={styles.card}>
      <a className={styles.link} href={url} target="_blank" rel="noopener noreferrer">
        <div className={styles.content}>
          <div className={styles.header}>
            <div>
              <h3 className={styles.title}>{name}</h3>
              <h6 className={styles.gitName}>{git_name}</h6>
            </div>
            <div className={styles.meta}>
              <div className={styles.star}>
                <AiFillStar /> {stargazers_count}
              </div>
            </div>
          </div>
          <p className={styles.description}>{description || 'No description available'}</p>
          <div className={styles.footer}>
            <div className={styles.iconContainer}>
              <Image src={iconSrc} alt={`${language} icon`} width={20} height={20} className={styles.languageIcon} />
            </div>
            {homepage_url && (
              <div className={styles.iconContainer}>
              <a href={homepage_url} target="_blank" rel="noopener noreferrer" >
                <BsGlobe className={styles.icon} />
              </a>
              </div>
            )}
            <div className={styles.tags}>
              {tags?.map((tag, index) => (
                <Tag key={index} text={tag} />
              ))}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
