import React from 'react';
import { Wallet } from 'lucide-react';
import { useWeb3Modal } from '@web3modal/wagmi';
import { useAccount, useDisconnect } from 'wagmi';

interface ConnectWalletButtonProps {
  fullWidth?: boolean;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ fullWidth = false }) => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <button
      onClick={() => isConnected ? disconnect() : open()}
      className={`btn ${
        isConnected ? 'btn-outline' : 'btn-primary'
      } ${fullWidth ? 'w-full' : ''}`}
    >
      <Wallet size={20} />
      {isConnected ? formatAddress(address as string) : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWalletButton;