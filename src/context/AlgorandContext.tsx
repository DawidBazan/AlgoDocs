import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import algosdk from 'algosdk';
import { PeraWalletConnect } from '@perawallet/connect';

// Initialize Pera Wallet with MainNet configuration
const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: true,
  network: "mainnet"
});

// Using Algorand MainNet
const algodServer = 'https://mainnet-api.algonode.cloud';
const algodPort = '';
const algodToken = '';

interface AlgorandContextType {
  connect: (type: 'pera' | 'walletconnect') => Promise<void>;
  disconnect: () => void;
  connected: boolean;
  address: string | null;
  balance: number | null;
  algodClient: algosdk.Algodv2 | null;
  peraWallet: PeraWalletConnect | null;
  certifyDocument: (documentHash: string, documentName: string) => Promise<string>;
  verifyDocument: (txId: string) => Promise<{ verified: boolean; data: any }>;
}

const AlgorandContext = createContext<AlgorandContextType | undefined>(undefined);

export const AlgorandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [algodClient, setAlgodClient] = useState<algosdk.Algodv2 | null>(null);
  const [wallet] = useState<PeraWalletConnect>(() => peraWallet);

  const fetchBalance = async (addr: string) => {
    if (!algodClient) return;
    try {
      console.log('Fetching balance for address:', addr);
      const accountInfo = await algodClient.accountInformation(addr).do();
      const rawAmount = BigInt(accountInfo.amount);
      console.log('Raw account amount:', rawAmount.toString());
      const algoBalance = Number(rawAmount) / 1_000_000;
      console.log('Calculated balance in ALGO:', algoBalance);
      setBalance(algoBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
    }
  };

  // Update balance when address changes
  useEffect(() => {
    if (address) {
      fetchBalance(address);
    } else {
      setBalance(null);
    }
  }, [address]);

  useEffect(() => {
    // Initialize Algorand client
    const client = new algosdk.Algodv2(algodToken, algodServer, algodPort);
    setAlgodClient(client);

    // Reconnect session
    wallet
      .reconnectSession()
      .then((accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          fetchBalance(accounts[0]);
          setConnected(true);
        } else {
          setAddress(null);
          setConnected(false);
        }
      })
      .catch((error) => {
        console.log('Reconnect failed:', error);
        setAddress(null);
        setConnected(false);
      });

    // Cleanup
    return () => {
      wallet.disconnect();
    };
  }, [wallet]);

  const connect = async (type: 'pera' | 'walletconnect') => {
    try {
      let accounts;
      if (type === 'pera') {
        accounts = await wallet.connect();
      }
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts selected');
      }

      const address = accounts[0];
      console.log('Successfully connected to wallet:', address);

      setAddress(address);
      fetchBalance(address);
      setConnected(true);
    } catch (error) {
      // Handle user cancellation gracefully
      if (error instanceof Error && error.message === 'Connect modal is closed by user') {
        console.info('User cancelled wallet connection');
      } else {
        console.error('Wallet connection error:', error);
        throw error;
      }
    }
  };

  const disconnect = () => {
    wallet.disconnect();
    setAddress(null);
    setConnected(false);
    setBalance(null);
  };

  const certifyDocument = async (documentHash: string, documentName: string): Promise<string> => {
    if (!algodClient) {
      throw new Error('Algorand client not initialized');
    }

    if (!address) {
      throw new Error('Wallet address is required. Please connect your wallet first.');
    }

    if (!algosdk.isValidAddress(address)) {
      throw new Error('Invalid wallet address format');
    }
    
    if (!balance || balance < 0.001) {
      throw new Error('Insufficient balance. You need at least 0.001 ALGO to certify a document.');
    }

    const senderAddress: string = address; // Type assertion after validation
    try {
      // Get suggested parameters
      const suggestedParams = await algodClient.getTransactionParams().do();
      
      // Create a note with document information
      const noteString = JSON.stringify({ 
        type: 'document_certification',
        hash: documentHash,
        name: documentName,
        timestamp: new Date().toISOString(),
      });
      
      const note = new TextEncoder().encode(noteString);
      
      // Create transaction
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: senderAddress,
        to: senderAddress, // Self-transaction
        amount: 0,
        note,
        suggestedParams,
      });
      
      // Sign transaction with Pera Wallet
      const signedTxn = await wallet.signTransaction([[{ txn, signers: [senderAddress] }]]);
      
      // Submit transaction
      const response = await algodClient.sendRawTransaction(signedTxn).do();
      
      // Wait for confirmation
      await algosdk.waitForConfirmation(algodClient, response.txId, 4);
      
      return response.txId;
    } catch (error) {
      console.error('Error certifying document:', error);
      throw error;
    }
  };

  const verifyDocument = async (txId: string): Promise<{ verified: boolean; data: any }> => {
    if (!algodClient) {
      throw new Error('Algorand client not initialized');
    }

    try {
      // Get transaction information
      const txInfo = await algodClient.transactionInformation(txId).do();
      
      // Decode note
      const noteBuffer = Buffer.from(txInfo.note, 'base64');
      const noteString = new TextDecoder().decode(noteBuffer);
      const data = JSON.parse(noteString);
      
      // Verify it's a document certification
      if (data.type !== 'document_certification') {
        return { verified: false, data: null };
      }
      
      return { 
        verified: true, 
        data: {
          ...data,
          sender: txInfo.sender,
          confirmedRound: txInfo.confirmedRound,
          txId
        } 
      };
    } catch (error) {
      console.error('Error verifying document:', error);
      return { verified: false, data: null };
    }
  };

  const value = {
    connect,
    disconnect,
    connected,
    address,
    balance,
    algodClient,
    peraWallet: wallet,
    certifyDocument,
    verifyDocument,
  };

  return (
    <AlgorandContext.Provider value={value}>
      {children}
    </AlgorandContext.Provider>
  );
};

// Export the hook separately to maintain consistent exports
export function useAlgorand() {
  const context = useContext(AlgorandContext);
  if (context === undefined) {
    throw new Error('useAlgorand must be used within an AlgorandProvider');
  }
  return context;
}