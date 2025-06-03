import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

interface ConnectWalletButtonProps {
  fullWidth?: boolean;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ fullWidth = false }) => {
  const { connect, disconnect, connected, address } = useWallet();

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
  };

  const handleClick = async () => {
    if (connected) {
      disconnect();
    } else {
      try {
        await connect();
      } catch (error) {
        console.error('Failed to connect:', error);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`btn ${
        connected ? 'btn-outline' : 'btn-primary'
      } ${fullWidth ? 'w-full' : ''}`}
    >
      <Wallet size={20} />
      {connected ? formatAddress(address) : 'Connect with MetaMask'}
    </button>
  );
};

export default ConnectWalletButton