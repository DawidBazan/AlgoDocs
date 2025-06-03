import { createContext, useContext, ReactNode } from 'react';
import { createConfig, configureChains, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

const projectId = 'YOUR_PROJECT_ID'; // Get this from WalletConnect Cloud

const { chains, publicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const metadata = {
  name: 'ChainStamp',
  description: 'Blockchain Document Certification',
  url: 'https://chainstamp.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
        metadata,
      },
    }),
  ],
  publicClient,
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'light',
  themeVariables: {
    '--w3m-font-family': 'Inter, sans-serif',
    '--w3m-accent-color': '#303F9F',
    '--w3m-background-color': '#303F9F',
  },
});

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};