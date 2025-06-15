import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as QRCode from 'qrcode';
import * as pdfjsLib from 'pdfjs-dist';
import jsQR from 'jsqr';

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
  transactionId: string
): Promise<Blob> {
  const existingPdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Generate QR code
  const qrCodeDataUrl = await QRCode.toDataURL(transactionId, {
    width: 80,
    margin: 0,
  });
  const qrCodeImage = await pdfDoc.embedPng(
    qrCodeDataUrl.replace('data:image/png;base64,', '')
  );

  // Add watermark to first page only
  if (pages.length > 0) {
    const page = pages[0];
    const { width, height } = page.getSize();
    
    // Add QR code (smaller and positioned above certificate ID)
    page.drawImage(qrCodeImage, {
      x: width - 100,
      y: height - 100,
      width: 80,
      height: 80,
    });
    
    // Add certificate ID below QR code
    page.drawText(`Certificate ID: ${certificateId}`, {
      x: width - 100,
      y: height - 110,
      size: 10,
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
    const page = await pdf.getPage(1);
    
    // Render page to canvas to extract QR code
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;
    
    // Get image data from canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // Try to decode QR code from the image
    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
    
    if (qrCode && qrCode.data) {
      // The QR code should contain the transaction ID directly
      return qrCode.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting transaction ID:', error);
    return null;
  }
}