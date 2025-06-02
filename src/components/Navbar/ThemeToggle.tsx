"use client"

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

import styles from "@/styles/components/ThemeToggle.module.css"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <button className={styles.themeToggle}></button>
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={`${styles.themeToggle} ${resolvedTheme === "dark" ? styles.dark : ""}`}
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
