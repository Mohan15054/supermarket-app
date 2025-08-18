import Link from 'next/link';
import styles from './navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <h3>🔄 Rendering & Network Comparison Demo</h3>
      <div className={styles.links}>
        <Link href="/csr" className={styles.link}>
          🖥️ CSR (Client-Side)
        </Link>
        <Link href="/ssr" className={styles.link}>
          � CSR with Polling
        </Link>
        <Link href="/ssr-true" className={styles.link}>
          ⚡ TRUE SSR
        </Link>
        <Link href="/ssr-hybrid" className={styles.link}>
          🔄 Hybrid SSR+CSR
        </Link>
        <Link href="/ssg" className={styles.link}>
          🏗️ SSG (Static)
        </Link>
        <Link href="/comparison" className={styles.link}>
          📊 Feature Comparison
        </Link>
        <Link href="/network-comparison" className={styles.link}>
          🌐 Network Comparison
        </Link>
        <Link href="/" className={styles.link}>
          🏠 Home
        </Link>
      </div>
    </nav>
  );
}
