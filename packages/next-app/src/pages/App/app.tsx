import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useStorageUpload } from "@thirdweb-dev/react";
import { useState } from "react";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export default function App() {
  const [file, setFile] = useState();
  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    const uploadUrl = await upload({
      data: [file],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });
    alert(uploadUrl);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
          <button onClick={uploadToIpfs}>Upload</button>
        </div>
      </main>
    </>
  );
}
