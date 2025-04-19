import Link from 'next/link';
import styles from './Navbar.module.css';

type NavItemProps = {
  href: string;
  label: string;
};

export default function NavItem({ href, label }: NavItemProps) {
  return (
    <Link href={href} className={styles.navLink} >
      {label}
    </Link>
  );
}
