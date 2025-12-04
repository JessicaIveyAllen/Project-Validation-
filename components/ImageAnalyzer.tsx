import React, { useState, useRef, useCallback } from 'react';
import { Upload, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { analyzeValidationImage } from '../services/geminiService';
import { AnalysisResult } from '../types';

const ImageAnalyzer: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setBase64Data(result.split(',')[1]); // Remove "data:image/png;base64," prefix
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) processFile(file);
        break;
      }
    }
  }, []);

  const handleAnalyze = async () => {
    if (!base64Data) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const data = await analyzeValidationImage(base64Data);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImagePreview(null);
    setBase64Data(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Confidence UI helper
  const getConfidenceBadge = (confidence: string) => {
    const styles = {
      high: 'bg-green-100 text-green-700 border-green-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-red-100 text-red-700 border-red-200'
    };
    const emojis = { high: '🎯', medium: '🤔', low: '❓' };
    const key = confidence as keyof typeof styles;
    
    return (
      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${styles[key]}`}>
        {emojis[key]} {confidence} Confidence
      </span>
    );
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8" onPaste={handlePaste}>
      <h2 className="text-2xl font-bold font-display text-slate-800 mb-6 flex items-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          AI Method Identifier
        </span>
      </h2>

      {!imagePreview ? (
        <div 
          className="border-3 border-dashed border-indigo-200 hover:border-indigo-400 rounded-xl p-10 text-center transition-all duration-300 bg-white/50 hover:bg-white/80 cursor-pointer group"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
          <div className="w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            <Upload size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">Upload Screenshot</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto mb-4">
            Drag & drop an image, click to browse, or paste from clipboard (Ctrl+V)
          </p>
          <span className="inline-block px-4 py-2 bg-white text-indigo-600 font-semibold text-sm rounded-lg shadow-sm border border-indigo-100 group-hover:shadow-md transition-all">
            Select Image
          </span>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              <img src={imagePreview} alt="Preview" className="w-full h-auto object-cover" />
              <button 
                onClick={reset}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            {!result && (
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`
                  w-full mt-4 py-3 px-6 rounded-xl font-bold text-white shadow-lg transition-all
                  ${isAnalyzing 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-[1px]'
                  }
                `}
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Analyzing...
                  </span>
                ) : (
                  'Identify Method'
                )}
              </button>
            )}
          </div>

          <div className="w-full md:w-1/2">
             {/* Results Section */}
             {result && (
              <div className="h-full animate-fade-in-up">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6 shadow-sm h-full">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                       <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Detected Method</p>
                       <h3 className="text-2xl font-bold text-slate-800">{result.method}</h3>
                     </div>
                     {getConfidenceBadge(result.confidence)}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/60 p-4 rounded-lg">
                      <p className="font-semibold text-slate-700 mb-1 text-sm">Why this method?</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{result.reasoning}</p>
                    </div>
                    
                    <div className="bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
                       <p className="font-semibold text-indigo-900 mb-1 text-sm flex items-center gap-2">
                         Recommended Next Steps
                       </p>
                       <p className="text-indigo-800 text-sm leading-relaxed">{result.suggestions}</p>
                    </div>
                  </div>

                  <button 
                    onClick={reset} 
                    className="mt-6 text-sm font-semibold text-slate-500 hover:text-slate-700 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500"
                  >
                    Analyze another image
                  </button>
                </div>
              </div>
             )}

             {/* Error State */}
             {error && (
               <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl flex items-start gap-3 animate-fade-in-up">
                 <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                 <div>
                   <h4 className="font-bold">Analysis Failed</h4>
                   <p className="text-sm opacity-90">{error}</p>
                   <button onClick={handleAnalyze} className="mt-2 text-xs font-bold uppercase tracking-wide underline">Try Again</button>
                 </div>
               </div>
             )}

             {/* Placeholder / Instructions when no result */}
             {!result && !error && (
               <div className="h-full flex flex-col justify-center items-center text-center p-6 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                 <ImageIcon size={48} className="mb-4 opacity-50" />
                 <p className="text-sm font-medium">Results will appear here</p>
                 <p className="text-xs mt-2 max-w-[200px]">Our AI analyzes visual cues to determine the validation technique used.</p>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;
