import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Stamp } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/algodocs-logo.png"
                alt="AlgoDocs"
                className="w-6 h-6 object-contain"
              />
              <span className="text-lg font-heading font-semibold text-navy-900">
                AlgoDocs
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Advanced document verification powered by Algorand blockchain technology.
              Create immutable proof of document authenticity with blockchain security.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-navy-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-navy-700 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-navy-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-navy-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/certify" className="text-gray-600 hover:text-navy-700 transition-colors">
                  Stamp Document
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-gray-600 hover:text-navy-700 transition-colors">
                  Verify Document
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-navy-900 mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-navy-700 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-navy-700 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-navy-700 transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-navy-700 transition-colors">
                  Algorand Blockchain
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} AlgoDocs. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-500 hover:text-navy-700 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-navy-700 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="https://bolt.new" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-navy-700 text-sm transition-colors">
              <img 
                src="/black_circle_360x360.png" 
                alt="Bolt" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain transition-transform hover:scale-110" 
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;