import { HealthStatus } from "./health-status";
import * as styles from "./home-page.css";

export function HomePage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>death-client</h1>
      <p className={styles.description}>
        Next.js 16 · TypeScript · vanilla-extract · TanStack Query · FSD
      </p>
      <HealthStatus />
    </main>
  );
}
