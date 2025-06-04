import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, DollarSign } from 'lucide-react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  processing: boolean;
  transactionFee: number;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  processing,
  transactionFee,
}) => {
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

          <h2 className="text-2xl font-heading font-bold mb-4">Confirm Transaction</h2>
          
          <div className="mb-6">
            <div className="p-4 bg-navy-50 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-navy-700 font-medium">Network Fee</span>
                <span className="font-mono">{transactionFee.toFixed(3)} ALGO</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-navy-700 font-medium">Total Cost</span>
                <span className="font-mono font-bold">{transactionFee.toFixed(3)} ALGO</span>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-blue-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-blue-800 text-sm">
                This transaction will create a permanent record of your document on the Algorand blockchain.
                The network fee is required to process this transaction.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 btn btn-outline"
              disabled={processing}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={processing}
              className="flex-1 btn btn-primary"
            >
              {processing ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TransactionModal;