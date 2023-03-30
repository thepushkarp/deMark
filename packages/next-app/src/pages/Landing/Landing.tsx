import styles from "./Landing.module.scss";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export default function Landing() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className={styles.center}>
          <h1 className={`${inter.className} ${styles.title}`}>deMark</h1>
          <p className={`${inter.className} ${styles.description}`}>Proof of Source for your Images</p>
        </div>
        <ConnectButton showBalance={false} />
      </div>
    </main>
  );
}
