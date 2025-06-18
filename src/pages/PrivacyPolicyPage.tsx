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
            
            <h3 className="text-xl font-semibold text-navy-800 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Wallet addresses when you connect your Algorand wallet</li>
              <li>Transaction data related to document certifications</li>
              <li>IP addresses and browser information for security purposes</li>
              <li>Usage analytics to improve our service</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-800 mb-3">Document Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Document hashes (cryptographic fingerprints) for verification</li>
              <li>Document metadata (file names, sizes, types)</li>
              <li>Certification timestamps and blockchain transaction IDs</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800">
                <strong>Important:</strong> We never store the actual content of your documents. Only cryptographic hashes 
                and metadata are processed and stored for verification purposes.
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
              <li>To maintain service security and prevent fraud</li>
              <li>To improve our platform and user experience</li>
              <li>To comply with legal obligations and regulatory requirements</li>
              <li>To communicate important service updates and security notices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2" />
              Data Protection & Security
            </h2>
            
            <h3 className="text-xl font-semibold text-navy-800 mb-3">Security Measures</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>End-to-end encryption for all data transmission</li>
              <li>Secure cloud infrastructure with industry-standard protections</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Blockchain immutability for certified document records</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-800 mb-3">Data Retention</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Document hashes and certification data are stored permanently on the Algorand blockchain</li>
              <li>Personal information is retained only as long as necessary for service provision</li>
              <li>You may request deletion of personal data not required for blockchain operations</li>
              <li>Blockchain records cannot be deleted due to the immutable nature of distributed ledgers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Information Sharing</h2>
            
            <p className="mb-4">We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:</p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Blockchain Networks:</strong> Transaction data is publicly recorded on the Algorand blockchain</li>
              <li><strong>Service Providers:</strong> Trusted partners who assist in operating our platform</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              <li><strong>Consent:</strong> When you explicitly authorize information sharing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Your Rights</h2>
            
            <p className="mb-4">Depending on your jurisdiction, you may have the following rights:</p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Access:</strong> Request information about data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
              <li><strong>Deletion:</strong> Request deletion of personal data (subject to blockchain limitations)</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Objection:</strong> Object to certain types of data processing</li>
              <li><strong>Withdrawal:</strong> Withdraw consent for data processing where applicable</li>
            </ul>

            <p className="mb-4">
              To exercise these rights, please contact us at privacy@algodocs.com. We will respond to your request 
              within 30 days and may require identity verification.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Cookies and Tracking</h2>
            
            <p className="mb-4">We use cookies and similar technologies to:</p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Maintain your session and preferences</li>
              <li>Analyze website usage and performance</li>
              <li>Provide personalized experiences</li>
              <li>Ensure security and prevent fraud</li>
            </ul>

            <p className="mb-4">
              You can control cookie settings through your browser preferences. However, disabling certain cookies 
              may affect the functionality of our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">International Data Transfers</h2>
            
            <p className="mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure 
              appropriate safeguards are in place to protect your data during international transfers, including:
            </p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Adequacy decisions by relevant data protection authorities</li>
              <li>Standard contractual clauses approved by regulatory bodies</li>
              <li>Certification schemes and codes of conduct</li>
              <li>Binding corporate rules for intra-group transfers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-navy-900 mb-4">Children's Privacy</h2>
            
            <p className="mb-4">
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected information from a child under 13, 
              please contact us immediately so we can delete such information.
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