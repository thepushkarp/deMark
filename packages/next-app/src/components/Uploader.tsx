import { useStorageUpload } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Components.module.scss";
import Loader from "./Loader";
const Hash = require("ipfs-only-hash");
import { ethers } from "ethers";

import { encode, decode } from "../steg/steganography";

import contract from "../contracts/contract-address.json";
import artifacts from "../contracts/deMark.json";
import { useContract, useProvider, useSigner } from "wagmi";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Uploader(props: any) {
  const [file, setFile] = useState<any>(null);
  const [ipfsLink, setIpfsLink] = useState<string>("");
  const [cidBeforeUpload, setCidBeforeUpload] = useState<string>("");
  const [txnHash, setTxnHash] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: upload } = useStorageUpload();

  const { data: signer, isError, isLoading } = useSigner();

  const demarkSBT = useContract({
    address: contract.deMark,
    abi: artifacts.abi,
    signerOrProvider: signer,
  });

  useEffect(() => {
    if (ipfsLink && cidBeforeUpload && txnHash) {
      console.log("IPFS link:", ipfsLink);
      console.log("CID before upload:", cidBeforeUpload);
      console.log("Transaction hash:", txnHash);
      // props.setIpfsData({
      //   ipfsLink: ipfsLink,
      //   cidBeforeUpload: cidBeforeUpload,
      //   txnHash: txnHash,
      // });

      // Convert File to Base64
      const base64img = btoa(new Uint8Array(file).reduce((data, byte) => data + String.fromCharCode(byte), ""));
      console.log(base64img);
      const encoded = encode(txnHash, base64img);

      console.log(encoded);
    }
  }, [ipfsLink, cidBeforeUpload, txnHash, props]);

  const callNFTContract = async (ipfsLink: string, signerAddress: string) => {
    console.log("Contracts", contract);
    console.log("Artifacts", artifacts);
    console.log("Signer", signer);

    console.log("hi");

    console.log(demarkSBT);

    await demarkSBT?.mint(signerAddress, ipfsLink).then((txn: any) => {
      setTxnHash(txn["hash"]);
      console.log("yo");
      console.log(txn);
    });
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
      {ipfsLink && txnHash ? (
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
      ) : (
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
                      Upload
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
      )}
    </>
  );
}
