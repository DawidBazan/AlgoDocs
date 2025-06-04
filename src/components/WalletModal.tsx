import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (type: 'pera' | 'walletconnect') => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onSelectWallet }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-heading font-bold mb-2">Connect to a wallet</h2>
          <p className="text-gray-600 mb-6">
            By connecting your wallet, you agree to our Terms of Service and our Privacy Policy.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => onSelectWallet('pera')}
              className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:border-navy-500 transition-colors"
            >
              <img
                src="https://perawallet.app/static/logo-6192aa11d7022d6cbb7f066e80de5066.png"
                alt="Pera Wallet"
                className="w-8 h-8 mr-3"
              />
              <span className="font-medium">Pera Wallet</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WalletModal;