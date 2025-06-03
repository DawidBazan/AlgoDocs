import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MetaMaskSDK } from '@metamask/sdk';

interface WalletContextType {
  connect: () => Promise<void>;
  disconnect: () => void;
  connected: boolean;
  address: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [metamask] = useState(() => new MetaMaskSDK());

  useEffect(() => {
    // Check if user was previously connected
    const savedAddress = localStorage.getItem('chainStampAddress');
    if (savedAddress) {
      setAddress(savedAddress);
      setConnected(true);
    }
  }, []);

  const connect = async () => {
    try {
      const ethereum = metamask.getProvider();
      
      if (!ethereum) {
        throw new Error('MetaMask not installed');
      }

      const accounts = await ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts && accounts.length > 0) {
        const newAddress = accounts[0];
        setAddress(newAddress);
        setConnected(true);
        localStorage.setItem('chainStampAddress', newAddress);
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw error;
    }
  };

  const disconnect = () => {
    setAddress(null);
    setConnected(false);
    localStorage.removeItem('chainStampAddress');
  };

  return (
    <WalletContext.Provider 
      value={{
        connect,
        disconnect,
        connected,
        address
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};