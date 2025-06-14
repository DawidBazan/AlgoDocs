# AlgoDocs - Blockchain Document Verification

AlgoDocs is a secure document verification platform powered by the Algorand blockchain. It enables users to create immutable proof of document authenticity using blockchain technology.

![AlgoDocs Logo](/algodocs-logo.png)

## Features

- **Document Certification**: Create tamper-proof records of documents on the Algorand blockchain
- **Instant Verification**: Verify document authenticity instantly using QR codes or transaction IDs
- **Blockchain Security**: Leverage Algorand's secure and efficient blockchain infrastructure
- **PDF Support**: Automatic watermarking and QR code embedding for certified PDFs
- **Wallet Integration**: Seamless connection with Pera Wallet for blockchain transactions

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Framer Motion for animations
- PDF manipulation with pdf-lib
- Algorand SDK for blockchain interactions
- QR code generation and scanning

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Certifying a Document

1. Navigate to the "Stamp" page
2. Upload your document (PDF, DOC, DOCX, XLS, XLSX supported)
3. Connect your Algorand wallet
4. Confirm the transaction to create the blockchain record
5. Download your certified document with embedded verification QR code

### Verifying a Document

1. Go to the "Verify" page
2. Upload the certified document or enter the certification ID
3. View the verification results and blockchain details

## Environment Setup

The application requires the following environment variables:

- `VITE_ALGORAND_NETWORK`: Algorand network to use (mainnet/testnet)
- `VITE_ALGOD_SERVER`: Algorand node URL
- `VITE_ALGOD_PORT`: Algorand node port
- `VITE_ALGOD_TOKEN`: API token for Algorand node

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.