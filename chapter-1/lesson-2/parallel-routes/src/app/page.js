import Link from 'next/link';
import styles from './page.module.css'; // Assuming you have a CSS module

export default function Home() {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <Link href="/parallel-routes" className={styles.link}>
                        <span>Parallel Routes</span>
                        <svg className={styles.arrow} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
