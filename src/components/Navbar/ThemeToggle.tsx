"use client"

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';

import styles from "@/styles/components/ThemeToggle.module.css"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isClient || !resolvedTheme)
    return null


  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={styles.themeToggle}
      aria-label={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {resolvedTheme === "dark" ? (
        <FiMoon className={styles.icon}/>
      ) : (
        <FiSun className={styles.icon} />
      )}
    </button>
  )
}
