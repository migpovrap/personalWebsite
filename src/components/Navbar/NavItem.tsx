import Link from 'next/link';
import styles from './Navbar.module.css';

type NavItemProps = {
  href: string;
  label: string;
  active: boolean;
};

export default function NavItem({ href, label, active }: NavItemProps) {
  return (
    <Link href={href}  className={`${styles.navLink} ${active ? styles.active : ''}`} >
      {label}
    </Link>
  );
}
