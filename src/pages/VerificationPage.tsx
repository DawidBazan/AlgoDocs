import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, AlertCircle, ArrowLeft, FileText } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import DocumentDropzone from '../components/DocumentDropzone';
import { useAlgorand } from '../context/AlgorandContext';
import { generateDocumentHash, extractTransactionId, isValidAlgorandTxId } from '../utils/documentUtils';

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
  hashMatch?: boolean;
}

const VerificationPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [documentHash, setDocumentHash] = useState<string>('');
  const [extractedTxId, setExtractedTxId] = useState<string>('');
  const [manualTxId, setManualTxId] = useState<string>('');
  const [verifying, setVerifying] = useState<boolean>(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [searchParams] = useSearchParams();
  const { verifyDocument } = useAlgorand();

  const urlTxId = searchParams.get('txId');

  useEffect(() => {
    // If txId is provided in URL, verify the transaction
    if (urlTxId && isValidAlgorandTxId(urlTxId)) {
      setManualTxId(urlTxId);
      verifyTransaction(urlTxId);
    }
  }, [urlTxId]);

  const handleFileDrop = async (droppedFile: File) => {
    setFile(droppedFile);
    setResult(null);
    
    try {
      // Generate hash for the document
      const hash = await generateDocumentHash(droppedFile);
      setDocumentHash(hash);
      
      // Try to extract transaction ID from PDF
      const txId = await extractTransactionId(droppedFile);
      if (txId && isValidAlgorandTxId(txId)) {
        setExtractedTxId(txId);
        setManualTxId(txId);
        // Automatically verify if we found a transaction ID
        verifyTransaction(txId, hash);
      } else {
        setExtractedTxId('');
        console.log('No valid transaction ID found in document');
      }
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const verifyTransaction = async (transactionId: string, docHash?: string) => {
    if (!isValidAlgorandTxId(transactionId)) {
      setResult({
        verified: false,
        error: 'Invalid transaction ID format. Please check and try again.',
      });
      return;
    }

    setVerifying(true);
    
    try {
      const { verified, data } = await verifyDocument(transactionId);
      
      if (verified && data) {
        let hashMatch = true;
        const currentHash = docHash || documentHash;
        
        // If we have a document hash, compare it with the blockchain record
        if (currentHash && data.hash) {
          hashMatch = data.hash === currentHash;
        }
        
        setResult({
          verified: hashMatch,
          data,
          hashMatch,
          error: !hashMatch ? 'Document hash does not match the certified document. This document may have been modified.' : undefined,
        });
      } else {
        setResult({
          verified: false,
          error: 'Transaction not found or is not a valid document certification.',
        });
      }
    } catch (error) {
      console.error('Error verifying document:', error);
      setResult({
        verified: false,
        error: 'An error occurred during verification. Please check the transaction ID and try again.',
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleManualVerify = async () => {
    if (!manualTxId.trim()) {
      setResult({
        verified: false,
        error: 'Please enter a transaction ID.',
      });
      return;
    }
    
    await verifyTransaction(manualTxId.trim());
  };

  const handleVerifyWithDocument = async () => {
    if (!file || !documentHash) {
      setResult({
        verified: false,
        error: 'Please upload a document first.',
      });
      return;
    }
    
    const txId = extractedTxId || manualTxId;
    if (!txId) {
      setResult({
        verified: false,
        error: 'No transaction ID found. Please enter the transaction ID manually or upload a certified document.',
      });
      return;
    }
    
    await verifyTransaction(txId, documentHash);
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
            <div className="flex-1">
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
                    This document has been certified on the Algorand blockchain and is authentic.
                  </p>
                  
                  {result.hashMatch === false && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-yellow-800 text-sm font-medium">
                        ⚠️ Document content may have been modified after certification
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-4 p-4 bg-white rounded border border-green-100">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Original Document Name</p>
                        <p className="font-medium">{result.data.name}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Certified On</p>
                        <p className="font-medium">
                          {new Date(result.data.timestamp).toLocaleString()}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Document Hash</p>
                        <p className="font-medium font-mono text-sm break-all">
                          {result.data.hash}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Blockchain Details</p>
                        <p className="font-medium font-mono text-sm mb-1">
                          Transaction: {result.data.txId}
                        </p>
                        <p className="font-medium font-mono text-sm mb-1">
                          Certifier: {result.data.sender}
                        </p>
                        <p className="font-medium font-mono text-sm">
                          Block: {result.data.confirmedRound}
                        </p>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-100">
                        <a 
                          href={`https://algoexplorer.io/tx/${result.data.txId}`}
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
          Document Verification
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Verify the authenticity of blockchain-certified documents.
        </p>
      </div>

      {!result && (
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Document Upload Section */}
          <div className="bg-white shadow-card rounded-lg p-8">
            <h3 className="text-xl font-heading font-semibold mb-6 text-center">
              Upload Document to Verify
            </h3>
            
            <DocumentDropzone onFileDrop={handleFileDrop} />
            
            {file && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <FileText className="w-5 h-5 text-navy-700 mr-2" />
                  <span className="font-medium">{file.name}</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  {documentHash && (
                    <p>Hash: {documentHash.substring(0, 16)}...{documentHash.substring(documentHash.length - 16)}</p>
                  )}
                  {extractedTxId && (
                    <p className="text-green-600 font-medium">
                      ✓ Transaction ID found: {extractedTxId.substring(0, 8)}...{extractedTxId.substring(extractedTxId.length - 8)}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {file && (
              <div className="mt-6">
                <button
                  onClick={handleVerifyWithDocument}
                  disabled={verifying}
                  className="btn btn-primary w-full"
                >
                  {verifying ? 'Verifying...' : 'Verify Document'}
                </button>
              </div>
            )}
          </div>

          {/* Manual Transaction ID Section */}
          <div className="bg-white shadow-card rounded-lg p-8">
            <h3 className="text-xl font-heading font-semibold mb-6 text-center">
              Or Enter Transaction ID Manually
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="txId" className="block text-sm font-medium text-gray-700 mb-2">
                  Algorand Transaction ID
                </label>
                <input
                  type="text"
                  id="txId"
                  value={manualTxId}
                  onChange={(e) => setManualTxId(e.target.value)}
                  placeholder="Enter 52-character transaction ID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500 font-mono text-sm"
                />
              </div>
              
              <button
                onClick={handleManualVerify}
                disabled={verifying || !manualTxId.trim()}
                className="btn btn-secondary w-full"
              >
                {verifying ? 'Verifying...' : 'Verify Transaction'}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-blue-800 text-sm">
                <p className="font-medium mb-1">How to verify:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Upload a certified document - we'll automatically extract and verify the transaction ID</li>
                  <li>Enter a transaction ID manually if you have it</li>
                  <li>Scan the QR code on a certified document to get the verification URL</li>
                </ul>
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