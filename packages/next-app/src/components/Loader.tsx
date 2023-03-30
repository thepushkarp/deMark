import styles from "./Components.module.scss";
import { Inter } from "next/font/google";
import { PuffLoader } from "react-spinners";

const inter = Inter({ subsets: ["latin"] });

export default function Loader() {
  return (
    <div id="loader" className={styles.loaderContainer}>
      <PuffLoader color="#0071ff" speedMultiplier={2} size={100} />
      <p className={inter.className}>Uploading image to IPFS...</p>
    </div>
  );
}
