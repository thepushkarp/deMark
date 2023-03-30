import styles from "./App.module.scss";
import { useStorageUpload } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProofInfo from "@/components/ProofInfo";
import Uploader from "@/components/Uploader";

export default function App() {
  const [cidBeforeUpload, setCidBeforeUpload] = useState<string>("");
  const [ipfsLink, setIpfsLink] = useState<string>("");
  const { mutateAsync: upload } = useStorageUpload();

  useEffect(() => {
    setCidBeforeUpload("");
    setIpfsLink("");
  }, []);

  const setIpfsData = (data: { ipfsLink: string; cidBeforeUpload: string }) => {
    setIpfsLink(data.ipfsLink);
    setCidBeforeUpload(data.cidBeforeUpload);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {ipfsLink ? <ProofInfo ipfsLink={ipfsLink} /> : <Uploader ipfsData={setIpfsData} />}
        </div>
      </main>
    </>
  );
}
