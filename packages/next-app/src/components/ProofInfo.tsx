import styles from "./Components.module.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ProofInfo(props: { ipfsLink: string }) {
  let ipfsLink: string = props.ipfsLink;

  return (
    <div id="ipfsDetails" className={styles.proofInfoContainer}>
      <h1 className={inter.className}>IPFS Link</h1>
      <a id="ipfsLinkAnchor" href={ipfsLink} target="_blank" rel="noreferrer noopener">
        <p className={`${inter.className} ${styles.whiteText}`} id="ipfsLinkText">
          {ipfsLink}
        </p>
      </a>
    </div>
  );
}
