import styles from "./App.module.scss";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProofInfo from "@/components/ProofInfo";
import Uploader from "@/components/Uploader";

export default function App(props: any) {
  const [cidBeforeUpload, setCidBeforeUpload] = useState<string>("");
  const [ipfsLink, setIpfsLink] = useState<string>("");
  const [txnHash, setTxnHash] = useState<string>("");
  let flag = false;

  useEffect(() => {
    console.log("Address:", props.address);
  }, [props.address]);

  const setIpfsData = (data: any) => {
    console.log("Beta:", data);
    console.log("yoyooy");
    setTxnHash(data.txnHash);
    setIpfsLink(data.ipfsLink);
    setCidBeforeUpload(data.cidBeforeUpload);
    flag = true;
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {ipfsLink && cidBeforeUpload && txnHash && flag ? (
            <ProofInfo ipfsLink={ipfsLink} txnHash={txnHash} />
          ) : (
            <Uploader address={props.address} provider={props.provider} setIpfsData={setIpfsData} />
          )}
        </div>
      </main>
    </>
  );
}
