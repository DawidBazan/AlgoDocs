import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import { MetaMaskSDK } from '@metamask/sdk';

interface WalletContextType {
  connectPera: () => Promise<void>;
  connectMetaMask: () => Promise<void>;
  disconnect: () => void;
  connected: boolean;
  address: string | null;
  walletType: 'pera' | 'metamask' | null;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<'pera' | 'metamask' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [peraWallet] = useState(() => new PeraWalletConnect());
  const [metamask] = useState(() => new MetaMaskSDK());

  useEffect(() => {
    // Check if user was previously connected
    const savedAddress = localStorage.getItem('chainStampAddress');
    const savedWalletType = localStorage.getItem('chainStampWalletType') as 'pera' | 'metamask' | null;
    
    if (savedAddress && savedWalletType) {
      setAddress(savedAddress);
      setWalletType(savedWalletType);
      setConnected(true);
    }

    // Cleanup Pera wallet connection
    return () => {
      peraWallet.disconnect();
    };
  }, []);

  const connectPera = async () => {
    try {
      const accounts = await peraWallet.connect();
      
      if (accounts && accounts.length > 0) {
        const newAddress = accounts[0];
        setAddress(newAddress);
        setWalletType('pera');
        setConnected(true);
        localStorage.setItem('chainStampAddress', newAddress);
        localStorage.setItem('chainStampWalletType', 'pera');
      }
    } catch (error) {
      console.error('Error connecting to Pera wallet:', error);
      throw error;
    } finally {
      setShowModal(false);
    }
  };

  const connectMetaMask = async () => {
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
        setWalletType('metamask');
        setConnected(true);
        localStorage.setItem('chainStampAddress', newAddress);
        localStorage.setItem('chainStampWalletType', 'metamask');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw error;
    } finally {
      setShowModal(false);
    }
  };

  const disconnect = () => {
    if (walletType === 'pera') {
      peraWallet.disconnect();
    }
    setAddress(null);
    setWalletType(null);
    setConnected(false);
    localStorage.removeItem('chainStampAddress');
    localStorage.removeItem('chainStampWalletType');
  };

  return (
    <WalletContext.Provider 
      value={{
        connectPera,
        connectMetaMask,
        disconnect,
        connected,
        address,
        walletType,
        showModal,
        setShowModal
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