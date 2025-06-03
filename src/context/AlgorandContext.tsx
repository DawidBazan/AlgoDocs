import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import algosdk from 'algosdk';
import MyAlgoConnect from '@randlabs/myalgo-connect';

interface AlgorandContextType {
  connect: () => Promise<void>;
  disconnect: () => void;
  connected: boolean;
  address: string | null;
  algodClient: algosdk.Algodv2 | null;
  myAlgoWallet: MyAlgoConnect | null;
  certifyDocument: (documentHash: string, documentName: string) => Promise<string>;
  verifyDocument: (txId: string) => Promise<{ verified: boolean; data: any }>;
}

const AlgorandContext = createContext<AlgorandContextType | undefined>(undefined);

// Using Algorand TestNet for development
const algodServer = 'https://testnet-api.algonode.cloud';
const algodPort = '';
const algodToken = '';

export const AlgorandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [algodClient, setAlgodClient] = useState<algosdk.Algodv2 | null>(null);
  const [myAlgoWallet, setMyAlgoWallet] = useState<MyAlgoConnect | null>(null);

  useEffect(() => {
    // Initialize Algorand client
    const client = new algosdk.Algodv2(algodToken, algodServer, algodPort);
    setAlgodClient(client);

    // Initialize MyAlgo wallet
    const wallet = new MyAlgoConnect();
    setMyAlgoWallet(wallet);

    // Check if user was previously connected
    const savedAddress = localStorage.getItem('chainStampAddress');
    if (savedAddress) {
      setAddress(savedAddress);
      setConnected(true);
    }
  }, []);

  const connect = async () => {
    if (!myAlgoWallet) return;

    try {
      // Check if running in a secure context (HTTPS or localhost)
      if (!window.isSecureContext) {
        throw new Error('MyAlgo wallet requires a secure context (HTTPS or localhost)');
      }

      const accounts = await myAlgoWallet.connect();
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts selected');
      }

      const address = accounts[0].address;
      console.log('Successfully connected to wallet:', address);

      setAddress(address);
      setConnected(true);
      localStorage.setItem('chainStampAddress', address);
    } catch (error) {
      let errorMessage: string;
      
      // Check specifically for blocked pop-up errors
      if (error === undefined || (typeof error === 'string' && error.includes('blocked'))) {
        errorMessage = 'Wallet connection failed: A pop-up window was blocked. Please allow pop-ups for this site and try again.';
      } else {
        errorMessage = error instanceof Error 
          ? error.message 
          : 'Unknown error occurred while connecting to wallet. Please try again.';
      }
      
      console.error('Wallet connection error:', errorMessage);
      throw new Error(`Failed to connect wallet: ${errorMessage}`);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setConnected(false);
    localStorage.removeItem('chainStampAddress');
  };

  const certifyDocument = async (documentHash: string, documentName: string): Promise<string> => {
    if (!algodClient || !address) {
      throw new Error('Wallet not connected');
    }

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
        from: address,
        to: address, // Self-transaction
        amount: 0,
        note,
        suggestedParams,
      });
      
      // Sign transaction
      const signedTxn = await myAlgoWallet!.signTransaction(txn.toByte());
      
      // Submit transaction
      const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
      
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
      const txInfo = await algodClient.pendingTransactionInformation(txId).do();
      
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
    algodClient,
    myAlgoWallet,
    certifyDocument,
    verifyDocument,
  };

  return (
    <AlgorandContext.Provider value={value}>
      {children}
    </AlgorandContext.Provider>
  );
};

export const useAlgorand = (): AlgorandContextType => {
  const context = useContext(AlgorandContext);
  if (context === undefined) {
    throw new Error('useAlgorand must be used within an AlgorandProvider');
  }
  return context;
};