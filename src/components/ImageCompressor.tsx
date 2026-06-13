import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Download, Upload, Image as ImageIcon, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ImageCompressor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [options, setOptions] = useState({
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg' as string,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setOriginalImage(URL.createObjectURL(file));
      setCompressedImage(null);
      setCompressedFile(null);
      // Auto-detect type
      setOptions(prev => ({ ...prev, fileType: file.type }));
    }
  };

  const compressImage = async () => {
    if (!selectedFile) return;
    setIsCompressing(true);
    try {
      const compressionOptions = {
        maxSizeMB: options.maxSizeMB,
        maxWidthOrHeight: options.maxWidthOrHeight,
        useWebWorker: options.useWebWorker,
        fileType: options.fileType,
      };
      const result = await imageCompression(selectedFile, compressionOptions);
      setCompressedFile(result);
      setCompressedImage(URL.createObjectURL(result));
    } catch (error) {
      console.error('Compression error:', error);
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadImage = () => {
    if (compressedImage && compressedFile) {
      const link = document.createElement('a');
      link.href = compressedImage;
      link.download = `compressed_${compressedFile.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-8">
      {!selectedFile ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 dark:border-blue-900/50 rounded-2xl p-16 bg-blue-50/30 dark:bg-blue-900/10 transition-all hover:bg-blue-50/50 dark:hover:bg-blue-900/20 group">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center space-y-5">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload size={32} className="text-blue-600" />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-slate-700 dark:text-white">Drag & drop files here</p>
              <p className="text-slate-500 text-sm mt-1">Maximum file size 50MB • Supports JPG, PNG, WEBP</p>
            </div>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 pointer-events-none">
              Select Images
            </button>
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ImageIcon size={14} className="text-blue-500" /> Original Metadata
              </h3>
              <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800">
                <img src={originalImage!} alt="Original" className="w-full h-full object-contain" />
              </div>
              <div className="mt-4 flex justify-between text-xs font-bold uppercase tracking-tighter text-slate-400">
                <span>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                <span>Type: {selectedFile.type.split('/')[1]}</span>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm space-y-6">
              <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Compression Settings</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Max Size ({options.maxSizeMB} MB)</label>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={options.maxSizeMB}
                    onChange={(e) => setOptions({ ...options, maxSizeMB: Number(e.target.value) })}
                    className="w-full h-1 bg-blue-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resolution</label>
                    <select
                      value={options.maxWidthOrHeight}
                      onChange={(e) => setOptions({ ...options, maxWidthOrHeight: Number(e.target.value) })}
                      className="w-full mt-1 bg-transparent text-sm font-bold border-none focus:ring-0 outline-none cursor-pointer"
                    >
                      <option value={1080}>1080p</option>
                      <option value={1920}>1920p (HD)</option>
                      <option value={2560}>2560p (2K)</option>
                      <option value={3840}>3840p (4K)</option>
                    </select>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Format</label>
                    <select
                      value={options.fileType}
                      onChange={(e) => setOptions({ ...options, fileType: e.target.value })}
                      className="w-full mt-1 bg-transparent text-sm font-bold border-none focus:ring-0 outline-none cursor-pointer"
                    >
                      <option value="image/jpeg">JPEG</option>
                      <option value="image/png">PNG</option>
                      <option value="image/webp">WEBP</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={compressImage}
                  disabled={isCompressing}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isCompressing ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
                  {isCompressing ? 'Processing...' : 'Run Optimization'}
                </button>
                <button 
                  onClick={() => { setSelectedFile(null); setOriginalImage(null); setCompressedImage(null); }}
                  className="w-full py-2 text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                >
                  Reset & Pick Another
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm h-full flex flex-col">
              <h3 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle size={14} className="text-green-500" /> Output Preview
              </h3>
              <div className="flex-1 aspect-video relative rounded-lg overflow-hidden bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 flex items-center justify-center">
                {compressedImage ? (
                  <img src={compressedImage} alt="Compressed" className="w-full h-full object-contain animate-in fade-in zoom-in duration-300" />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-sm flex items-center justify-center mx-auto mb-3">
                      <ImageIcon size={20} className="text-slate-200" />
                    </div>
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Awaiting Process</p>
                  </div>
                )}
              </div>
              {compressedImage && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">New File Size</p>
                      <p className="text-xl font-black text-green-700 dark:text-green-400">{(compressedFile!.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Savings</p>
                      <p className="text-xl font-black text-green-700 dark:text-green-400">
                        -{Math.round((1 - compressedFile!.size / selectedFile.size) * 100)}%
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={downloadImage}
                    className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
                  >
                    <Download size={20} />
                    Download Optimized Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
