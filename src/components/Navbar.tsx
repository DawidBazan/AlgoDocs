import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Stamp } from 'lucide-react';
import { useAlgorand } from '../context/AlgorandContext';
import ConnectWalletButton from './ConnectWalletButton';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { connected, address } = useAlgorand();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Stamp', path: '/certify' },
    { name: 'Verify', path: '/verify' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-navy-700 text-white flex items-center justify-center rounded-full">
              <Stamp size={20} />
            </div>
            <span className="text-xl font-heading font-semibold text-navy-900">
              AuthStamp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-navy-700'
                      : 'text-gray-600 hover:text-navy-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <ConnectWalletButton />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium px-2 py-2 rounded transition-colors ${
                    location.pathname === link.path
                      ? 'text-navy-700 bg-navy-50'
                      : 'text-gray-600 hover:text-navy-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <ConnectWalletButton fullWidth />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;