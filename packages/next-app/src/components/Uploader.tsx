import { useStorageUpload } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Components.module.scss";
import Loader from "./Loader";
const Hash = require("ipfs-only-hash");

// send ipfsLink and cidBeforeUpload to parent component
export default function Uploader(props: { ipfsData: (data: { ipfsLink: string; cidBeforeUpload: string }) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [ipfsLink, setIpfsLink] = useState<string>("");
  const [cidBeforeUpload, setCidBeforeUpload] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: upload } = useStorageUpload();

  useEffect(() => {
    setFile(null);
    setCidBeforeUpload("");
    setIpfsLink("");
  }, []);

  const isFileTooLarge = (file: File) => {
    // Can't upload a file with size > 15MB
    return file.size > 15 * 1024 * 1024;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (isFileTooLarge(file)) {
        alert("File size is too large. Please upload a file with size less than 15MB.");
        return;
      }
      setFile(file);
    }
  };

  const generateCidBeforeUpload = async (file: File) => {
    const fileData = new Uint8Array(await file.arrayBuffer());
    let cidBeforeUpload = await Hash.of(fileData);
    console.log("CID before upload:", cidBeforeUpload);
    setCidBeforeUpload(cidBeforeUpload);
  };

  const uploadToIpfs = async () => {
    if (file) {
      setIsUploading(true);
      generateCidBeforeUpload(file);
      const uploadUrl = await upload({
        data: [file],
        options: {
          uploadWithGatewayUrl: false,
          uploadWithoutDirectory: true,
        },
      });
      setIpfsLink(uploadUrl[0]);
      setFile(null);
      setIsUploading(false);
      props.ipfsData({
        ipfsLink: ipfsLink,
        cidBeforeUpload: cidBeforeUpload,
      });
    }
  };

  return (
    <>
      {isUploading ? (
        <Loader />
      ) : (
        <div id="upload">
          {file ? (
            <div className={styles.uploadedFileContainer}>
              <Image src={URL.createObjectURL(file)} alt="Uploaded image" width={250} height={250} />
              <div className={styles.uploadBtnContainer}>
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
          ) : (
            <div className={styles.fileChooserContainer}>
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
          )}
        </div>
      )}
    </>
  );
}
