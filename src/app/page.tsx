import styles from './styles/HomePage.module.css';
import Image from 'next/image';

export default function HomePage() {
  return (
<div className={styles.page}>
  <div className={styles.textContainer}>
    <h2 className={styles.title}>Hi, I&apos;m Miguel Raposo</h2>
    <p className={styles.text}>A Computer Science and Engineering Student @ Instituto Superior Técnico, Lisbon.</p>
    <br/>
    <p className={styles.text}>Also a rower and fascinated with tech in general, trying to justify having a HomeLab.</p>
  </div>
  <div className={styles.imageContainer}>
    <Image
      className={styles.foxIcon}
      src="/fox_coding.png"
      width={500}
      height={500}
      alt="Fox Coding"
    />
  </div>
</div>
  );
}
