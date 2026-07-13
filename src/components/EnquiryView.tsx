/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MessageSquare, ExternalLink, Send, CheckCircle2, User, Building, Mail, Phone, FileText, Sparkles } from 'lucide-react';
import { logButtonClick } from '../utils';

interface EnquiryViewProps {
  onBack: () => void;
  preselectedProduct?: string;
  preselectedCode?: string;
}

export default function EnquiryView({ onBack, preselectedProduct, preselectedCode }: EnquiryViewProps) {
  const [formMode, setFormMode] = useState<'direct-form' | 'live-link'>('direct-form');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    logButtonClick('enquiry');
    if (preselectedProduct && preselectedCode) {
      setMessage(`I am interested in product "${preselectedProduct}" (Code: ${preselectedCode}). Please send more details and pricing.`);
    }
  }, [preselectedProduct, preselectedCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          companyName,
          email,
          phone,
          categoryInterest: preselectedProduct || 'General Enquiry',
          volumeRequirement: 'Standard',
          message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Clear fields
        setFullName('');
        setCompanyName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        alert('Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      alert('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <span className="font-display font-bold text-sm text-slate-100 tracking-tight">Submit Enquiry</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Form Mode Switcher Pills */}
        <div className="grid grid-cols-2 gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => setFormMode('direct-form')}
            className={`py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 ${
              formMode === 'direct-form'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
            id="tab-direct-form"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Enquiry Form (Direct)</span>
          </button>
          <button
            type="button"
            onClick={() => setFormMode('live-link')}
            className={`py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 ${
              formMode === 'live-link'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
            id="tab-live-link"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Central Form</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4"
              id="success-view"
            >
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/10 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-lg text-slate-100">Enquiry Submitted!</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed font-light">
                  Thank you for submitting your enquiry. Our team will review the details and respond as soon as possible.
                </p>
              </div>
              <div className="flex flex-col space-y-2 w-full max-w-xs pt-4">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold text-xs rounded-xl transition-all duration-200"
                  id="btn-another-enquiry"
                >
                  Submit Another Enquiry
                </button>
                <button
                  onClick={onBack}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold text-xs rounded-xl transition-all duration-200 shadow-md shadow-emerald-500/10"
                  id="btn-back-hub-success"
                >
                  Return to Main Hub
                </button>
              </div>
            </motion.div>
          ) : formMode === 'direct-form' ? (
            <motion.form
              key="direct-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4 flex-1 flex flex-col"
              id="enquiry-offline-form"
            >
              {/* Lead capture header */}
              <div className="mb-1">
                <h2 className="font-display font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-200">
                  Direct Trade Enquiry
                </h2>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed font-light">
                  Submit your request directly here. Data is automatically synchronized to our central records and Google Sheets.
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1" htmlFor="input-full-name">
                  <User className="w-3 h-3 text-emerald-500" />
                  <span>Full Name *</span>
                </label>
                <input
                  id="input-full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="E.g., Rajesh Mehta"
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1" htmlFor="input-company-name">
                  <Building className="w-3 h-3 text-emerald-500" />
                  <span>Company Name *</span>
                </label>
                <input
                  id="input-company-name"
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="E.g., Paramount Apparel Ltd."
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1" htmlFor="input-email">
                  <Mail className="w-3 h-3 text-emerald-500" />
                  <span>Email Address *</span>
                </label>
                <input
                  id="input-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E.g., procurement@paramount.com"
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1" htmlFor="input-phone">
                  <Phone className="w-3 h-3 text-emerald-500" />
                  <span>Phone Number *</span>
                </label>
                <input
                  id="input-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="E.g., +91 98765 43210"
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-mono"
                />
              </div>

              {/* Enquiry Details */}
              <div className="space-y-1.5 flex-1 flex flex-col">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1" htmlFor="input-message">
                  <FileText className="w-3 h-3 text-emerald-500" />
                  <span>Enquiry Details / Message *</span>
                </label>
                <textarea
                  id="input-message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify fabrics, elastic types, custom requirements, colors, GSM, or physical swatch requests..."
                  rows={4}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 leading-relaxed font-light resize-none flex-1"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/15 flex items-center justify-center space-x-2 cursor-pointer"
                  id="btn-submit-enquiry"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Trade Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="live-link"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col space-y-4"
              id="live-link-view"
            >
              <div className="bg-slate-900/60 border border-slate-850/80 rounded-2xl p-4 text-center space-y-3">
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Access our centralized global enquiry system. Fill out the form directly on this page or launch it in a separate tab.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      window.open('https://ais-dev-oj5nr6266syedyd6sp3rys-706272152911.asia-southeast1.run.app/', '_blank', 'noopener,noreferrer');
                    } catch (err) {
                      console.error('Failed to open form:', err);
                    }
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold text-xs rounded-xl transition-all duration-200 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                  id="btn-open-form-tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Form in New Tab</span>
                </button>
              </div>

              <div className="w-full flex-1 min-h-[450px] relative rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl">
                {/* Subtle loading spinner behind the iframe */}
                <div className="absolute inset-0 flex items-center justify-center z-0 bg-slate-950/80">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase animate-pulse">Loading Live Form...</span>
                  </div>
                </div>
                <iframe
                  src="https://ais-dev-oj5nr6266syedyd6sp3rys-706272152911.asia-southeast1.run.app/"
                  className="w-full h-[450px] border-0 relative z-10 rounded-2xl"
                  title="Centralized Enquiry Form"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
