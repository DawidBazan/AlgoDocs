import React from 'react';
import { Wallet } from 'lucide-react';
import { useAlgorand } from '../context/AlgorandContext';

interface ConnectWalletButtonProps {
  fullWidth?: boolean;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ fullWidth = false }) => {
  const { connect, disconnect, connected, address } = useAlgorand();

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <button
      onClick={connected ? disconnect : connect}
      className={`btn ${
        connected ? 'btn-outline' : 'btn-primary'
      } ${fullWidth ? 'w-full' : ''}`}
    >
      <Wallet size={20} />
      {connected ? formatAddress(address) : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWalletButton