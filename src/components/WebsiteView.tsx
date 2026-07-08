/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Globe, ExternalLink, Calendar, Building, Landmark, Compass, Award, Shield, CheckCircle, Leaf, Zap } from 'lucide-react';
import { GINZA_INFO } from '../data';
import { logButtonClick } from '../utils';

interface WebsiteViewProps {
  onBack: () => void;
}

export default function WebsiteView({ onBack }: WebsiteViewProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'manufacturing' | 'certifications'>('profile');

  useEffect(() => {
    logButtonClick('website');
  }, []);

  const handleOpenExternal = () => {
    try {
      window.open(GINZA_INFO.website, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.error('Failed to open Website in a new window:', e);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-slate-950 text-white relative p-4 pb-16">
      {/* Decorative Glow background */}
      <div className="absolute top-10 left-10 w-[200px] h-[200px] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />

      {/* Header Sticky Navigation */}
      <div className="flex items-center justify-between sticky top-0 py-3 bg-slate-950/95 backdrop-blur-md z-40 border-b border-white/5 -mx-4 px-4 mb-3">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-blue-400 transition-colors duration-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hub</span>
        </button>

        <div className="flex items-center space-x-1 text-blue-500">
          <Globe className="w-4 h-4" />
          <span className="font-display font-bold text-sm text-slate-100 tracking-tight">Corporate Website</span>
        </div>
      </div>

      {/* Real Website Deep Link Banner */}
      <div className="bg-blue-950/20 border border-blue-500/30 rounded-xl p-4 mb-5 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500" />
        <h3 className="font-display font-bold text-sm text-white flex items-center space-x-1.5">
          <Globe className="w-4 h-4 text-blue-400 animate-pulse" />
          <span>Visit Official Corporate Site</span>
        </h3>
        <p className="text-[10px] text-slate-300 mt-1 mb-3 font-light max-w-xs leading-relaxed">
          Access full investor relations, download catalogs, find worldwide agents, and read our technical bulletins on the web.
        </p>
        <button
          onClick={handleOpenExternal}
          className="w-full py-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 hover:opacity-90 active:scale-98 text-white font-bold text-xs rounded-lg transition-all duration-200 shadow-md flex items-center justify-center space-x-1.5"
        >
          <span>Open ginzalimited.com</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation Subtabs */}
      <div className="grid grid-cols-3 gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-850 mb-5">
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-2 rounded-lg text-[10px] uppercase tracking-wider font-semibold transition-all duration-200 ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Company Profile
        </button>
        <button
          onClick={() => setActiveTab('manufacturing')}
          className={`py-2 rounded-lg text-[10px] uppercase tracking-wider font-semibold transition-all duration-200 ${
            activeTab === 'manufacturing'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Manufacturing
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`py-2 rounded-lg text-[10px] uppercase tracking-wider font-semibold transition-all duration-200 ${
            activeTab === 'certifications'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Compliance
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1">
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Quick Hero description */}
            <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl">
              <h3 className="font-display font-bold text-base text-slate-100 flex items-center space-x-2">
                <Compass className="w-4.5 h-4.5 text-blue-500" />
                <span>Our Heritage</span>
              </h3>
              <p className="text-slate-300 text-xs font-light mt-2 leading-relaxed">
                {GINZA_INFO.about}
              </p>
            </div>

            {/* Core Statistics grid */}
            <div className="grid grid-cols-2 gap-3">
              {GINZA_INFO.stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-850 p-3.5 rounded-xl text-center">
                  <p className="font-display font-black text-xl text-blue-400 leading-none">{stat.value}</p>
                  <p className="text-[10px] text-slate-400 font-light mt-1.5 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Core Values row */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500">Corporate Values</h4>
              <div className="space-y-2.5">
                {[
                  { title: 'Extreme Quality Precision', desc: 'Operating advanced laser scanners and quality-control systems to guarantee zero defects.' },
                  { title: 'Continuous R&D Innovation', desc: 'Our dedicated warp labs constantly prototype tomorrow\'s high-stretch and cooling garments.' },
                  { title: 'Uncompromising Sustainability', desc: 'Direct sourcing of sustainable elastomers and recycled post-consumer waste polyesters.' }
                ].map((val, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-slate-900/30 border border-slate-850/50 p-3 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <h5 className="font-bold text-slate-200">{val.title}</h5>
                      <p className="text-slate-400 text-[11px] font-light mt-0.5 leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'manufacturing' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Manufacturing intro info */}
            <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl space-y-3">
              <h3 className="font-display font-bold text-base text-slate-100 flex items-center space-x-2">
                <Building className="w-4.5 h-4.5 text-blue-500" />
                <span>State-of-the-Art Operations</span>
              </h3>
              <p className="text-slate-300 text-xs font-light leading-relaxed">
                Ginza's production core relies on heavy investments in advanced knitting and weaving technologies imported from standard world-leaders (including Karl Mayer, Germany).
              </p>
            </div>

            {/* Industrial Machinery steps */}
            {[
              { title: 'Computerized Warp Knitting (Surat)', tech: 'Karl Mayer HKS Looms', desc: 'Over 80 high-speed warp looms running 28-gauge to 40-gauge operations, generating high-tensile mesh and flawless tricot fabrics.' },
              { title: 'Exquisite Lace Looms (Surat)', tech: 'Karl Mayer Raschel Jacquard', desc: 'Custom configured computerized lace units allowing intricate, textured, and corded lace pattern layouts designed by our in-house Parisian design desk.' },
              { title: 'Narrow Elastics Weaving (Mumbai)', tech: 'Jakob Müller Needle Looms', desc: 'High-speed Swiss needle looms producing heavy-duty activewear grippers, silicone-backed elastics, and ultra-plush lingerie bands.' },
              { title: 'Precision Automated Dye House', tech: 'Thies Jet Dyeing Machinery', desc: 'Fully computer-controlled atmospheric and high-temperature dyeing systems delivering excellent lot-to-lot color fastness and strict chemical compliance.' }
            ].map((mach, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-850 p-3.5 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-200">{mach.title}</span>
                  <span className="text-[9px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded uppercase font-medium">
                    {mach.tech}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] font-light mt-1.5 leading-relaxed">
                  {mach.desc}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'certifications' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Compliance intro banner */}
            <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl flex items-start space-x-3">
              <Award className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 animate-pulse" />
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-slate-100">Verified Compliance</h3>
                <p className="text-slate-300 text-xs font-light leading-relaxed">
                  We maintain active certifications with standard global monitoring bodies, ensuring full sustainability, human safety, and ethical labor codes.
                </p>
              </div>
            </div>

            {/* Certifications list */}
            {GINZA_INFO.certifications.map((cert, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-850 p-4 rounded-xl space-y-1 flex items-start space-x-3.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 mt-0.5">
                  {idx % 2 === 0 ? <Leaf className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-100">{cert.title}</span>
                  </div>
                  <span className="text-[9px] text-slate-500 block font-mono mt-0.5">{cert.issuer}</span>
                  <p className="text-slate-400 text-[11px] font-light mt-1.5 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
