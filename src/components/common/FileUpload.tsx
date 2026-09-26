import React, { useRef, useState } from 'react';
import { Upload, FileText, Image as ImageIcon, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept?: string;
  maxSizeMB?: number;
  required?: boolean;
  helpText?: string;
  valueUrl?: string;
  valueFileName?: string;
  onFileSelect: (fileData: { url: string; fileName: string; sizeMB: string; fileObj?: File }) => void;
  onFileRemove: () => void;
  isImage?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = 'image/*,application/pdf',
  maxSizeMB = 5,
  required = false,
  helpText,
  valueUrl,
  valueFileName,
  onFileSelect,
  onFileRemove,
  isImage = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setError(null);
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      setError(`File size (${sizeInMB.toFixed(1)} MB) exceeds maximum limit of ${maxSizeMB} MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onFileSelect({
          url: dataUrl,
          fileName: file.name,
          sizeMB: `${sizeInMB.toFixed(2)} MB`,
          fileObj: file,
        });
      }
    };
    reader.onerror = () => {
      setError('Failed to process uploaded file. Please try another file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {helpText && <span className="text-[11px] text-slate-500">{helpText}</span>}
      </div>

      {valueUrl || valueFileName ? (
        <div className="relative group border border-slate-200 rounded-xl p-3 bg-slate-50 flex items-center justify-between shadow-sm hover:border-blue-300 transition-colors">
          <div className="flex items-center space-x-3 overflow-hidden">
            {isImage && valueUrl ? (
              <img
                src={valueUrl}
                alt="Preview"
                className="w-14 h-14 object-cover rounded-lg border border-slate-200 shadow-xs"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <p className="text-xs font-semibold text-slate-800 truncate">
                  {valueFileName || 'Uploaded File'}
                </p>
              </div>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Ready for submission</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2.5 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={onFileRemove}
              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 relative ${
            isDragOver
              ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
              : 'border-slate-300 hover:border-blue-400 bg-white hover:bg-slate-50/50'
          }`}
        >
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            {isImage ? <ImageIcon className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
          </div>
          <p className="text-xs font-semibold text-slate-700">
            Click to upload or drag & drop
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {isImage ? 'JPG, PNG or WebP' : 'PDF, JPG or PNG'} (Max {maxSizeMB} MB)
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-1.5 text-rose-600 text-xs mt-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
