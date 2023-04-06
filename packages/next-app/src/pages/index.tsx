import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount } from "wagmi";
import { polygon, polygonMumbai, localhost } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App/app";
import Landing from "./Landing/Landing";
import dynamic from "next/dynamic";

const { chains, provider } = configureChains(
  [
    polygon,
    polygonMumbai,
    // localhost
  ],
  [
    infuraProvider({ apiKey: process.env.INFURA_ID }),
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: "deMark",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function Home() {
  const WagmiConfig = dynamic(() => import("wagmi").then(mod => mod.WagmiConfig), { ssr: false });

  const { address, isConnecting, isDisconnected } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Connected", { address, connector, isReconnected });
    },
    onDisconnect() {
      console.log("Disconnected");
    },
  });

  return (
    <>
      <Head>
        <title>deMark</title>
        <meta name="description" content="deMark" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme({ overlayBlur: "small" })}>
          <ThirdwebProvider>{address ? <App address={address} /> : <Landing />}</ThirdwebProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
