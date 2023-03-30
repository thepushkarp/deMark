import styles from "./Components.module.scss";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  const ConnectButton = dynamic(() => import("@rainbow-me/rainbowkit").then(mod => mod.ConnectButton), { ssr: false });

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
