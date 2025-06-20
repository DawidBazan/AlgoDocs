import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertTriangle, Scale, Users } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-navy-700 hover:text-navy-800 mb-6">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-heading font-bold text-navy-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">Important Legal Agreement</h3>
                <p className="text-red-800">
                  These Terms of Service constitute a legally binding agreement between you and AlgoDocs. 
                  By using our service, you agree to be bound by these terms. Please read them carefully.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-2" />
              Acceptance of Terms
            </h2>
            
            <p className="mb-4">
              By accessing or using AlgoDocs ("the Service"), you agree to be bound by these Terms of Service 
              ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>

            <p className="mb-4">
              These Terms apply to all visitors, users, and others who access or use the Service, including 
              but not limited to users who contribute content, information, and other materials or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Description of Service</h2>
            
            <p className="mb-4">
              AlgoDocs provides blockchain-based document verification services using the Algorand network. 
              Our Service allows users to:
            </p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Create cryptographic proofs of document authenticity</li>
              <li>Record immutable certification data on the Algorand blockchain</li>
              <li>Verify the authenticity of previously certified documents</li>
              <li>Generate tamper-evident certificates with QR codes</li>
              <li>Access blockchain transaction records for verification</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800">
                <strong>No Data Storage:</strong> AlgoDocs processes documents temporarily to create blockchain 
                certifications. We do not store any user data, document content, or personal information. 
                Only certification records are permanently stored on the Algorand blockchain.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2" />
              User Requirements and Responsibilities
            </h2>
            
            <h3 className="text-xl font-semibold text-navy-800 mb-3">Service Requirements</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You must have a compatible Algorand wallet (e.g., Pera Wallet)</li>
              <li>You must have sufficient ALGO for blockchain transaction fees</li>
              <li>You are responsible for maintaining the security of your wallet</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-800 mb-3">User Responsibilities</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Ensure you have the right to certify documents you upload</li>
              <li>Maintain the confidentiality of your wallet credentials</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Pay all applicable fees and transaction costs</li>
            </ul>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800">
                <strong>No Account Required:</strong> AlgoDocs does not require user accounts or registration. 
                You interact directly with the service using your Algorand wallet.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Acceptable Use Policy</h2>
            
            <p className="mb-4">You agree not to use the Service to:</p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Upload or certify documents you do not own or have permission to use</li>
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Transmit malicious code, viruses, or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use the Service for fraudulent or deceptive purposes</li>
              <li>Impersonate any person or entity</li>
              <li>Collect or harvest personal information from other users</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800">
                <strong>Violation Notice:</strong> Violation of these terms may result in immediate termination 
                of your access to the Service and potential legal action.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Fees and Payments</h2>
            
            <h3 className="text-xl font-semibold text-navy-800 mb-3">Blockchain Transaction Fees</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>All blockchain transactions require payment of network fees in ALGO</li>
              <li>Fees are determined by the Algorand network and may vary</li>
              <li>You are responsible for ensuring sufficient ALGO balance</li>
              <li>Transaction fees are non-refundable once processed</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-800 mb-3">Service Fees</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Current service fees are displayed before transaction confirmation</li>
              <li>We reserve the right to modify fees with 30 days notice</li>
              <li>Premium features may require additional subscription fees</li>
              <li>All fees are quoted in ALGO or USD as applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Intellectual Property Rights</h2>
            
            <h3 className="text-xl font-semibold text-navy-800 mb-3">Your Content</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You retain all rights to documents you upload and certify</li>
              <li>You grant us limited rights to temporarily process and hash your documents</li>
              <li>You represent that you own or have permission to certify uploaded content</li>
              <li>You are responsible for any intellectual property violations</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-800 mb-3">Our Service</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>AlgoDocs and related trademarks are our property</li>
              <li>Our software, algorithms, and processes are protected by intellectual property laws</li>
              <li>You may not copy, modify, or reverse engineer our Service</li>
            </ul>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800">
                <strong>Document Processing:</strong> We only process your documents temporarily to generate 
                cryptographic hashes. Documents are never stored, copied, or retained after processing.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4 flex items-center">
              <Scale className="w-6 h-6 mr-2" />
              Disclaimers and Limitations
            </h2>
            
            <h3 className="text-xl font-semibold text-navy-800 mb-3">Service Disclaimers</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-gray-800 mb-2">
                <strong>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>Blockchain networks may experience delays or failures</li>
                <li>We are not responsible for wallet software or third-party services</li>
                <li>Document verification depends on blockchain network availability</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-navy-800 mb-3">Limitation of Liability</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-gray-800 mb-2">
                <strong>OUR LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our total liability shall not exceed the fees paid by you in the last 12 months</li>
                <li>We are not responsible for blockchain network issues or wallet problems</li>
                <li>You assume all risks associated with blockchain technology</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Privacy and Data Protection</h2>
            
            <p className="mb-4">
              Your privacy is important to us. Our document processing practices are governed by our 
              <Link to="/privacy-policy" className="text-navy-700 hover:text-navy-800 underline">Privacy Policy</Link>, 
              which is incorporated into these Terms by reference.
            </p>

            <p className="mb-4">Key privacy points:</p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>We do not store the actual content of your documents</li>
              <li>We do not store any user data or personal information</li>
              <li>Only cryptographic hashes are generated and sent to the blockchain</li>
              <li>Blockchain records are public and immutable</li>
              <li>All document processing is temporary and secure</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Termination</h2>
            
            <h3 className="text-xl font-semibold text-navy-800 mb-3">Termination by You</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You may stop using the Service at any time</li>
              <li>Disconnect your wallet to terminate access</li>
              <li>Previously certified documents remain on the blockchain</li>
              <li>No data cleanup required since no data is stored</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-800 mb-3">Termination by Us</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>We may terminate access for Terms violations</li>
              <li>We may suspend service for maintenance or security reasons</li>
              <li>Notice will be provided for planned service interruptions</li>
              <li>Blockchain records remain accessible regardless of termination</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Governing Law and Disputes</h2>
            
            <p className="mb-4">
              These Terms are governed by the laws of [Jurisdiction] without regard to conflict of law principles. 
              Any disputes arising from these Terms or the Service shall be resolved through:
            </p>
            
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li><strong>Informal Resolution:</strong> Good faith negotiations for 30 days</li>
              <li><strong>Binding Arbitration:</strong> Individual arbitration under [Arbitration Rules]</li>
              <li><strong>Class Action Waiver:</strong> No class actions or representative proceedings</li>
              <li><strong>Jurisdiction:</strong> Courts of [Jurisdiction] for non-arbitrable matters</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Changes to Terms</h2>
            
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective when posted on our website. 
              We will notify users of material changes through:
            </p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Email notifications to registered users</li>
              <li>Prominent notices on our platform</li>
              <li>Updates to the "Last updated" date</li>
              <li>In-app notifications for significant changes</li>
            </ul>

            <p className="mb-4">
              Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Contact Information</h2>
            
            <p className="mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="mb-2"><strong>Email:</strong> legal@algodocs.com</p>
              <p className="mb-2"><strong>Address:</strong> AlgoDocs Legal Department</p>
              <p className="mb-2">123 Blockchain Avenue</p>
              <p>Digital City, DC 12345</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Severability</h2>
            
            <p className="mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be 
              limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain 
              in full force and effect and enforceable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Entire Agreement</h2>
            
            <p className="mb-4">
              These Terms, together with our Privacy Policy and any other legal notices published by us on the Service, 
              constitute the entire agreement between you and AlgoDocs concerning the Service and supersede all prior 
              or contemporaneous communications and proposals.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;