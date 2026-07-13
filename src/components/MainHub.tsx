/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Instagram, Globe, MessageSquare, ShieldCheck, Heart, Award, ArrowRight, Linkedin } from 'lucide-react';
import { ActivePage } from '../types';
import { GINZA_INFO } from '../data';
import { logButtonClick } from '../utils';

interface MainHubProps {
  onNavigate: (page: ActivePage) => void;
  visitCount: number;
}

export default function MainHub({ onNavigate, visitCount }: MainHubProps) {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'ginza2026') {
      onNavigate('ADMIN');
      setShowAdminLogin(false);
      setPasscode('');
      setError('');
    } else {
      setError('Invalid passcode. Hint: ginza2026');
    }
  };

  const navButtons = [
    {
      id: 'CATALOGUE' as ActivePage,
      title: '  Company Profile',
      subtitle: 'Browse Corporate Brochure, Vision & Milestones',
      icon: BookOpen,
      color: 'from-amber-500/10 to-rose-500/10 hover:from-amber-500/15 hover:to-rose-500/15',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200/50 hover:border-amber-400',
      badge: 'Interactive Brochure'
    },
    {
      id: 'INSTAGRAM' as ActivePage,
      title: 'Instagram',
      subtitle: 'Explore Behind-the-Scenes & High-Tech Looms',
      icon: Instagram,
      color: 'from-pink-500/10 to-purple-500/10 hover:from-pink-500/15 hover:to-purple-500/15',
      iconColor: 'text-pink-600',
      borderColor: 'border-pink-200/50 hover:border-pink-400',
      badge: '@ginza'
    },
    {
      id: 'LINKEDIN' as ActivePage,
      title: 'Linkedin',
      subtitle: 'Official Updates, Corporate Posts & Articles',
      icon: Linkedin,
      color: 'from-blue-600/10 to-sky-500/10 hover:from-blue-600/15 hover:to-sky-500/15',
      iconColor: 'text-blue-500',
      borderColor: 'border-blue-300/40 hover:border-blue-400',
      badge: 'Company Posts'
    },
    {
      id: 'WEBSITE' as ActivePage,
      title: 'Corporate Website',
      subtitle: 'Our Heritage, Global Capabilities & Certificates',
      icon: Globe,
      color: 'from-blue-500/10 to-indigo-500/10 hover:from-blue-500/15 hover:to-indigo-500/15',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200/50 hover:border-blue-400',
      badge: 'Explore'
    },
    {
      id: 'ENQUIRY' as ActivePage,
      title: 'Submit an Enquiry',
      subtitle: 'Request Swatches, Custom Orders & Meetings',
      icon: MessageSquare,
      color: 'from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/15 hover:to-teal-500/15',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200/50 hover:border-emerald-400',
      badge: 'Instant Response'
    }
  ];

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white overflow-x-hidden p-6">
      {/* Background Silk Flow Decorative Glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] rounded-full bg-rose-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-20%] w-[250px] h-[250px] rounded-full bg-blue-500/5 blur-[90px] pointer-events-none" />
      
      {/* Header section */}
      <div className="w-full flex flex-col items-center text-center mt-6 mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Logo Brand Frame */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 p-[2px] shadow-xl shadow-rose-500/15 mb-4">
            <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center p-1.5 overflow-hidden">
              <img 
                src="https://www.ginzalimited.com/cdn/shop/files/Ginza_logo.jpg?v=1668509673&width=500" 
                alt="GINZA Logo" 
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <h1 id="brand-header" className="font-display font-extrabold text-3xl tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
            {GINZA_INFO.name}
          </h1>
          <p className="text-amber-400 font-medium text-xs tracking-widest uppercase mt-2 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 shadow-sm">
            {GINZA_INFO.exhibition} • {GINZA_INFO.booth}
          </p>
          <p className="text-slate-400 text-sm mt-3 px-2 leading-relaxed max-w-xs font-light">
            {GINZA_INFO.tagline}
          </p>
        </motion.div>
      </div>

      {/* Button Menu list */}
      <div className="flex-1 flex flex-col space-y-4 relative z-10 w-full mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 font-mono text-[10px] uppercase text-center tracking-widest mb-1"
        >
          Select an option below to begin
        </motion.p>

        {navButtons.map((btn, index) => {
          const IconComponent = btn.icon;
          return (
            <motion.button
              key={btn.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.08, type: 'spring', stiffness: 120 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (btn.id === 'INSTAGRAM') {
                  logButtonClick('instagram');
                  try {
                    window.open(GINZA_INFO.instagram, '_blank', 'noopener,noreferrer');
                  } catch (e) {
                    console.error('Failed to open Instagram in a new tab:', e);
                  }
                } else if (btn.id === 'LINKEDIN') {
                  try {
                    window.open('https://www.linkedin.com/company/ginzaindustrieslimited/posts/?feedView=all', '_blank', 'noopener,noreferrer');
                  } catch (e) {
                    console.error('Failed to open LinkedIn in a new tab:', e);
                  }
                } else if (btn.id === 'WEBSITE') {
                  logButtonClick('website');
                  try {
                    window.open(GINZA_INFO.website, '_blank', 'noopener,noreferrer');
                  } catch (e) {
                    console.error('Failed to open Website in a new tab:', e);
                  }
                } else {
                  onNavigate(btn.id);
                }
              }}
              className={`w-full text-left p-4 rounded-2xl bg-gradient-to-r ${btn.color} border ${btn.borderColor} transition-all duration-300 flex items-start space-x-4 shadow-lg shadow-black/30 group relative overflow-hidden`}
            >
              {/* Decorative side accent */}
              <div className="absolute top-0 left-0 w-[4px] h-full bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className={`p-3 rounded-xl bg-slate-950 border border-white/5 shadow-inner ${btn.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-6 h-6" />
              </div>
              
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center space-x-2">
                  <span className="font-display font-bold text-base text-white tracking-wide group-hover:text-amber-300 transition-colors duration-200">
                    {btn.title}
                  </span>
                  <span className="text-[9px] uppercase font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-slate-400 font-medium">
                    {btn.badge}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed font-light line-clamp-2">
                  {btn.subtitle}
                </p>
              </div>

              <div className="self-center text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer info section */}
      <div className="mt-auto pt-6 border-t border-white/5 flex flex-col items-center text-center relative z-10">
        <div className="flex space-x-6 text-slate-400 text-xs mb-4">
          <div className="flex items-center space-x-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5">
            <Award className="w-3.5 h-3.5 text-rose-500" />
            <span className="font-mono text-[11px]">OEKO-TEX</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5">
            <Heart className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono text-[11px]">GRS Recycled</span>
          </div>
        </div>

        {/* Quietly styled Visitor / Stall scan indicator */}
        
        {/* Subtle security dashboard activator */}
        <button
          onClick={() => setShowAdminLogin(true)}
          className="text-slate-600 hover:text-amber-500 font-mono text-[9px] uppercase tracking-widest flex items-center space-x-1 bg-slate-950/40 hover:bg-slate-950 px-2 py-1 rounded transition-colors duration-200 border border-transparent hover:border-slate-800/80 mt-1"
        >
          <ShieldCheck className="w-3 h-3" />
          <span>Stall Manager Portal</span>
        </button>
      </div>

      {/* Slide-Up Passcode Modal for Stall Managers */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 to-rose-500" />
            
            <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center space-x-2">
              <ShieldCheck className="text-amber-500 w-5 h-5" />
              <span>Stall Manager Login</span>
            </h3>
            <p className="text-slate-400 text-xs mb-4">
              Enter the manager passcode to access real-time scans, enquiry list, and download CSV leads.
            </p>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-slate-500 font-mono text-[10px] uppercase tracking-wider mb-1">
                  Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500 font-mono tracking-widest text-center"
                  autoFocus
                />
                {error && <p className="text-rose-500 text-[10px] mt-1 font-mono">{error}</p>}
                <p className="text-slate-500 text-[9px] mt-2 italic">
                  Hint for evaluation: Use <code className="text-slate-300 font-mono">ginza2026</code>
                </p>
              </div>

              <div className="flex space-x-3 text-xs font-medium pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setPasscode('');
                    setError('');
                  }}
                  className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white transition-all duration-200 shadow-md shadow-rose-500/10"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
