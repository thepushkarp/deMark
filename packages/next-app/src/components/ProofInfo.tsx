import styles from "./Components.module.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ProofInfo(props: any) {
  let ipfsLink: string = props.ipfsLink;
  let txnHash: string = props.txnHash;

  return (
    <div id="ipfsDetails" className={styles.proofInfoContainer}>
      <h1 className={inter.className}>IPFS Link</h1>
      <a id="ipfsLinkAnchor" href={ipfsLink} target="_blank" rel="noreferrer noopener">
        <p className={`${inter.className} ${styles.whiteText}`} id="txnLinkText">
          {ipfsLink}
        </p>
      </a>
      <h1 className={inter.className}>Transaction</h1>
      <a
        id="txnLinkAnchor"
        href={"https://mumbai.polygonscan.com/tx/" + txnHash}
        target="_blank"
        rel="noreferrer noopener"
      >
        <p className={`${inter.className} ${styles.whiteText}`} id="txnLinkText">
          {txnHash}
        </p>
      </a>
    </div>
  );
}
