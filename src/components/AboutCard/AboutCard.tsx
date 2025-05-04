import React from 'react';
import styles from '@/styles/components/AboutCard.module.css';
import { AboutCardData } from '@/types/AboutData';

export default function Card({ title, subtitle, date, description, tags }: AboutCardData ) {

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.date}>{date}</span>
        </div>
        <h4 className={styles.subtitle}>{subtitle}</h4>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <span className={styles.tag} key={index}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
