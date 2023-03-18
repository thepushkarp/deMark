import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export default function App() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p className={inter.className}>Yo bitches this works</p>
          <ConnectButton />
        </div>
      </div>
    </main>
  );
}
