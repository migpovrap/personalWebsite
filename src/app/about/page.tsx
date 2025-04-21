import styles from '@/app/styles/About.module.css'
import Card from '@/components/AboutCard/AboutCard';
import { educationData, experienceData } from '@/lib/aboutData';

export default function About() {

  return(
    <div>
      <h2 className={styles.title}>Miguel Raposo</h2>
      <div>
        <h6 className={styles.sectionTitle}>Experience</h6>
        <div className={styles.divider} />
        <div className={styles.cardsGrid}>
          {experienceData.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                subtitle={item.subtitle}
                date={item.date}
                description={item.description}
                tags={item.tags}
              />
            ))}
        </div>
      </div>
      <div>
        <h6 className={styles.sectionTitle}>Education</h6>
        <div className={styles.divider} />
        <div className={styles.cardsGrid}>
          {educationData.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              date={item.date}
              description={item.description}
              tags={item.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
