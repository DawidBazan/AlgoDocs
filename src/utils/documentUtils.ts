import CryptoJS from 'crypto-js';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as QRCode from 'qrcode';
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/build/pdf.worker.mjs';
// Set PDF.js worker source


/**
 * Generates a SHA-256 hash for the provided file
 * @param file File to generate hash for
 * @returns Promise<string> The SHA-256 hash
 */
export async function generateDocumentHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const wordArray = CryptoJS.lib.WordArray.create(buffer);
  const hash = CryptoJS.SHA256(wordArray);
  return hash.toString();
}

/**
 * Adds a watermark to a PDF file including a QR code and certificate information
 * @param file Original PDF file
 * @param certificateId Certificate ID to include in watermark
 * @param verificationUrl URL for certificate verification
 * @returns Promise<Blob> Watermarked PDF as a Blob
 */
export async function addWatermark(
  file: File,
  certificateId: string,
  verificationUrl: string
): Promise<Blob> {
  // Read the PDF file
  const fileBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(fileBuffer);
  const pages = pdfDoc.getPages();
  
  // Generate QR code as data URL
  const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
    margin: 0,
    width: 100,
  });
  
  // Convert data URL to bytes
  const qrCodeImage = await pdfDoc.embedPng(
    qrCodeDataUrl.replace('data:image/png;base64,', '')
  );
  
  // Add watermark to each page
  for (const page of pages) {
    const { width, height } = page.getSize();
    
    // Add QR code
    page.drawImage(qrCodeImage, {
      x: width - 120,
      y: height - 120,
      width: 100,
      height: 100,
    });
    
    // Add certificate text
    page.drawText(`Certificate ID: ${certificateId}`, {
      x: width - 300,
      y: height - 40,
      size: 10,
      font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
      color: rgb(0.5, 0.5, 0.5),
    });
    
    page.drawText(`Verify at: ${verificationUrl}`, {
      x: width - 300,
      y: height - 55,
      size: 8,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0.5, 0.5, 0.5),
    });
  }
  
  // Save the modified PDF
  const modifiedPdfBytes = await pdfDoc.save();
  return new Blob([modifiedPdfBytes], { type: 'application/pdf' });
}

/**
 * Extracts transaction ID from a PDF document by scanning for QR codes
 * @param file PDF file to scan
 * @returns Promise<string | null> Transaction ID if found, null otherwise
 */
export async function extractTransactionId(file: File): Promise<string | null> {
  if (file.type !== 'application/pdf') {
    return null;
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  // Scan last page first as that's where we add the QR code
  const pageNum = pdf.numPages;
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale: 2.0 });
  
  // Create canvas to render the page
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  
  const context = canvas.getContext('2d');
  if (!context) return null;

  // Render PDF page to canvas
  await page.render({
    canvasContext: context,
    viewport: viewport
  }).promise;

  // Get image data
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  
  try {
    // Look for text containing transaction ID
    const textContent = await page.getTextContent();
    const txIdMatch = textContent.items
      .map(item => (item as any).str)
      .find(text => text.includes('Verify at:'));

    if (txIdMatch) {
      const urlMatch = txIdMatch.match(/txId=([a-zA-Z0-9]+)/);
      if (urlMatch && urlMatch[1]) {
        return urlMatch[1];
      }
    }
  } catch (error) {
    console.error('Error extracting transaction ID:', error);
  }

  return null;
}