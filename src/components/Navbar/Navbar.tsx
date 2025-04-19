import NavItem from './NavItem';
import styles from "./Navbar.module.css";
import { GiFox } from "react-icons/gi";
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <GiFox className={styles.navIcon}/>
        <NavItem href="/" label="Home" />
        <NavItem href="/projects" label="Projects" />
        <NavItem href="/about" label="About" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
