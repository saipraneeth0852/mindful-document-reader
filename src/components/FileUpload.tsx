
import React, { useCallback, useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, uploadedFile }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        onFileUpload(file);
      }
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const file = files[0];
      if (isValidFileType(file)) {
        onFileUpload(file);
      }
    }
  }, [onFileUpload]);

  const isValidFileType = (file: File): boolean => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/csv'
    ];
    return validTypes.includes(file.type);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = useCallback(() => {
    onFileUpload(null as any);
  }, [onFileUpload]);

  if (uploadedFile) {
    return (
      <div className="p-6 border-2 border-green-200 rounded-lg bg-green-50/50 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{uploadedFile.name}</p>
              <p className="text-sm text-gray-500">
                {formatFileSize(uploadedFile.size)} • Ready for analysis
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={removeFile}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        relative p-8 border-2 border-dashed rounded-lg transition-all duration-300 cursor-pointer
        ${isDragOver 
          ? 'border-purple-400 bg-purple-50/50 scale-102' 
          : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50/30'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.csv"
        onChange={handleFileSelect}
      />
      
      <div className="text-center space-y-4">
        <div className={`
          mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
          ${isDragOver ? 'bg-purple-100 scale-110' : 'bg-gray-100'}
        `}>
          <Upload className={`h-8 w-8 ${isDragOver ? 'text-purple-600' : 'text-gray-500'}`} />
        </div>
        
        <div>
          <p className="text-lg font-medium text-gray-900 mb-1">
            Drop your document here
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or <span className="text-purple-600 underline">browse files</span>
          </p>
          
          <div className="text-xs text-gray-400 space-y-1">
            <p>Supported formats: PDF, DOC, DOCX, TXT, CSV</p>
            <p>Maximum file size: 50MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
