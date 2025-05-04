"use client"

import NavItem from './NavItem';
import styles from '@/styles/components/Navbar.module.css';
import { GiFox } from 'react-icons/gi';
import { ThemeToggle } from './ThemeToggle';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Divide as Hamburger } from 'hamburger-react'

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathName = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    };

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen]);

  const closeMenu = () => {
    setIsClosing(true); 
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 500);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };
  
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
              <Hamburger size={23} rounded toggled={menuOpen} />
            </button>
          </div>
        )}

        <ThemeToggle />
      </nav>
      {isMobile && (menuOpen || isClosing) && (
        <div ref={mobileMenuRef} className={`${styles.mobileMenu} ${isClosing ? styles.menuClosing : ''}`} >
          <NavItem href="/" label="Home" active={pathName === "/"} onClick={handleNavLinkClick} />
          <NavItem href="/projects" label="Projects" active={pathName === "/projects"} onClick={handleNavLinkClick} />
          <NavItem href="/about" label="About" active={pathName === "/about"} onClick={handleNavLinkClick} />
        </div>
      )}
    </header>
  );
}

export default Navbar;
