import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export default function Landing() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div className={styles.center}>
          <h1
            className={inter.className}
            style={{
              margin: "10px",
              fontSize: "4rem",
              userSelect: "none",
            }}
          >
            deMark
          </h1>
          <p
            className={inter.className}
            style={{
              marginTop: "10px",
              fontSize: "1.25rem",
              userSelect: "none",
            }}
          >
            Proof of Source for your Images
          </p>
        </div>
        <ConnectButton showBalance={false} />
      </div>
    </main>
  );
}
