import styles from './page.module.css';

export default async function Page() {
  // Simulation of loading for 8 seconds
  await new Promise(resolve => setTimeout(resolve, 8000));

  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h4 className={styles.title}>Маршрут 2 Завантажено через 8 секунд</h4>
        </div>
      </div>
  );
}
