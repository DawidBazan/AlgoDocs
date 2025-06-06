import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as QRCode from 'qrcode';
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();

/**
 * Generates a SHA-256 hash of the document contents
 */
export async function generateDocumentHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Adds a watermark and QR code to a PDF document
 */
export async function addWatermark(
  file: File,
  certificateId: string,
  verificationUrl: string
): Promise<Blob> {
  const existingPdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Generate QR code with the full verification URL containing transaction ID
  const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
    width: 100,
    margin: 0,
  });
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
    
    // Add verification text with transaction ID
    page.drawText(`Certificate ID: ${certificateId}`, {
      x: width - 300,
      y: height - 20,
      size: 10,
      font: helveticaFont,
      color: rgb(0.5, 0.5, 0.5),
    });
    
    // Extract transaction ID from verification URL
    const txIdMatch = verificationUrl.match(/txId=([A-Za-z0-9]+)/);
    const transactionId = txIdMatch ? txIdMatch[1] : '';
    
    page.drawText(`Transaction ID: ${transactionId}`, {
      x: width - 300,
      y: height - 35,
      size: 8,
      font: helveticaFont,
      color: rgb(0.5, 0.5, 0.5),
    });
    
    page.drawText(`Verify at: ${window.location.origin}/verify`, {
      x: width - 300,
      y: height - 50,
      size: 8,
      font: helveticaFont,
      color: rgb(0.5, 0.5, 0.5),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Extracts the transaction ID from a certified document
 */
export async function extractTransactionId(file: File): Promise<string | null> {
  if (file.type !== 'application/pdf') {
    return null;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    // Check all pages for transaction ID
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Look for transaction ID in text content
      const fullText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      // Try multiple patterns to find transaction ID
      const patterns = [
        /Transaction ID:\s*([A-Za-z0-9]{52})/i,
        /txId=([A-Za-z0-9]{52})/i,
        /transaction:\s*([A-Za-z0-9]{52})/i,
        /([A-Za-z0-9]{52})/g // Generic 52-character Algorand transaction ID
      ];
      
      for (const pattern of patterns) {
        const match = fullText.match(pattern);
        if (match && match[1] && match[1].length === 52) {
          return match[1];
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting transaction ID:', error);
    return null;
  }
}

/**
 * Extracts QR code data from a PDF document
 */
export async function extractQRCodeData(file: File): Promise<string | null> {
  if (file.type !== 'application/pdf') {
    return null;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    // Check all pages for QR codes
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 });
      
      // Create canvas to render page
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      // Render page to canvas
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
      
      // Try to decode QR code from canvas
      try {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        // Note: In a real implementation, you'd use a QR code decoder library here
        // For now, we'll rely on text extraction
      } catch (qrError) {
        console.log('No QR code found on page', pageNum);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting QR code:', error);
    return null;
  }
}

/**
 * Validates if a string is a valid Algorand transaction ID
 */
export function isValidAlgorandTxId(txId: string): boolean {
  // Algorand transaction IDs are 52 characters long and base32 encoded
  return /^[A-Z2-7]{52}$/.test(txId.toUpperCase());
}