/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, BookOpen, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Search, X, Download, Columns, FileText, Globe, Award, Heart, 
  MapPin, Phone, Mail, Building, Landmark, Compass, Shield, CheckCircle, 
  Layers, Settings, Users, Sparkles, AlertCircle, HelpCircle
} from 'lucide-react';
import { logButtonClick } from '../utils';
import { SlidesRenderer } from './SlidesRenderer';

interface CompanyProfileViewProps {
  onBack: () => void;
  onNavigateToEnquiry: (productName?: string, productCode?: string) => void;
}

export default function CatalogueView({ onBack, onNavigateToEnquiry }: CompanyProfileViewProps) {
  const [profileMode, setProfileMode] = useState<'google-slides' | 'local-brochure'>('google-slides');
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logButtonClick('catalogue');
  }, []);

  const totalPages = 22;

  // Zoom control bounds
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 75));
  const handleResetZoom = () => setZoom(100);

  // Search indexing text on pages
  const pageIndexes = [
    { page: 1, title: 'Title Page', text: 'OUR BROCHURE PREMIER TEXTILE MANUFACTURING GINZA INDUSTRIES LIMITED' },
    { page: 2, title: 'Our Genesis', text: 'OUR GENESIS established 1986 premier textile manufacturing' },
    { page: 3, title: 'Vision & Mission', text: 'VISION MISSION To be a reputed global company in fashion wear intimate apparels and its components segment backward integration product innovation human resources environmental responsibility customer value sales distribution network' },
    { page: 4, title: 'Key Milestones', text: 'KEY MILESTONES timeline 1986 registered 1990 Warp Knit 1995 Elastic Tape 2005 Embroidery unit processing 2006 Torchon lace 2007 intimate apparel stitching eye hook 2011 SOIE brand launched 2012 weft knit yarn twisting 2013 corporate office Mumbai 2018 sublimation printing moulded cups 2024 crochet fabric 70-80% water recycled 2025 PUR lamination 400k sqft expansion 4MW solar plant HEKTOR brand' },
    { page: 5, title: 'Core Business Ingredients', text: 'INGREDIENTS OF A ROBUST CORE BUSINESS Quality products concentrated manufacturing facilities state-of-the-art technology well-diversified customer base customer loyalty SKU agnostic customer service pan-India distribution network one stop solution' },
    { page: 6, title: 'Systems & Processes', text: 'SYSTEMS PROCESSES labor training information technology MIS ERP structured order delivery processes quality checks raw material procurement each unit separate centre' },
    { page: 7, title: 'Management Team', text: 'MANAGEMENT TEAM Ashok Sethia CMD Manoj Sethia MD Laxmipat Banthia Arvind Sethia Rohit Sethia Amrit Sethia component manufacturing sales warp knit weft embroidery dyeing processing eye hook bra cups tape palghar central warehousing SOIE apparel export' },
    { page: 8, title: 'Fully Integrated Operations', text: 'FULLY INTEGRATED OPERATIONS yarn texturizing twisting knitting warp weft knit finished fabrics elastics intimate apparels garments nightwear active wear tricot Multibar Raschel Jaquardtronic Textronic' },
    { page: 9, title: 'Value Chain - Warp, Weft & Embroidery', text: 'FULLY INTEGRATED VALUE CHAIN Warp Knit Weft Knit Embroidery 120k sqft capacity 200k metres day jacquard stretch monthly output 100 tons man made fibers Schiffli Mutli head machine Guipure laces cambric viscose mesh jersey 15 million stitches daily' },
    { page: 10, title: 'Value Chain - Elastics, Dyeing & Torchan', text: 'FULLY INTEGRATED VALUE CHAIN Elastics Dyeing Processing Torchan Lace Braiding domestic elastic tape suppliers 800k metres woven knitted jacquard tapes daily Thies jet dyeing 500 tons month sublimation printing beach wear cover ups Japanese machines 30k-35k mtrs daily' },
    { page: 11, title: 'Value Chain - Trims & Apparel', text: 'FULLY INTEGRATED VALUE CHAIN Trims Apparel Manufacturing bra cup manufacturing eye hook tapes one stop solution three plants 1500 machines nightwear active wear fashion SOIE' },
    { page: 12, title: 'Value Chain - Capability Overview', text: 'FULLY INTEGRATED VALUE CHAIN yarn fabrics elastics value addition accessories apparels flat textured crimp Rotto yarn Weft Warp Knits cotton polyester nylon Oekotex100 GOTS organic cotton Invista Lycra sublimation printing digital lamination bonding raising embossing foil laser cutting bra foam cups hook eye' },
    { page: 13, title: 'Value Chain - Visual Hotspots', text: 'FULLY INTEGRATED VALUE CHAIN garment parts mapping embroidery lace developed by embroidery unit interlinings for support comfort weft knitting warp knitting mesh fabric eyes hooks elastic tapes sublimation print fabric dyeing and processing' },
    { page: 14, title: 'Product Spectrum', text: 'PRODUCT SPECTRUM Raschel Jaquardtronics Textronic rigid stretch lurex blends warp knit mesh jersey Schiffili embroidered fabrics Mutli head cording sequence single double jersey Torchan laces crochet cotton laces elastic tapes name tapes frill scallop elastics velvet transparent nylon polyester crimp yarn' },
    { page: 15, title: 'Accreditations & Certificates', text: 'ACCREDITATIONS WRAP worldwide responsible accredited GOTS global organic textile standard OHSAS 18001 occupational health safety Global Recycle Standard GRS Oeko-Tex Standard 100 confidence in textiles C-TPAT customs trade partnership against terrorism' },
    { page: 16, title: 'Major Customers', text: 'MAJOR CUSTOMERS Jockey Enamor Next Sourcing Triumph Walmart Tchibo Skechers Cult.Sport Trends' },
    { page: 17, title: 'Stretch at the Core', text: 'STRETCH AT THE CORE technology focus innovation materials' },
    { page: 18, title: 'Stretch Expertise', text: 'STRETCH EXPERTISE CAPABILITY fit aesthetics up to 30% spandex active-wear lingerie underwear shape wear compression wear' },
    { page: 19, title: 'Retail Portfolio Title', text: 'RETAIL PORTFOLIO consumer brands direct to market' },
    { page: 20, title: 'Retail Portfolio - SOIE', text: 'RETAIL PORTFOLIO SOIE women premium innerwear nightwear website www.soie.in self love confidence fashion' },
    { page: 21, title: 'Retail Portfolio - HEKTOR', text: 'RETAIL PORTFOLIO HEKTOR men clothing engineered comfort bonded fabrics nylon blends performance breathability website https://hektor.in' },
    { page: 22, title: 'Contact Us & Branches', text: 'CONTACT US Head Office Lotus Corporate Park Goregaon East Mumbai Surat Piyush Baid Mumbai Vishal Ambhore Delhi Vinay Chhajer Ludhiana Mahesh Chandeliya Jaipur Durgesh Bangalore Murali Krishna Tirupur Ravi Varman Ahmedabad Ravindra Kolkata Rajesh Jain Ulhasnagar Sachin Bhosle SOIE Varun Jaggi Hektor Harsh Bohra' },
  ];

  // Perform client search filtering
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : pageIndexes.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Jump to specific page
  const handlePageJump = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSearchOpen(false);
      // Auto-scroll viewer container to top on page flip
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }
  };

  // Mock PDF text compilation download
  const handleDownloadPDF = () => {
    try {
      const summaryText = `
=========================================
GINZA INDUSTRIES LIMITED
Company Profile & Information Brochure
=========================================
Exhibition: Bharat Tex 2026
Stall: Hall 2FF, STALL No.2F-B1
Location: Pragati Maidan, New Delhi, India

ABOUT GINZA:
Established in 1986, Ginza Limited is India's leading integrated manufacturer of premium warp-knitted fabrics, exquisite Raschel & embroidery laces, and high-performance narrow elastics.

VISION:
To be a reputed global company in fashion wear, intimate apparels and its components segment.

MANUFACTURING STRENGTHS:
- 3 plants with 1500+ advanced machines.
- State-of-the-art warping, wefting, and Swiss needle looms.
- Advanced finishing dye houses in Surat and Mumbai.
- Sustainable practices: Recycled water usage & 4MW Solar facilities.

CERTIFICATIONS:
- OEKO-TEX Standard 100
- Global Recycled Standard (GRS)
- GOTS Organic Cotton Certification
- WRAP compliance

RETAIL BRANDS:
- SOIE: Premium women innerwear & loungewear (www.soie.in)
- HEKTOR: Advanced high-performance menswear (https://hektor.in)

CONTACT:
Head Office: A-501/502 Lotus Corporate Park, Goregaon East, Mumbai.
Email: exports@ginzalimited.com
      `;
      const blob = new Blob([summaryText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ginza_company_profile_brochure.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to trigger brochure download:', err);
    }
  };

  // Render individual slide page beautifully
  const renderSlideContent = (page: number) => {
    return <SlidesRenderer page={page} />;
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-slate-900 text-slate-100 relative">
      {/* Dynamic PDF Reader Header toolbar */}
      <div className="bg-slate-950 border-b border-slate-850 p-3 flex flex-col space-y-2.5 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-display font-bold text-xs tracking-tight text-slate-200">Company Profile</span>
          </div>
        </div>



        {/* Real PDF Reader styled Chrome bar (only shown in local-brochure mode) */}
        {profileMode === 'local-brochure' && (
          <div className="flex items-center justify-between bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center space-x-2 truncate max-w-[140px]">
              <FileText className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span className="truncate text-[10px] text-slate-300 font-medium">brochure_2026.pdf</span>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => handlePageJump(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-1 hover:bg-slate-800 rounded disabled:opacity-30 text-slate-200"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-slate-200 font-semibold">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageJump(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-1 hover:bg-slate-800 rounded disabled:opacity-30 text-slate-200"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className={`p-1 hover:bg-slate-800 rounded ${showThumbnails ? 'bg-slate-800/80 text-amber-400' : 'text-slate-400'}`}
                title="Toggle Page Thumbnails"
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-1 hover:bg-slate-800 rounded ${searchOpen ? 'bg-slate-800/80 text-amber-400' : 'text-slate-400'}`}
                title="Search keywords inside PDF"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDownloadPDF}
                className="p-1 hover:bg-slate-800 rounded text-slate-300"
                title="Download text copy"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Real-time PDF Text Search Panel (only shown in local-brochure mode) */}
      <AnimatePresence>
        {profileMode === 'local-brochure' && searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-950 border-b border-slate-800 p-3 relative z-30"
          >
            <div className="relative w-full mb-2">
              <Search className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 w-3.5 h-3.5 self-center mt-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vision, milestones, elastics..."
                className="w-full pl-8 pr-8 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-2.5 flex items-center text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results listing */}
            <div className="max-h-40 overflow-y-auto space-y-1 font-mono text-[10px] text-slate-400">
              {searchQuery.trim() !== '' ? (
                searchResults.length > 0 ? (
                  searchResults.map((res) => (
                    <button
                      key={res.page}
                      onClick={() => handlePageJump(res.page)}
                      className="w-full text-left p-1.5 hover:bg-slate-900 rounded border border-transparent hover:border-slate-850 flex justify-between items-center transition-colors"
                    >
                      <span className="text-slate-200 truncate pr-3">Page {res.page}: {res.title}</span>
                      <span className="text-[8px] bg-amber-500/10 text-amber-500 px-1 py-0.5 rounded flex-shrink-0">Jump To</span>
                    </button>
                  ))
                ) : (
                  <p className="text-slate-500 p-2 italic text-center">No matching keywords found in brochure.</p>
                )
              ) : (
                <p className="text-slate-500 p-2 italic text-center">Enter a search keyword to index all 22 brochure pages.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container rendering depending on profileMode */}
      {profileMode === 'google-slides' ? (
        <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto">
          {/* Informative alert explaining slide features */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-300 leading-normal font-light">
              We have embedded the official **Ginza Limited Presentation** featuring high-definition textile photographs, machinery portfolios, and certifications. Open in full screen or swipe to navigate.
            </p>
          </div>

          {/* Presentation Sandbox Frame */}
          <div className="flex-1 min-h-[420px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl flex flex-col">
            <iframe
              src="https://docs.google.com/presentation/d/1eb0wBDO5HNwNq95dIVJwQ3udN7lt7XSE/embed?start=false&loop=false&delayms=3000"
              frameBorder="0"
              width="100%"
              height="100%"
              allowFullScreen={true}
              className="w-full flex-1 min-h-[350px] bg-slate-950"
              title="Ginza Company Profile Slides"
            />
            <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-t border-slate-800 shrink-0">
              <span className="text-[10px] text-slate-400 font-mono">Live Slides Viewer</span>
              <button
                onClick={() => {
                  try {
                    window.open('https://docs.google.com/presentation/d/1eb0wBDO5HNwNq95dIVJwQ3udN7lt7XSE/edit?usp=sharing', '_blank');
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="text-[9px] uppercase font-mono bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 px-2.5 py-1 rounded-md flex items-center space-x-1.5 transition-colors"
              >
                <Globe className="w-3 h-3" />
                <span>Open in Slides</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Main presentation canvas area (local text pages) */
        <div className="flex-1 flex overflow-hidden">
          {/* Toggleable thumbnail bar */}
          <AnimatePresence>
            {showThumbnails && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '84px', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="bg-slate-950 border-r border-slate-850 overflow-y-auto flex-shrink-0 flex flex-col p-2 space-y-2 select-none"
              >
                <p className="text-[8px] uppercase tracking-wider font-mono text-slate-600 text-center font-bold pb-1 border-b border-slate-900">
                  Brochure
                </p>
                {pageIndexes.map((p) => (
                  <button
                    key={p.page}
                    onClick={() => handlePageJump(p.page)}
                    className={`w-full flex flex-col items-center p-1 rounded-lg border text-center transition-all ${
                      currentPage === p.page 
                        ? 'bg-amber-500/10 border-amber-500/60 shadow-lg' 
                        : 'bg-slate-900/60 border-slate-850 hover:border-slate-800'
                    }`}
                  >
                    {/* Miniature simulation visual box */}
                    <div className={`w-12 h-14 rounded-md border flex flex-col justify-between p-1 shadow-inner relative overflow-hidden ${
                      p.page === 1 ? 'bg-amber-50 text-slate-900' : p.page === 2 || p.page === 17 || p.page === 19 ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'
                    }`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 self-end opacity-40" />
                      <div className="space-y-0.5 w-full">
                        <div className="h-[2px] bg-slate-400/40 w-5/6 mx-auto rounded" />
                        <div className="h-[2px] bg-slate-400/40 w-4/6 mx-auto rounded" />
                        <div className="h-[2px] bg-slate-400/40 w-3/6 mx-auto rounded" />
                      </div>
                      <div className="h-[1.5px] bg-slate-300/30 w-full" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 mt-1">Page {p.page}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Viewport page presentation window */}
          <div 
            ref={containerRef}
            className="flex-1 bg-slate-950 overflow-auto flex justify-center p-4 relative"
          >
            {/* Zoom container */}
            <div 
              style={{ 
                transform: `scale(${zoom / 100})`, 
                transformOrigin: 'top center',
                width: '100%',
                height: '420px', // Set height for standard aspect ratio
                transition: 'transform 0.15s ease-out'
              }}
              className="max-w-sm aspect-[4/5] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden bg-white self-start flex flex-col"
            >
              {renderSlideContent(currentPage)}
            </div>
          </div>
        </div>
      )}

      {/* Floating Zoom / Slide control bar (only shown in local-brochure mode) */}
      {profileMode === 'local-brochure' && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3.5 py-2 rounded-full shadow-2xl flex items-center space-x-3.5 z-30 max-w-xs select-none">
          <div className="flex items-center space-x-1">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 75}
              className="p-1 hover:bg-slate-800 rounded disabled:opacity-35 text-slate-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono font-bold text-slate-300 w-8 text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 200}
              className="p-1 hover:bg-slate-800 rounded disabled:opacity-35 text-slate-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            {zoom !== 100 && (
              <button 
                onClick={handleResetZoom}
                className="text-[9px] font-mono text-amber-500 hover:underline pl-1"
              >
                Reset
              </button>
            )}
          </div>

          <div className="h-4 w-[1px] bg-slate-800" />

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageJump(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-1 hover:bg-slate-800 rounded text-slate-300 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handlePageJump(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-1 hover:bg-slate-800 rounded text-slate-300 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom trigger enquiries bar */}
      <div className="bg-slate-950 border-t border-slate-850 px-4 py-3 flex items-center justify-between sticky bottom-0 z-40">
        <span className="text-[10px] text-slate-400 leading-tight max-w-[180px] font-light">
          Have questions regarding GINZA manufacturing or compliance?
        </span>
        <button
          onClick={() => onNavigateToEnquiry(
            profileMode === 'google-slides'
              ? 'Company Profile - Interactive Slides'
              : `Company Profile - Brochure Page ${currentPage}`,
            profileMode === 'google-slides'
              ? 'BROCHURE-SLIDES'
              : `BROCHURE-P${currentPage}`
          )}
          className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-bold rounded-lg transition-all shadow-md shadow-amber-500/10 cursor-pointer animate-pulse"
        >
          Enquire Now
        </button>
      </div>

      {/* Download/Success Toast */}
      <AnimatePresence>
        {downloadSuccess && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold px-4 py-2.5 rounded-full shadow-2xl z-50 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Brochure text file saved to downloads!</span>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
