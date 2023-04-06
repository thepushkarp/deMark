import { useStorageUpload } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Components.module.scss";
import Loader from "./Loader";
const Hash = require("ipfs-only-hash");
import { ethers } from "ethers";

import contract from "../contracts/contract-address.json";
import artifacts from "../contracts/deMark.json";

export default function Uploader(props: any) {
  const [file, setFile] = useState<File | null>(null);
  const [ipfsLink, setIpfsLink] = useState<string>("");
  const [cidBeforeUpload, setCidBeforeUpload] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: upload } = useStorageUpload();

  useEffect(() => {
    if (ipfsLink && cidBeforeUpload) {
      props.setIpfsData({
        ipfsLink: ipfsLink,
        cidBeforeUpload: cidBeforeUpload,
      });
      console.log("IPFS link:", ipfsLink);
    }
  }, [ipfsLink, cidBeforeUpload, props]);

  const callNFTContract = async (ipfsLink: string, signerAddress: string) => {
    console.log("Contracts", contract);
    console.log("Artifacts", artifacts);

    const demarkSBT = new ethers.Contract(contract.deMark, artifacts.abi);
    const tx = await demarkSBT.connect(signerAddress).mint(signerAddress, ipfsLink);
    const receipt = await tx.wait();
    if (!receipt.status) {
      throw Error(`Transaction failed: ${tx.hash}`);
    }
    console.log(`Transaction successful: ${tx.hash}`);
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
      await upload({
        data: [file],
        options: {
          uploadWithGatewayUrl: false,
          uploadWithoutDirectory: true,
        },
      }).then((uploadUrl: string[]) => {
        setIpfsLink(uploadUrl[0]);
        callNFTContract(uploadUrl[0], props.address);
        setIsUploading(false);
        setFile(null);
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
              <Image
                src={URL.createObjectURL(file)}
                alt="Uploaded image"
                height="0"
                width="0"
                style={{
                  width: "auto",
                  height: "250px",
                }}
              />
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
