@@ -2,8 +2,8 @@
 import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
 import * as QRCode from 'qrcode';
 import * as pdfjsLib from 'pdfjs-dist'
-import 'pdfjs-dist/build/pdf.worker.mjs';
-// Set PDF.js worker source
+
+pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();
 
 
 /**