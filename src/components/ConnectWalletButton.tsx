import React from 'react';
import { Wallet } from 'lucide-react';
import { useAlgorand } from '../context/AlgorandContext';
import WalletModal from './WalletModal';

interface ConnectWalletButtonProps {
  fullWidth?: boolean;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ fullWidth = false }) => {
  const { connect, disconnect, connected, address } = useAlgorand();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
  };

  const handleConnect = async (type: 'pera' | 'walletconnect') => {
    try {
      await connect(type);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <>
      <button
        onClick={connected ? disconnect : () => setIsModalOpen(true)}
        className={`btn ${
          connected ? 'btn-outline' : 'btn-primary'
        } ${fullWidth ? 'w-full' : ''}`}
      >
        <Wallet size={20} />
        {connected ? formatAddress(address) : 'Connect Wallet'}
      </button>

      <WalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectWallet={handleConnect}
      />
    </>
  );
};

export default ConnectWalletButton