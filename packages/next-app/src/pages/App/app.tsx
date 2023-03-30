import styles from "./App.module.scss";
import { useStorageUpload } from "@thirdweb-dev/react";
import React, { useState } from "react";
import Header from "@/components/Header";
import ProofInfo from "@/components/ProofInfo";
import Uploader from "@/components/Uploader";

export default function App() {
  const [cidBeforeUpload, setCidBeforeUpload] = useState<string>("");
  const [ipfsLink, setIpfsLink] = useState<string>("");

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
          {ipfsLink && cidBeforeUpload ? <ProofInfo ipfsLink={ipfsLink} /> : <Uploader setIpfsData={setIpfsData} />}
        </div>
      </main>
    </>
  );
}
