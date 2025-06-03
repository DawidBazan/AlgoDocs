import React from 'react';
import { Wallet, X } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ConnectWalletButtonProps {
  fullWidth?: boolean;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ fullWidth = false }) => {
  const { 
    connected, 
    address, 
    disconnect, 
    showModal, 
    setShowModal,
    connectPera,
    connectMetaMask
  } = useWallet();

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <>
      <button
        onClick={() => connected ? disconnect() : setShowModal(true)}
        className={`btn ${
          connected ? 'btn-outline' : 'btn-primary'
        } ${fullWidth ? 'w-full' : ''}`}
      >
        <Wallet size={20} />
        {connected ? formatAddress(address) : 'Connect Wallet'}
      </button>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-sm"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-heading font-semibold text-navy-900">
                  Connect Wallet
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={connectPera}
                  className="w-full btn btn-outline flex items-center justify-center gap-3"
                >
                  <img 
                    src="https://perawallet.app/img/logo.svg"
                    alt="Pera Wallet"
                    className="w-6 h-6"
                  />
                  Pera Wallet
                </button>
                
                <button
                  onClick={connectMetaMask}
                  className="w-full btn btn-outline flex items-center justify-center gap-3"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                    alt="MetaMask"
                    className="w-6 h-6"
                  />
                  MetaMask
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};