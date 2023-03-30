import styles from "./Components.module.scss";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <a href="/">
          <p className={`${inter.className} ${styles.headerText}`}>deMark</p>
        </a>
      </div>
      <div className={styles.headerRight}>
        <ConnectButton showBalance={false} />
      </div>
    </div>
  );
}
