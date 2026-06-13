import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, QrCode } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://google.com');
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');

  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR Code Generated via OmniUtil',
          text: `Check out this QR code for: ${text}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm relative">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
              Encoded Content
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-transparent text-sm font-bold dark:text-white border-none focus:ring-0 outline-none resize-none"
              rows={4}
              placeholder="Enter URL or text..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                Resolution (px)
              </label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full bg-transparent text-sm font-bold border-none focus:ring-0 outline-none"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block text-center">
                  BG
                </label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-8 p-0 bg-transparent border-none cursor-pointer"
                />
              </div>
              <div className="flex-1 p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block text-center">
                  FG
                </label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full h-8 p-0 bg-transparent border-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center bg-blue-50/30 dark:bg-blue-900/10 rounded-2xl p-10 border border-blue-200 dark:border-blue-900/50 transition-all group">
          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-500/10 mb-8 transform group-hover:scale-105 transition-transform duration-500">
            <QRCodeSVG
              id="qr-code-svg"
              value={text}
              size={size > 400 ? 256 : size}
              bgColor={bgColor}
              fgColor={fgColor}
              level="H"
              includeMargin={true}
            />
          </div>
          
          <div className="flex gap-4 w-full">
            <button
              onClick={downloadQR}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none"
            >
              <Download size={18} />
              Export
            </button>
            <button
              onClick={shareQR}
              className="px-6 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold transition-all shadow-lg"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
