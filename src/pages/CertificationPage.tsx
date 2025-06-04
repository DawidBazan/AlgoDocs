import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Check, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DocumentDropzone from '../components/DocumentDropzone';
import QRCode from 'qrcode.react';
import ConnectWalletButton from '../components/ConnectWalletButton';
import { useAlgorand } from '../context/AlgorandContext';
import { generateDocumentHash, addWatermark } from '../utils/documentUtils';

enum CertificationStep {
  Upload,
  Process,
  Complete,
}

const CertificationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CertificationStep>(CertificationStep.Upload);
  const [file, setFile] = useState<File | null>(null);
  const [documentHash, setDocumentHash] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [certificateUrl, setCertificateUrl] = useState<string>('');
  const [certificateId, setCertificateId] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [watermarkedFile, setWatermarkedFile] = useState<Blob | null>(null);
  const { connected, connect, certifyDocument } = useAlgorand();

  const handleFileDrop = async (droppedFile: File) => {
    setFile(droppedFile);
    
    try {
      setProcessing(true);
      // Generate hash for the document
      const hash = await generateDocumentHash(droppedFile);
      setDocumentHash(hash);
      
      // Move to next step
      setCurrentStep(CertificationStep.Process);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleCertify = async () => {
    if (!file || !documentHash || !connected) return;
    
    try {
      setProcessing(true);
      
      // Certify document on blockchain
      const txId = await certifyDocument(documentHash, file.name);
      setTransactionId(txId);
      
      // Generate a unique certificate ID
      const certId = txId.substring(0, 8);
      setCertificateId(certId);
      
      // Create verification URL
      const verificationUrl = `${window.location.origin}/verify?txId=${txId}`;
      setCertificateUrl(verificationUrl);
      
      // Add watermark and QR code to document if it's a PDF
      if (file.type === 'application/pdf') {
        const watermarkedPdf = await addWatermark(
          file,
          certId,
          verificationUrl
        );
        setWatermarkedFile(watermarkedPdf);
      }
      
      // Move to complete step
      setCurrentStep(CertificationStep.Complete);
    } catch (error) {
      console.error('Error certifying document:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!watermarkedFile && !file) return;
    
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(watermarkedFile || file!);
    
    downloadLink.href = url;
    downloadLink.download = `certified_${file!.name}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case CertificationStep.Upload:
        return (
          <div className="max-w-2xl mx-auto">
            <DocumentDropzone onFileDrop={handleFileDrop} />
            {!connected && (
              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium mb-2">
                  Wallet not connected
                </p>
                <p className="text-yellow-700 text-sm mb-4">
                  You need to connect your Algorand wallet to certify documents.
                </p>
                <ConnectWalletButton fullWidth />
              </div>
            )}
          </div>
        );
      
      case CertificationStep.Process:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-card rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <FileCheck className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-navy-900">
                    Ready to Certify
                  </h3>
                  <p className="text-gray-600">
                    Document prepared for blockchain certification
                  </p>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">File Name:</span>
                  <span className="text-sm font-medium text-navy-900">{file?.name}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">File Size:</span>
                  <span className="text-sm font-medium text-navy-900">
                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ''}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Document Hash:</span>
                  <span className="text-sm font-medium text-navy-900 font-mono">
                    {documentHash.substring(0, 12)}...{documentHash.substring(documentHash.length - 12)}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                By proceeding, this document will be certified on the Algorand blockchain with a permanent timestamp and unique identifier. This process cannot be reversed.
              </p>
              
              <button
                onClick={handleCertify}
                disabled={processing}
                className="btn btn-primary w-full"
              >
                {processing ? 'Processing...' : 'Certify Document'}
              </button>
              
              <button className="mt-4 w-full" style={{ display: connected ? 'none' : 'block' }}>
                <ConnectWalletButton fullWidth />
              </button>
            </div>
          </div>
        );
      
      case CertificationStep.Complete:
        return (
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-card rounded-lg p-8 text-center"
            >
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-teal-600" />
              </div>
              
              <h3 className="text-2xl font-heading font-semibold text-navy-900 mb-2">
                Document Successfully Certified!
              </h3>
              <p className="text-gray-600 mb-8">
                Your document has been permanently certified on the Algorand blockchain.
              </p>
              
              <div className="mb-8 flex justify-center">
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  <QRCode value={certificateUrl} size={180} />
                </div>
              </div>
              
              <div className="mb-8 p-4 bg-gray-50 rounded-lg text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Certificate ID:</span>
                  <span className="text-sm font-medium text-navy-900">{certificateId}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Transaction ID:</span>
                  <span className="text-sm font-medium text-navy-900 font-mono">
                    {transactionId.substring(0, 8)}...{transactionId.substring(transactionId.length - 8)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Timestamp:</span>
                  <span className="text-sm font-medium text-navy-900">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownload}
                  className="btn btn-primary"
                >
                  <Download size={20} />
                  Download Certified Document
                </button>
                <Link to="/verify" className="btn btn-outline">
                  <ArrowRight size={20} />
                  Verify Document
                </Link>
              </div>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Document Stamping
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create an immutable blockchain record of your document's authenticity.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-md mx-auto mb-12">
        <div className="flex justify-between">
          {[
            { step: CertificationStep.Upload, label: 'Upload' },
            { step: CertificationStep.Process, label: 'Stamp' },
            { step: CertificationStep.Complete, label: 'Secure' },
          ].map((item, index) => (
            <div
              key={index}
              className={`progress-step ${
                currentStep === item.step
                  ? 'progress-step-active'
                  : currentStep > item.step
                  ? 'progress-step-completed'
                  : 'progress-step-pending'
              }`}
            >
              <div className="progress-step-number">
                {currentStep > item.step ? (
                  <Check size={16} />
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-sm font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <div
            className={`h-1 w-1/3 ${
              currentStep > CertificationStep.Upload
                ? 'bg-teal-500'
                : 'bg-gray-200'
            }`}
          ></div>
          <div
            className={`h-1 w-1/3 ${
              currentStep > CertificationStep.Process
                ? 'bg-teal-500'
                : 'bg-gray-200'
            }`}
          ></div>
        </div>
      </div>

      {renderStepContent()}
    </div>
  );
};

export default CertificationPage;