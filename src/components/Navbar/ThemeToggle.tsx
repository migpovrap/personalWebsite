"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { GoSun, GoMoon } from "react-icons/go"
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
    <button className={styles.themeToggle}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <GoMoon /> : <GoSun />}
    </button>
  )
}
