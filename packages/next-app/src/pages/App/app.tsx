import styles from "@/styles/Home.module.css";
import { useStorageUpload } from "@thirdweb-dev/react";
import React, { useState } from "react";
import Header from "@/components/Header/Header";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    if (file) {
      showLoader();
      const uploadUrl = await upload({
        data: [file],
        options: {
          uploadWithGatewayUrl: false,
          uploadWithoutDirectory: true,
        },
      });
      showIPFSUrl(uploadUrl[0]);
      setFile(null);
    }
  };

  const showLoader = () => {
    document.getElementById("upload")?.setAttribute("style", "display:none");
    document.getElementById("loader")?.setAttribute("style", "display:flex;");
  };

  const showIPFSUrl = (ipfsUrl: string) => {
    document.getElementById("loader")?.setAttribute("style", "display:none");
    document
      .getElementById("ipfsLink")
      ?.setAttribute("style", "display:flex; flex-direction: column; align-items: center; justify-content: center;");
    document.getElementById("ipfsLinkAnchor")?.setAttribute("href", ipfsUrl);
    document.getElementById("ipfsLinkText")?.appendChild(document.createTextNode(ipfsUrl));
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            id="ipfsLink"
            style={{
              display: "none",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <h1 className={inter.className}>IPFS Link</h1>
            <a id="ipfsLinkAnchor" href="#" target="_blank" rel="noreferrer noopener">
              <p
                className={inter.className}
                style={{
                  color: "white",
                }}
                id="ipfsLinkText"
              ></p>
            </a>
          </div>
          <div
            id="loader"
            style={{
              display: "none",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Image src="/loader.gif" alt="loader" width={100} height={100} />
          </div>
          <div id="upload">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                onClick={() => {
                  document.getElementById("file-input")?.click();
                }}
                className={`${styles.btn} ${styles.basicBtn}`}
              >
                Choose Image
              </button>
            </div>
            {file && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Image src={URL.createObjectURL(file)} alt="Picture of the author" width={250} height={250} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "350px",
                    marginTop: "20px",
                  }}
                >
                  <button onClick={uploadToIpfs} className={`${styles.btn} ${styles.uploadBtn}`}>
                    Upload to IPFS
                  </button>
                  <button
                    onClick={() => {
                      setFile(null);
                    }}
                    className={`${styles.btn} ${styles.cancelBtn}`}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
