import { FaGithub, FaLinkedin,  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import styles from "./Footer.module.css"

function FooterItem({ link, label, Icon }: { link: string; label: string; Icon: React.ElementType }) {
  return (
    <a href={link} className={styles.footerItem} aria-label={label} >
      <Icon />
    </a>
  );
}

export default function Footer({ year }: { year: number }) {
  return (
    <div className={styles.footer}>
      <div className={styles.footerIcons}>
        <FooterItem link="https://github.com/migpovrap" label="GitHub" Icon={FaGithub} />
        <FooterItem link="https://linkedin.com/in/miguelpraposo" label="Linkedin" Icon={FaLinkedin} />
        <FooterItem link="mailto:miguel.p.raposo@tecnico.ulisboa.pt" label="Email" Icon={MdEmail} />
      </div>
      <br/>
      <p className={styles.footerText}>
        © {year} Miguel Raposo. All rights reserved.
      </p>
    </div>
  );
}
