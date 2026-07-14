/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ArrowLeft, MessageSquare, ExternalLink } from 'lucide-react';
import { logButtonClick } from '../utils';

interface EnquiryViewProps {
  onBack: () => void;
  preselectedProduct?: string;
  preselectedCode?: string;
}

export default function EnquiryView({ onBack, preselectedProduct, preselectedCode }: EnquiryViewProps) {
  useEffect(() => {
    logButtonClick('enquiry');
  }, []);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-slate-950 text-white relative p-4 pb-16">
      {/* Decorative Glow background */}
      <div className="absolute top-10 right-10 w-[200px] h-[200px] rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />

      {/* Header Sticky Navigation */}
      <div className="flex items-center justify-between sticky top-0 py-3 bg-slate-950/95 backdrop-blur-md z-40 border-b border-white/5 -mx-4 px-4 mb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors duration-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-medium"
          id="btn-back-hub"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hub</span>
        </button>

        <div className="flex items-center space-x-1 text-emerald-500">
          <MessageSquare className="w-4 h-4" />
          <span className="font-display font-bold text-sm text-slate-100 tracking-tight">Enquiry Form</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-4">
        <div className="bg-slate-900/60 border border-slate-850/80 rounded-2xl p-4 text-center space-y-3">
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            Access our centralized global enquiry system. Fill out the form directly on this page or launch it in a separate tab.
          </p>
          <button
            type="button"
            onClick={() => {
              try {
                window.open('https://forms.gle/pwkmqbQadDMtrA7z6', '_blank', 'noopener,noreferrer');
              } catch (err) {
                console.error('Failed to open form:', err);
              }
            }}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold text-xs rounded-xl transition-all duration-200 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
            id="btn-open-form-tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Google Form in New Tab</span>
          </button>
        </div>

        <div className="w-full flex-1 min-h-[450px] relative rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
          {/* Subtle loading spinner behind the iframe */}
          <div className="absolute inset-0 flex items-center justify-center z-0 bg-slate-950/80">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase animate-pulse">Loading Enquiry Form...</span>
            </div>
          </div>
          <iframe
            src="https://forms.gle/pwkmqbQadDMtrA7z6"
            className="w-full h-[450px] border-0 relative z-10 rounded-2xl"
            title="Enquiry Form"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}

