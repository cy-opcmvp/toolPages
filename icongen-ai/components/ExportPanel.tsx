import React, { useState } from 'react';
import JSZip from 'jszip';
import { ExportSize } from '../types';

interface ExportPanelProps {
  canvasRef: React.RefObject<any>;
}

const DEFAULT_SIZES: ExportSize[] = [
  { name: 'icon_16x16', width: 16, height: 16 },
  { name: 'icon_32x32', width: 32, height: 32 },
  { name: 'icon_48x48', width: 48, height: 48 },
  { name: 'icon_64x64', width: 64, height: 64 },
  { name: 'icon_128x128', width: 128, height: 128 },
  { name: 'icon_256x256', width: 256, height: 256 },
  { name: 'icon_512x512', width: 512, height: 512 },
  { name: 'icon_1024x1024', width: 1024, height: 1024 },
];

const ExportPanel: React.FC<ExportPanelProps> = ({ canvasRef }) => {
  const [customSizes, setCustomSizes] = useState<ExportSize[]>([]);
  const [newSizeW, setNewSizeW] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const addCustomSize = () => {
    const dim = parseInt(newSizeW);
    if (!isNaN(dim) && dim > 0) {
      setCustomSizes([...customSizes, { name: `custom_${dim}x${dim}`, width: dim, height: dim }]);
      setNewSizeW('');
    }
  };

  const removeCustomSize = (idx: number) => {
    setCustomSizes(customSizes.filter((_, i) => i !== idx));
  };

  const handleBatchDownload = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      const sourceCanvas = canvasRef.current.getCanvasElement() as HTMLCanvasElement;
      if (!sourceCanvas) throw new Error("Canvas not found");

      const zip = new JSZip();
      const folder = zip.folder("app_icons");
      
      const allSizes = [...DEFAULT_SIZES, ...customSizes];

      for (const size of allSizes) {
        // Create a temporary canvas for resizing
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = size.width;
        tempCanvas.height = size.height;
        const ctx = tempCanvas.getContext('2d');
        
        if (ctx) {
          // Standard: App icons are usually 1:1. 
          // Our design is 3:4.
          // Strategy: Draw the 3:4 icon CENTERED in the 1:1 square.
          
          // 1. Calculate aspect fit
          const sourceRatio = sourceCanvas.width / sourceCanvas.height; // 0.75
          const targetRatio = size.width / size.height; // 1.0 usually
          
          let renderW, renderH;

          if (sourceRatio > targetRatio) {
            renderW = size.width;
            renderH = size.width / sourceRatio;
          } else {
            renderH = size.height;
            renderW = size.height * sourceRatio;
          }

          const offsetX = (size.width - renderW) / 2;
          const offsetY = (size.height - renderH) / 2;

          ctx.drawImage(sourceCanvas, offsetX, offsetY, renderW, renderH);

          // Convert to blob
          const blob = await new Promise<Blob | null>(resolve => tempCanvas.toBlob(resolve, 'image/png'));
          if (blob && folder) {
            folder.file(`${size.name}.png`, blob);
          }
        }
      }

      // Generate Zip
      const content = await zip.generateAsync({ type: "blob" });
      
      // Download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = "app_icons.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (e) {
      console.error("Export failed", e);
      alert("Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Batch Export
      </h2>
      
      <div className="space-y-4">
        <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p>Generates <strong>.zip</strong> containing all standard sizes (16px to 1024px).</p>
          <p className="mt-1 text-xs text-gray-500">* Icons are centered within square canvases.</p>
        </div>

        {/* Custom Size Input */}
        <div>
           <label className="block text-xs font-semibold text-gray-700 mb-1">Add Custom Size (Square)</label>
           <div className="flex gap-2">
             <input 
               type="number" 
               placeholder="192" 
               className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
               value={newSizeW}
               onChange={(e) => setNewSizeW(e.target.value)}
             />
             <button 
               onClick={addCustomSize}
               className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-300"
             >
               Add
             </button>
           </div>
        </div>

        {/* Custom List */}
        {customSizes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {customSizes.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                {s.width}x{s.height}
                <button onClick={() => removeCustomSize(i)} className="hover:text-blue-900">&times;</button>
              </span>
            ))}
          </div>
        )}

        <button
          onClick={handleBatchDownload}
          disabled={isExporting}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow transition-colors flex justify-center items-center gap-2"
        >
          {isExporting ? (
             <>
               <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Zipping...
             </>
          ) : (
             "Download All Sizes (.zip)"
          )}
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;
