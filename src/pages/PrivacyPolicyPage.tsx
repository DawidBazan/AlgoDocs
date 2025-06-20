import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
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
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-navy-50 border border-navy-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-navy-700 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Your Privacy Matters</h3>
                <p className="text-navy-800">
                  AlgoDocs is committed to protecting your privacy and ensuring the security of your personal information. 
                  This policy explains how we collect, use, and protect your data when you use our blockchain document verification service.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold text-navy-800 mb-3">Wallet Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Wallet addresses when you connect your Algorand wallet</li>
              <li>Transaction data related to document certifications</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-800 mb-3">Document Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Document hashes (cryptographic fingerprints) for verification</li>
              <li>Document metadata (file names, sizes, types)</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800">
                <strong>Important:</strong> We never store the actual content of your documents or any personal data. 
                Document hashes and metadata are only processed temporarily for verification and are not stored on our servers.
                All certification data is stored permanently on the Algorand blockchain, not on our systems.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4 flex items-center">
              <Database className="w-6 h-6 mr-2" />
              How We Use Your Information
            </h2>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To provide document certification and verification services</li>
              <li>To process blockchain transactions on your behalf</li>
              <li>To generate cryptographic hashes for blockchain certification</li>
            </ul>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800">
                <strong>No Data Storage:</strong> AlgoDocs operates as a processing service only. We do not store, 
                retain, or maintain any user data, document content, or personal information on our servers.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2" />
              Data Protection & Security
            </h2>
            
            <h3 className="text-xl font-semibold text-navy-800 mb-3">Security Measures</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>End-to-end encryption for all data transmission</li>
              <li>Temporary processing in secure, isolated environments</li>
              <li>Blockchain immutability for certified document records</li>
              <li>No persistent data storage on our servers</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-800 mb-3">Data Retention</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>No data is retained on our servers - all processing is temporary</li>
              <li>Document hashes and certification data are stored permanently on the Algorand blockchain only</li>
              <li>Blockchain records cannot be deleted due to the immutable nature of distributed ledgers</li>
              <li>We do not maintain logs, backups, or copies of any processed information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Information Sharing</h2>
            
            <p className="mb-4">We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:</p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Blockchain Networks:</strong> Transaction data is publicly recorded on the Algorand blockchain</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process (though we have no data to share)</li>
            </ul>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800">
                <strong>Note:</strong> Since we don't store any personal information, there is effectively nothing 
                to share with third parties beyond what is already publicly available on the blockchain.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Your Rights</h2>
            
            <p className="mb-4">Depending on your jurisdiction, you may have the following rights:</p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Access:</strong> Request information about data processing (we can confirm no data is stored)</li>
              <li><strong>Transparency:</strong> Understand how your documents are processed</li>
              <li><strong>Blockchain Rights:</strong> Access your certification records on the public Algorand blockchain</li>
            </ul>

            <p className="mb-4">
              Since we don't store any personal data, most traditional data rights don't apply. However, you can 
              contact us at privacy@algodocs.com for any questions about our processing methods.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Cookies and Tracking</h2>
            
            <p className="mb-4">We use cookies and similar technologies to:</p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Ensure security and prevent fraud</li>
              <li>Maintain basic website functionality</li>
            </ul>

            <p className="mb-4">
              We use minimal cookies necessary for basic website operation. No tracking or analytics cookies are used.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">International Data Transfers</h2>
            
            <p className="mb-4">
              Since we don't store any personal data, international data transfer regulations don't apply to our service. 
              Document processing happens temporarily and locally within our secure infrastructure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Children's Privacy</h2>
            
            <p className="mb-4">
              Our service is not intended for children under 13 years of age. Since we don't collect or store any 
              personal information, this policy applies to all users regardless of age.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Changes to This Policy</h2>
            
            <p className="mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, 
              legal requirements, or other factors. We will notify you of material changes by:
            </p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Posting the updated policy on our website</li>
              <li>Updating the "Last updated" date at the top of this policy</li>
              <li>Sending email notifications for significant changes</li>
              <li>Displaying prominent notices on our platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Contact Information</h2>
            
            <p className="mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please contact us:
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="mb-2"><strong>Email:</strong> privacy@algodocs.com</p>
              <p className="mb-2"><strong>Address:</strong> AlgoDocs Privacy Team</p>
              <p className="mb-2">123 Blockchain Avenue</p>
              <p>Digital City, DC 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;