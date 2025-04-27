import Link from 'next/link';
import styles from './Navbar.module.css';

type NavItemProps = {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
};

export default function NavItem({ href, label, active, onClick }: NavItemProps) {
  return (
    <Link href={href}  className={`${styles.navLink} ${active ? styles.active : ''}`} onClick={onClick} >
      {label}
    </Link>
  );
}
