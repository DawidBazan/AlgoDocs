import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import DocumentDropzone from '../components/DocumentDropzone';
import { useAlgorand } from '../context/AlgorandContext';
import { generateDocumentHash, extractTransactionId } from '../utils/documentUtils';

interface VerificationResult {
  verified: boolean;
  data?: {
    hash: string;
    name: string;
    timestamp: string;
    sender: string;
    txId: string;
    confirmedRound: number;
  } | null;
  error?: string;
}

const VerificationPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [documentHash, setDocumentHash] = useState<string>('');
  const [verifying, setVerifying] = useState<boolean>(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [searchParams] = useSearchParams();
  const { verifyDocument } = useAlgorand();

  const txId = searchParams.get('txId');

  useEffect(() => {
    // If txId is provided in URL, verify the transaction
    if (txId) {
      verifyTransaction(txId);
    }
  }, [txId]);

  const handleFileDrop = async (droppedFile: File) => {
    setFile(droppedFile);
    
    try {
      // Generate hash for the document
      const hash = await generateDocumentHash(droppedFile);
      
      // Try to extract transaction ID from PDF
      const extractedTxId = await extractTransactionId(droppedFile);
      if (extractedTxId) {
        verifyTransaction(extractedTxId);
      }
      
      setDocumentHash(hash);
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const verifyTransaction = async (transactionId: string) => {
    setVerifying(true);
    
    try {
      const { verified, data } = await verifyDocument(transactionId);
      
      if (verified && data) {
        setResult({
          verified: true,
          data,
        });
      } else {
        setResult({
          verified: false,
          error: 'Document certification not found or invalid.',
        });
      }
    } catch (error) {
      console.error('Error verifying document:', error);
      setResult({
        verified: false,
        error: 'An error occurred during verification.',
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleVerify = async () => {
    if (!file || !documentHash) return;
    
    setVerifying(true);
    
    try {
      // Try to extract transaction ID from the document
      const extractedTxId = await extractTransactionId(file);
      const transactionId = extractedTxId || txId;
      
      if (!transactionId) {
        throw new Error('Could not find certification details in the document');
      }

      const { verified, data } = await verifyDocument(transactionId);
      
      if (verified && data) {
        // Compare document hash with the hash stored on blockchain
        if (data.hash === documentHash) {
          setResult({
            verified: true,
            data,
          });
        } else {
          setResult({
            verified: false,
            data,
            error: 'Document hash does not match the certified document.',
          });
        }
      } else {
        setResult({
          verified: false,
          error: 'Document certification not found or invalid.',
        });
      }
    } catch (error) {
      console.error('Error verifying document:', error);
      setResult({
        verified: false,
        error: 'An error occurred during verification.',
      });
    } finally {
      setVerifying(false);
    }
  };

  const renderVerificationResult = () => {
    if (!result) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <div className={`p-6 rounded-lg ${
          result.verified 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start">
            <div className="mr-4">
              {result.verified ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <XCircle className="w-8 h-8 text-red-500" />
              )}
            </div>
            <div>
              <h3 className={`text-lg font-heading font-semibold mb-2 ${
                result.verified ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.verified 
                  ? 'Document Successfully Verified!' 
                  : 'Verification Failed'
                }
              </h3>
              
              {result.verified && result.data ? (
                <div className="space-y-2">
                  <p className="text-green-700">
                    This document has been certified on the Algorand blockchain.
                  </p>
                  
                  <div className="mt-4 p-4 bg-white rounded border border-green-100">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Certified On</p>
                        <p className="font-medium">
                          {new Date(result.data.timestamp).toLocaleString()}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Blockchain Details</p>
                        <p className="font-medium font-mono text-sm mb-1">
                          Transaction: {result.data.txId}
                        </p>
                        <p className="font-medium font-mono text-sm mb-1">
                          Certifier Address: {result.data.sender}
                        </p>
                        <p className="font-medium font-mono text-sm">
                          Block: {result.data.confirmedRound}
                        </p>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-100">
                        <a 
                          href={`https://testnet.algoexplorer.io/tx/${result.data.txId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                        >
                          View on Algorand Explorer →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-red-700">
                  {result.error || 'The document could not be verified.'}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Link to="/" className="btn btn-outline">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Check Document Status
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Verify the authenticity of an AuthStamp protected document.
        </p>
      </div>

      {!result && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-card rounded-lg p-8">
            <h3 className="text-xl font-heading font-semibold mb-6 text-center">
              Upload Document to Verify
            </h3>
            
            <DocumentDropzone onFileDrop={handleFileDrop} />
            
            <div className="mt-8">
              <button
                onClick={handleVerify}
                disabled={!file || verifying}
                className="btn btn-primary w-full"
              >
                {verifying ? 'Verifying...' : 'Verify Document'}
              </button>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-blue-800 text-sm">
                    Upload the document to verify its authenticity. If it contains an AuthStamp QR code, we'll automatically validate it against the blockchain record.
                    You can also enter the verification ID manually.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {renderVerificationResult()}
    </div>
  );
};

export default VerificationPage;