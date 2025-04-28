"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FiSun, FiMoon } from "react-icons/fi";

import styles from "@/components/Navbar/Navbar.module.css"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
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
      className={`${styles.themeToggle} ${theme === "dark" ? styles.dark : styles.light}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <span className={styles.iconContainer}>
        <FiSun className={styles.sunIcon} />
        <FiMoon className={styles.moonIcon} />
      </span>
    </button>
  )
}
