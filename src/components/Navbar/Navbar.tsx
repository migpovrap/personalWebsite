"use client"

import NavItem from './NavItem';
import styles from "./Navbar.module.css";
import { GiFox } from "react-icons/gi";
import { ThemeToggle } from './ThemeToggle';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Divide as Hamburger } from 'hamburger-react'

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
 console.log(menuOpen);
  return (
    <header className={`${styles.header} ${menuOpen ? styles.menuOpen : ''}`}>
      <nav className={styles.nav}>
        <GiFox className={styles.navIcon} />
        
        {!isMobile ? (
            <div className={styles.navLinks}>
            <NavItem href="/" label="Home" active={pathName === "/"} />
            <NavItem href="/projects" label="Projects" active={pathName === "/projects"} />
            <NavItem href="/about" label="About" active={pathName === "/about"} />
            </div>
        ) : (
          <div className={styles.mobileIcons}>
            <button onClick={toggleMenu} className={styles.menuButton}>
              <Hamburger size={23} rounded hideOutline={true} />
            </button>
          </div>
        )}

        <ThemeToggle />
      </nav>
      {isMobile && menuOpen && (
        <div className={styles.mobileMenu}>
          <NavItem href="/" label="Home" active={pathName === "/"} />
          <NavItem href="/projects" label="Projects" active={pathName === "/projects"} />
          <NavItem href="/about" label="About" active={pathName === "/about"} />
        </div>
      )}
    </header>
  );
}

export default Navbar;
