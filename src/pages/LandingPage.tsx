import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileCheck, Shield, Clock, CheckCircle, Upload, Search, PenSquare } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-800 to-navy-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
                Secure digital signature on Algorand blockchain
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Sign and verify your documents with blockchain technology.
                Instant verification, tamper-proof digital signatures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/certify"
                  className="btn bg-teal-500 hover:bg-teal-600 text-white font-medium"
                >
                  <Upload size={20} />
                  Sign Document
                </Link>
                <Link
                  to="/verify"
                  className="btn bg-white hover:bg-gray-100 text-navy-900 font-medium"
                >
                  <Search size={20} />
                  Verify Document
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-2/5"
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-teal-500 rounded-lg"></div>
                <div className="relative bg-white rounded-lg shadow-lg p-6">
                  <img
                    src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Document with stamp"
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              How AlgoSign Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Secure your documents in just a few simple steps with our blockchain-powered certification system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Upload className="w-12 h-12 text-teal-500" />,
                title: 'Upload Your Document',
                description:
                  'Drag and drop your document into our secure upload zone. We support PDFs, Word documents, Excel spreadsheets, and more.',
              },
              {
                icon: <FileCheck className="w-12 h-12 text-teal-500" />,
                title: 'Generate Certification',
                description:
                  'We create a unique cryptographic hash of your document and store it on the Algorand blockchain with a timestamp and your information.',
              },
              {
                icon: <CheckCircle className="w-12 h-12 text-teal-500" />,
                title: 'Download & Share',
                description:
                  'Download your certified document with an embedded QR code that anyone can scan to verify its authenticity instantly.',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-card p-8 text-center"
              >
                <div className="flex justify-center mb-6">{step.icon}</div>
                <h3 className="text-xl font-heading font-semibold mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Choose AlgoSign
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our blockchain solution provides unparalleled security and transparency for your important documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-10 h-10 text-navy-700" />,
                title: 'Tamper-Proof Security',
                description:
                  'Once certified on the blockchain, your document\'s fingerprint cannot be altered or tampered with.',
              },
              {
                icon: <Clock className="w-10 h-10 text-navy-700" />,
                title: 'Timestamped Proof',
                description:
                  'Each certification includes a precise timestamp, providing undeniable proof of when the document existed.',
              },
              {
                icon: <Search className="w-10 h-10 text-navy-700" />,
                title: 'Instant Verification',
                description:
                  'Anyone can verify the authenticity of your document in seconds, without needing special software.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col h-full bg-white rounded-lg shadow-sm p-8"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-navy-50 p-3 rounded-lg mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-heading font-semibold">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 flex-grow">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navy-800 to-navy-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to secure your documents?
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Join thousands of individuals and businesses who trust ChainStamp for their document certification needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/certify"
              className="btn bg-teal-500 hover:bg-teal-600 text-white font-medium"
            >
              <Upload size={20} />
              Start Certifying Now
            </Link>
            <Link
              to="/verify"
              className="btn bg-white hover:bg-gray-100 text-navy-900 font-medium"
            >
              <Search size={20} />
              Verify a Document
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;