import styles from "./App.module.scss";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProofInfo from "@/components/ProofInfo";
import Uploader from "@/components/Uploader";

export default function App(props: any) {
  const [cidBeforeUpload, setCidBeforeUpload] = useState<string>("");
  const [ipfsLink, setIpfsLink] = useState<string>("");

  useEffect(() => {
    console.log("Address:", props.address);
  }, [props.address]);

  const setIpfsData = (data: { ipfsLink: string; cidBeforeUpload: string }) => {
    console.log("Data:", data);
    setIpfsLink(data.ipfsLink);
    setCidBeforeUpload(data.cidBeforeUpload);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {ipfsLink && cidBeforeUpload ? (
            <ProofInfo ipfsLink={ipfsLink} />
          ) : (
            <Uploader address={props.address} setIpfsData={setIpfsData} />
          )}
        </div>
      </main>
    </>
  );
}
