import React from "react";
import styles from "./Tag.module.css";

export default function Tag({ text }: { text: string }) {
  return (
    <span className={styles.tag}>
      {text}
    </span>
  );
}