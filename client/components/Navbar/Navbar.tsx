import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/">
          <li>About</li>
        </Link>
        <Link href="/">
          <li>Contact</li>
        </Link>
      </ul>
    </nav>
  );
}
