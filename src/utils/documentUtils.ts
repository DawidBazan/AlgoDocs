import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as QRCode from 'qrcode';
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.mjs';


/**
 * Generates a SHA-256 hash of the document
 */
export async function generateDocumentHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Adds a watermark and QR code to a PDF document
 */
export async function addWatermark(
  file: File,
  certificateId: string,
  verificationUrl: string
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Generate QR code
  const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
    margin: 0,
    width: 100,
  });
  const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl);

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

    // Add text
    page.drawText(`Certificate ID: ${certificateId}`, {
      x: width - 300,
      y: height - 20,
      size: 10,
      font: helveticaFont,
      color: rgb(0.5, 0.5, 0.5),
    });

    page.drawText(`Verified at: ${verificationUrl}`, {
      x: width - 300,
      y: height - 35,
      size: 8,
      font: helveticaFont,
      color: rgb(0.5, 0.5, 0.5),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Extracts transaction ID from a certified PDF document
 */
export async function extractTransactionId(file: File): Promise<string | null> {
  if (file.type !== 'application/pdf') {
    return null;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    
    // Look for transaction ID in text content
    const txIdMatch = textContent.items
      .map((item: any) => item.str)
      .join('')
      .match(/Transaction:\s*([A-Za-z0-9]+)/);

    return txIdMatch ? txIdMatch[1] : null;
  } catch (error) {
    console.error('Error extracting transaction ID:', error);
    return null;
  }
}