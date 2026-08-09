import Image from "next/image";

import Logo from "../assets/logo.svg";
import { BgmToggleButton } from "./bgm-toggle-button";
import { HomeLottie } from "./home-lottie";
import * as styles from "./home-page.css";
import { StartButton } from "./start-button";

export function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.backgroundLayer}>
        <Image
          src="/images/landing/background.png"
          alt=""
          fill
          priority
          sizes="(min-width: 480px) 480px, 100vw"
          className={styles.backgroundImage}
        />
        <div className={styles.backgroundOverlay} />
      </div>

      <div className={styles.topBar}>
        <BgmToggleButton />
      </div>

      <div className={styles.content}>
        <Logo className={styles.logo} role="img" />
        <HomeLottie className={styles.character} />
      </div>

      <div className={styles.footer}>
        <StartButton participantCount={19089} />
      </div>
    </div>
  );
}
