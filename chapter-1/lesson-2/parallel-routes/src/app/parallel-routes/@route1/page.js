import styles from './page.module.css';

export default async function Page() {
  // Simulation of loading for 2 seconds
  await new Promise(resolve => setTimeout(resolve, 2000));

  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h4 className={styles.title}>Маршрут 1 Завантажено через 2 секунди</h4>
        </div>
      </div>
  );
}
