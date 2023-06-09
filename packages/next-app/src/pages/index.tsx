import Head from "next/head";
import App from "./App/App";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig, useAccount } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli, localhost } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Landing from "./Landing/Landing";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli, localhost],
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
  autoConnect: false,
  connectors,
  provider,
});

export default function Home() {
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
          <ThirdwebProvider>{address ? <App /> : <Landing />}</ThirdwebProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
