/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BarChart3, Users, CheckCircle, Trash2, Download, Printer, RefreshCw, MessageSquare, Tag, Eye, Lock, ShieldAlert, Check } from 'lucide-react';
import { Analytics, Enquiry, ButtonClicks } from '../types';
import { getAnalytics, getEnquiries, updateEnquiryStatus, deleteEnquiry, exportEnquiriesToCSV, resetSystemData } from '../utils';
import { CATALOGUE_ITEMS } from '../data';

interface AdminDashboardProps {
  onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'enquiries' | 'qr'>('analytics');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  let currentUrl = 'https://www.ginzalimited.com';
  try {
    currentUrl = window.location.href;
  } catch (e) {
    console.warn('Failed to access window.location.href:', e);
  }

  const loadData = async () => {
    // Instant local storage load
    setAnalytics(getAnalytics());
    setEnquiries(getEnquiries());

    // Centralized server sync
    try {
      const resAnal = await fetch('/api/analytics');
      if (resAnal.ok) {
        const dataAnal = await resAnal.json();
        setAnalytics(dataAnal);
        localStorage.setItem('ginza_analytics_v1', JSON.stringify(dataAnal));
      }
      
      const resEnq = await fetch('/api/enquiries');
      if (resEnq.ok) {
        const dataEnq = await resEnq.json();
        setEnquiries(dataEnq);
        localStorage.setItem('ginza_enquiries_v1', JSON.stringify(dataEnq));
      }
    } catch (e) {
      console.warn('Failed to sync centralized data from server API:', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: Enquiry['status']) => {
    // Local optimistic update
    const updated = updateEnquiryStatus(id, status);
    setEnquiries(updated);
    showToast('Lead status updated!');

    // Backend sync
    try {
      const res = await fetch(`/api/enquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const serverData = await res.json();
        setEnquiries(serverData);
        localStorage.setItem('ginza_enquiries_v1', JSON.stringify(serverData));
      }
    } catch (e) {
      console.error('Failed to sync status to server:', e);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      // Local optimistic delete
      const updated = deleteEnquiry(id);
      setEnquiries(updated);
      showToast('Lead deleted successfully.');

      // Backend sync
      try {
        const res = await fetch(`/api/enquiries/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          const serverData = await res.json();
          setEnquiries(serverData);
          localStorage.setItem('ginza_enquiries_v1', JSON.stringify(serverData));
        }
      } catch (e) {
        console.error('Failed to sync delete to server:', e);
      }
    }
  };

  const handleResetData = async () => {
    // Local reset
    resetSystemData();
    loadData();
    setShowResetConfirm(false);
    showToast('All analytics and enquiries have been reset.');

    // Backend sync
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      if (res.ok) {
        const dbState = await res.json();
        setAnalytics(dbState.analytics);
        setEnquiries(dbState.enquiries);
      }
    } catch (e) {
      console.error('Failed to sync reset to server:', e);
    }
  };

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.error('Failed to trigger window.print():', e);
    }
  };

  if (!analytics) return null;

  const clickData = [
    { label: 'Digital Catalogue', count: analytics.clicks.catalogue, color: 'bg-amber-500' },
    { label: 'Instagram lookbook', count: analytics.clicks.instagram, color: 'bg-pink-500' },
    { label: 'Corporate Website', count: analytics.clicks.website, color: 'bg-blue-500' },
    { label: 'Submit Enquiry Form', count: analytics.clicks.enquiry, color: 'bg-emerald-500' }
  ];

  // Map product view analytics to names, filtering out non-catalogue items
  const productViewData = Object.entries(analytics.productViews || {})
    .map(([id, views]) => {
      const product = CATALOGUE_ITEMS.find(p => p.id === id);
      const viewCount = typeof views === 'number' ? views : Number(views) || 0;
      return {
        id,
        product,
        title: product ? product.title : id,
        code: product ? product.code : 'UNKNOWN',
        views: viewCount
      };
    })
    .filter(item => item.product !== undefined) // ONLY show products currently in the catalogue!
    .sort((a, b) => b.views - a.views);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-slate-950 text-white relative p-4 pb-16 print:bg-white print:text-black print:p-0 print:max-w-none">
      
      {/* Dynamic Toast feedback */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center space-x-2 z-50 font-mono font-bold"
          >
            <Check className="w-4 h-4" />
            <span>{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Sticky Navigation (Hidden on print) */}
      <div className="flex items-center justify-between sticky top-0 py-3 bg-slate-950/95 backdrop-blur-md z-40 border-b border-white/5 -mx-4 px-4 mb-4 print:hidden">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors duration-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Portal</span>
        </button>

        <div className="flex items-center space-x-1.5 text-amber-500">
          <Lock className="w-4 h-4" />
          <span className="font-display font-bold text-xs text-slate-100 tracking-tight uppercase">Stall Manager Portal</span>
        </div>
      </div>

      {/* Main Tabs (Hidden on print) */}
      <div className="grid grid-cols-3 gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-850 mb-5 print:hidden">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all duration-200 flex flex-col items-center space-y-1 ${
            activeTab === 'analytics'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all duration-200 flex flex-col items-center space-y-1 relative ${
            activeTab === 'enquiries'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Enquiries</span>
          {enquiries.filter(e => e.status === 'new').length > 0 && (
            <span className="absolute top-1 right-3 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('qr')}
          className={`py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all duration-200 flex flex-col items-center space-y-1 ${
            activeTab === 'qr'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>Stall QR Stand</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 print:p-0">
        
        {/* TAB 1: ANALYTICS (Hidden on print) */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5 print:hidden"
          >
            {/* Scans visit card */}
            <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono block">QR Code Scans (Total Visits)</span>
                <span className="font-display font-black text-4xl text-amber-400 mt-1 block leading-none">{analytics.totalVisits}</span>
                <p className="text-[10px] text-slate-400 mt-1 font-light">Unique scan actions recorded at Bharat Tex stall</p>
              </div>
              <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-500">
                <Users className="w-8 h-8" />
              </div>
            </div>

            {/* Clicks overview block */}
            <div className="bg-slate-900/40 border border-slate-850 p-4.5 rounded-2xl space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-100 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-amber-500" />
                <span>Feature Engagement Counts</span>
              </h3>
              
              <div className="space-y-3.5">
                {clickData.map((click, idx) => {
                  const maxCount = Math.max(...clickData.map(c => c.count), 1);
                  const widthPercent = Math.round((click.count / maxCount) * 100);
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-300">{click.label}</span>
                        <span className="font-mono font-bold text-amber-400">{click.count} clicks</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                        <div className={`h-full ${click.color} rounded-full`} style={{ width: `${widthPercent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Textile Product Views analytics */}
            <div className="bg-slate-900/40 border border-slate-850 p-4.5 rounded-2xl space-y-3">
              <h3 className="font-display font-bold text-sm text-slate-100 flex items-center space-x-2">
                <Eye className="w-4 h-4 text-amber-500" />
                <span>Catalogue Product View Rankings</span>
              </h3>
              <p className="text-[10px] text-slate-500 font-light mt-0.5 leading-relaxed">
                Tracks which fabrics, laces, or elastics buyers are expanding to read detailed technical specifications.
              </p>

              <div className="space-y-2 pt-2">
                {productViewData.length > 0 ? (
                  productViewData.map((p, idx) => (
                    <div key={p.id} className="flex items-center justify-between bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center font-mono text-[10px] text-slate-500 font-bold border border-slate-800">
                          #{idx + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-200 truncate">{p.title}</p>
                          <p className="text-[9px] font-mono text-slate-500 uppercase truncate">{p.code}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 font-mono text-xs font-bold text-amber-400 bg-amber-500/5 border border-amber-500/10 px-2 py-1 rounded">
                        {p.views} views
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-[10px] italic text-center py-4">No product views logged yet.</p>
                )}
              </div>
            </div>

            {/* Reset Stats section */}
            <div className="pt-2">
              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full py-2.5 border border-slate-900 hover:bg-rose-500/5 hover:border-rose-500/30 text-rose-500 text-xs font-mono uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Session Data</span>
                </button>
              ) : (
                <div className="bg-rose-950/10 border border-rose-500/30 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center space-x-2 text-rose-500 font-bold text-xs">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Confirm System Wipe</span>
                  </div>
                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    This will permanently delete all scan analytics, click counters, product views, and captured enquiries. This cannot be undone.
                  </p>
                  <div className="flex space-x-3 text-xs font-medium pt-1">
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="flex-1 py-1.5 bg-slate-900 text-slate-400 hover:text-white rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleResetData}
                      className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold"
                    >
                      Wipe Data
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: ENQUIRIES LIST (Hidden on print) */}
        {activeTab === 'enquiries' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 print:hidden"
          >
            {/* Leads Header toolbar */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-sm text-slate-100 flex items-center space-x-2">
                  <MessageSquare className="w-4.5 h-4.5 text-amber-500" />
                  <span>Lead List ({enquiries.length})</span>
                </h3>
                <p className="text-[10px] text-slate-500 font-light mt-0.5">B2B buyer enquiries from Bharat Tex</p>
              </div>

              {enquiries.length > 0 && (
                <button
                  onClick={exportEnquiriesToCSV}
                  className="flex items-center space-x-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-lg transition-colors duration-200 shadow-md shadow-amber-500/15"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV Export</span>
                </button>
              )}
            </div>

            {/* Enquiries listings */}
            <div className="space-y-3">
              {enquiries.length > 0 ? (
                enquiries.map((eq) => (
                  <div key={eq.id} className="bg-slate-900/60 border border-slate-850 p-4 rounded-xl space-y-3 text-xs relative overflow-hidden">
                    {/* Status marker */}
                    <div className="absolute top-0 right-0 w-[3px] h-full bg-current" style={{
                      color: eq.status === 'new' ? '#34d399' : eq.status === 'contacted' ? '#3b82f6' : '#94a3b8'
                    }} />

                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-100 font-display text-sm leading-tight">{eq.fullName}</h4>
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wide block mt-0.5">{eq.companyName}</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">
                        {new Date(eq.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-850/60 text-[11px] leading-relaxed">
                      <div>
                        <span className="text-slate-500 text-[9px] block">Email</span>
                        <a href={`mailto:${eq.email}`} className="text-slate-300 hover:underline hover:text-amber-400 break-all">{eq.email}</a>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[9px] block">Phone</span>
                        <a href={`tel:${eq.phone}`} className="text-slate-300 hover:underline hover:text-amber-400 font-mono">{eq.phone}</a>
                      </div>
                      <div className="col-span-2 border-t border-slate-850/40 pt-1.5 mt-0.5">
                        <span className="text-slate-500 text-[9px] block">Interest Product / Volume</span>
                        <p className="text-slate-200 font-semibold">{eq.categoryInterest} • {eq.volumeRequirement}</p>
                      </div>
                    </div>

                    {eq.message && (
                      <div className="bg-slate-950/20 border border-slate-850/40 p-2 rounded-lg">
                        <span className="text-slate-500 text-[9px] block mb-0.5">Specific Requirements</span>
                        <p className="text-slate-300 leading-relaxed font-light text-[11px] whitespace-pre-line">{eq.message}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between border-t border-slate-850/60 pt-2.5">
                      {/* Status toggle toolbar */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleStatusChange(eq.id, 'new')}
                          className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-medium ${eq.status === 'new' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-white'}`}
                        >
                          New
                        </button>
                        <button
                          onClick={() => handleStatusChange(eq.id, 'contacted')}
                          className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-medium ${eq.status === 'contacted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-500 hover:text-white'}`}
                        >
                          Contacted
                        </button>
                        <button
                          onClick={() => handleStatusChange(eq.id, 'completed')}
                          className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-medium ${eq.status === 'completed' ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'text-slate-500 hover:text-white'}`}
                        >
                          Done
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteEnquiry(eq.id)}
                        className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-rose-500 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-slate-900/20 border border-slate-850/40 rounded-2xl">
                  <Users className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                  <p className="text-slate-400 text-xs">No enquiries received yet.</p>
                  <p className="text-slate-500 text-[10px] mt-1">Submit test entries via the Enquiry tab!</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 3: PRINTABLE STALL QR TENT CARD */}
        {activeTab === 'qr' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Quick print helper banner (Hidden on print) */}
            <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl space-y-3.5 print:hidden">
              <h3 className="font-display font-bold text-sm text-slate-100 flex items-center space-x-2">
                <Printer className="w-4.5 h-4.5 text-amber-500" />
                <span>One QR Code Stall Display</span>
              </h3>
              <p className="text-slate-300 text-xs font-light leading-relaxed">
                Display this beautifully generated tent card at your reception desk or on your fabric racks. Visitors can scan it to instantly load this digital portal on their own phones!
              </p>
              
              <button
                onClick={handlePrint}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all duration-200 shadow-md shadow-amber-500/15 flex items-center justify-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Display Poster</span>
              </button>
            </div>

            {/* Actual Printable Tent Card Content */}
            <div className="bg-white text-slate-900 border-2 border-slate-300 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center space-y-6 mx-auto w-full max-w-sm print:shadow-none print:border-0 print:p-0 print:rounded-none">
              
              {/* Decorative design flourishes */}
              <div className="w-full border-b-2 border-slate-900 pb-4 flex flex-col items-center">
                <img 
                  src="https://www.ginzalimited.com/cdn/shop/files/Ginza_logo.jpg?v=1668509673&width=500" 
                  alt="GINZA Logo" 
                  className="h-10 object-contain mb-2"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">Welcome to our Stall</p>
                <h1 className="font-display font-black text-2xl tracking-tight text-slate-900 uppercase mt-0.5">
                  Ginza Limited
                </h1>
                <p className="text-xs font-semibold text-rose-600 tracking-wider uppercase mt-1">
                  Bharat Tex 2026 • Hall 2, Booth H2-B14
                </p>
              </div>

              {/* Central CTA */}
              <div className="space-y-1.5">
                <h2 className="font-display font-extrabold text-base text-slate-950 leading-tight">
                  Scan to Explore Our Digital Stall
                </h2>
                <p className="text-[10px] text-slate-500 font-medium px-4 leading-relaxed">
                  Avoid physical paper waste. Instantly access:
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 pt-2 text-[8px] font-bold uppercase tracking-wider">
                  <span className="bg-slate-100 border border-slate-200 px-2 py-1 rounded text-slate-700">Digital Catalogue</span>
                  <span className="bg-slate-100 border border-slate-200 px-2 py-1 rounded text-slate-700">Instagram Lookbook</span>
                  <span className="bg-slate-100 border border-slate-200 px-2 py-1 rounded text-slate-700">Submit Enquiry Form</span>
                </div>
              </div>

              {/* Dynamic QR Code Image */}
              <div className="bg-slate-50 border-4 border-slate-900 p-4 rounded-2xl shadow-md">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}`}
                  alt="Stall Hub QR Code"
                  className="w-44 h-44 print:w-56 print:h-56"
                />
              </div>

              {/* Footer instruction line */}
              <div className="border-t border-slate-200 pt-4 w-full text-center">
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Powered by Ginza Textile Analytics</p>
                <p className="text-[8px] text-slate-400 mt-1 truncate max-w-[280px] mx-auto font-mono">{currentUrl}</p>
              </div>

            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
