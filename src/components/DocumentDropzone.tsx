import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface DocumentDropzoneProps {
  onFileDrop: (file: File) => void;
  maxSize?: number;
  accept?: Record<string, string[]>;
}

interface FileDetails {
  name: string;
  size: number;
  type: string;
}

const DocumentDropzone: React.FC<DocumentDropzoneProps> = ({
  onFileDrop,
  maxSize = 26214400, // 25MB
  accept = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  },
}) => {
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<FileDetails | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile({
          name: file.name,
          size: file.size,
          type: file.type,
        });
        onFileDrop(acceptedFiles[0]);
      }
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0];
      if (rejection.errors[0].code === 'file-too-large') {
        setError(`File is too large. Maximum size is ${maxSize / 1024 / 1024}MB.`);
      } else if (rejection.errors[0].code === 'file-invalid-type') {
        setError('Invalid file type. Please upload a PDF, DOC, DOCX, XLS, or XLSX file.');
      } else {
        setError('There was an error with your file. Please try again.');
      }
    },
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`drop-zone ${isDragActive ? 'active' : ''} ${uploadedFile ? 'uploaded' : ''} ${
          isDragReject || error ? 'border-red-500 bg-red-50' : ''
        }`}
      >
        <input {...getInputProps()} />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          {error ? (
            <>
              <AlertCircle size={48} className="text-red-500 mb-4" />
              <p className="text-red-500 mb-2 font-medium">Upload Error</p>
              <p className="text-red-500 text-sm">{error}</p>
            </>
          ) : isDragActive ? (
            <>
              <Upload size={48} className="text-teal-500 mb-4" />
              <p className="text-lg font-medium mb-2">Drop your document here</p>
            </>
          ) : (
            uploadedFile ? (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-teal-600" />
                  </div>
                  <FileText size={32} className="text-navy-700 mb-2" />
                  <p className="text-lg font-medium text-navy-900 mb-2">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500 mb-1">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p className="text-xs text-gray-400">
                    Click or drag to replace file
                  </p>
                </motion.div>
              </>
            ) : (
              <>
                <File size={48} className="text-navy-700 mb-4" />
                <p className="text-lg font-medium mb-2">
                  Drag & drop your document here
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  or click to browse files
                </p>
                <p className="text-xs text-gray-400">
                  Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max 25MB)
                </p>
              </>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentDropzone;