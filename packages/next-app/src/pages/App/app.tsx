import styles from "@/styles/Home.module.css";
import { useStorageUpload } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Image from "next/image";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    if (file) {
      const uploadUrl = await upload({
        data: [file],
        options: {
          uploadWithGatewayUrl: false,
          uploadWithoutDirectory: true,
        },
      });
      alert(uploadUrl);
      setFile(null);
    }
  };

  const isFileTooLarge = (file: File) => {
    // Can't upload a file with size > 15MB
    return file.size > 15 * 1024 * 1024;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (isFileTooLarge(file)) {
        alert("File size is too large");
        return;
      }
      setFile(file);
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
          <div>{file && <Image src={URL.createObjectURL(file)} alt="Preview" width={150} height={150} />}</div>
        </div>
      </main>
    </>
  );
}
