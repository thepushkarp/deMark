import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <p
          className={inter.className}
          style={{
            fontWeight: 700,
            fontSize: "1.5rem",
            userSelect: "none",
          }}
        >
          deMark
        </p>
      </div>
      <div className={styles.headerRight}>
        <ConnectButton showBalance={false} />
      </div>
    </div>
  );
}
