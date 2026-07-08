/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MessageSquare, Send, CheckCircle2, Building, Mail, Phone, User, Info, FileText, MapPin } from 'lucide-react';
import { addEnquiry, logButtonClick } from '../utils';
import { GINZA_INFO } from '../data';

interface EnquiryViewProps {
  onBack: () => void;
  preselectedProduct?: string;
  preselectedCode?: string;
}

export default function EnquiryView({ onBack, preselectedProduct, preselectedCode }: EnquiryViewProps) {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [categoryInterest, setCategoryInterest] = useState('Warp Knits & Mesh');
  const [volumeRequirement, setVolumeRequirement] = useState('Sampling / Swatch Card');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    logButtonClick('enquiry');
    
    // Auto populate if came from catalogue details
    if (preselectedProduct && preselectedCode) {
      setMessage(`Hi Ginza Team, I am interested in exploring your textile product: "${preselectedProduct}" (Code: ${preselectedCode}). Please arrange a physical swatch sample card for us at our booth or address.`);
    }
  }, [preselectedProduct, preselectedCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !companyName || !email || !phone) return;

    setIsSubmitting(true);

    // Simulate network latency (makes it look professional and authentic)
    setTimeout(() => {
      addEnquiry({
        fullName,
        companyName,
        email,
        phone: `${countryCode} ${phone}`,
        categoryInterest,
        volumeRequirement,
        message
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const categories = [
    'Warp Knits & Mesh',
    'Intimate Laces',
    'Narrow Elastics',
    'Eco-Sustainable',
    'Technical Spacer',
    'Custom Product Development'
  ];

  const volumes = [
    'Sampling / Swatch Card',
    'Small Trial Order (< 1000m)',
    'Bulk Production (1000m - 5000m)',
    'Enterprise Contract (> 5000m)'
  ];

  const countryCodes = [
    { code: '+91', name: 'IN' },
    { code: '+1', name: 'US/CA' },
    { code: '+44', name: 'UK' },
    { code: '+49', name: 'DE' },
    { code: '+81', name: 'JP' },
    { code: '+86', name: 'CN' },
    { code: '+33', name: 'FR' },
    { code: '+39', name: 'IT' },
    { code: '+971', name: 'AE' },
    { code: '+880', name: 'BD' },
    { code: '+94', name: 'LK' }
  ];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-slate-950 text-white relative p-4 pb-16">
      {/* Decorative Glow background */}
      <div className="absolute top-10 right-10 w-[200px] h-[200px] rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />

      {/* Header Sticky Navigation */}
      <div className="flex items-center justify-between sticky top-0 py-3 bg-slate-950/95 backdrop-blur-md z-40 border-b border-white/5 -mx-4 px-4 mb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors duration-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hub</span>
        </button>

        <div className="flex items-center space-x-1 text-emerald-500">
          <MessageSquare className="w-4 h-4" />
          <span className="font-display font-bold text-sm text-slate-100 tracking-tight">Submit Enquiry</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Lead capture banner description */}
            <div className="mb-5">
              <h2 className="font-display font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-emerald-200">
                Textile Swatch & Quote Inquiry
              </h2>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-light">
                Submit your sample requirements directly. We will prepare physical swatch cards and coordinate quotes immediately.
              </p>
            </div>

            {/* Main Form Box */}
            <form onSubmit={handleSubmit} className="space-y-4 flex-1">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <User className="w-3 h-3 text-emerald-500" />
                  <span>Full Name *</span>
                </label>
                <input
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
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <Building className="w-3 h-3 text-emerald-500" />
                  <span>Company Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="E.g., Paramount Apparel Ltd."
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              {/* Contact Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <Mail className="w-3 h-3 text-emerald-500" />
                  <span>Email Address *</span>
                </label>
                <input
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
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-emerald-500" />
                  <span>Phone Number *</span>
                </label>
                <div className="flex space-x-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="bg-slate-900 border border-slate-850 rounded-xl px-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono max-w-[85px]"
                  >
                    {countryCodes.map((cc) => (
                      <option key={cc.code} value={cc.code}>
                        {cc.name} ({cc.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // only allow digits
                    placeholder="98765 43210"
                    className="flex-1 px-3 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 font-mono"
                  />
                </div>
              </div>

              {/* Category of Interest */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <Info className="w-3 h-3 text-emerald-500" />
                  <span>Category of Interest</span>
                </label>
                <select
                  value={categoryInterest}
                  onChange={(e) => setCategoryInterest(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Requirement Volume */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <FileText className="w-3 h-3 text-emerald-500" />
                  <span>Target Requirement Volume</span>
                </label>
                <select
                  value={volumeRequirement}
                  onChange={(e) => setVolumeRequirement(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                >
                  {volumes.map((vol) => (
                    <option key={vol} value={vol}>{vol}</option>
                  ))}
                </select>
              </div>

              {/* Requirement message */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3 text-emerald-500" />
                  <span>Specific Requirements / Message</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify product codes, custom colors, GSM, elastic width requirements, or schedule a meeting..."
                  rows={4}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 leading-relaxed font-light resize-none"
                />
              </div>

              {/* Submit Trigger Action */}
              <div className="pt-2 pb-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/15 flex items-center justify-center space-x-2"
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
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center px-4"
          >
            {/* Animated Checkmark Badge */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/5 mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display font-extrabold text-xl text-white tracking-tight leading-tight">
              Enquiry Submitted Successfully!
            </h3>
            <p className="text-slate-400 text-xs mt-3 leading-relaxed font-light max-w-xs">
              Thank you for connecting, <strong className="text-slate-200">{fullName}</strong> from <strong className="text-slate-200">{companyName}</strong>.
            </p>

            {/* Swatch collection callout box */}
            <div className="bg-slate-900/60 border border-slate-850/80 rounded-2xl p-4.5 mt-6 text-left space-y-3 w-full">
              <div className="flex items-center space-x-2 text-emerald-400 font-display font-bold text-xs">
                <MapPin className="w-4 h-4" />
                <span>Visit our Stall Booth</span>
              </div>
              <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                Please feel free to meet our export representatives at our exhibition pavilion. Quote your name and company to instantly collect your physical swatch books and sample cards:
              </p>
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                <p className="text-xs font-semibold text-slate-200">{GINZA_INFO.name}</p>
                <p className="text-[10px] text-amber-400 font-mono mt-1">{GINZA_INFO.booth}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-none">{GINZA_INFO.exhibition}</p>
              </div>
            </div>

            {/* Quick Actions buttons */}
            <div className="flex flex-col space-y-2 w-full mt-8">
              <button
                onClick={onBack}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-slate-300 font-medium text-xs transition-colors duration-200"
              >
                Back to Exhibition Hub
              </button>
              <button
                onClick={() => {
                  setFullName('');
                  setCompanyName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                  setIsSuccess(false);
                }}
                className="text-emerald-500 hover:text-emerald-400 font-mono text-[10px] uppercase tracking-wider py-2"
              >
                Submit another Enquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
