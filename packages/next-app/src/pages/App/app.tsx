import styles from "@/styles/Home.module.css";
import { useStorageUpload } from "@thirdweb-dev/react";
import React, { useState } from "react";
import Header from "@/components/Header/Header";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    if (file) {
      const uploadUrl = await upload({
        data: [file],
        options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
      });
      alert(uploadUrl);
      setFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} multiple={false} />
          <button onClick={uploadToIpfs} disabled={!file}>
            Upload
          </button>
        </div>
      </main>
    </>
  );
}
