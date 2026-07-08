/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, SlidersHorizontal, BookOpen, ChevronRight, X, Mail, Check, Sparkles } from 'lucide-react';
import { CatalogueItem } from '../types';
import { CATALOGUE_ITEMS, CATEGORIES } from '../data';
import { logButtonClick, logProductView } from '../utils';

interface CatalogueViewProps {
  onBack: () => void;
  onNavigateToEnquiry: (productName?: string, productCode?: string) => void;
}

export default function CatalogueView({ onBack, onNavigateToEnquiry }: CatalogueViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<CatalogueItem | null>(null);

  useEffect(() => {
    logButtonClick('catalogue');
  }, []);

  // Filter items based on category and search query
  const filteredItems = CATALOGUE_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All Products' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenProduct = (product: CatalogueItem) => {
    setSelectedProduct(product);
    logProductView(product.id);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-slate-950 text-white relative p-4 pb-20">
      {/* Decorative Glow background */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />

      {/* Header Sticky Navigation */}
      <div className="flex items-center justify-between sticky top-0 py-3 bg-slate-950/90 backdrop-blur-md z-40 border-b border-white/5 -mx-4 px-4 mb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors duration-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hub</span>
        </button>

        <div className="flex items-center space-x-1">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span className="font-display font-bold text-sm text-slate-100 tracking-tight">Digital Catalogue</span>
        </div>
      </div>

      {/* Main Intro Intro */}
      <div className="mb-5">
        <h2 className="font-display font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-amber-200">
          Our Textile Portfolio
        </h2>
        <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-light">
          Premium warp knits, stretch laces, narrow elastics, and eco-sustainable textiles engineered for global standards.
        </p>
      </div>

      {/* Search Bar container */}
      <div className="relative w-full mb-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search codes, compositions, or specs..."
          className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-850 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Swipable Category Tabs */}
      <div className="flex overflow-x-auto pb-3 space-x-2 -mx-4 px-4 scrollbar-none mb-4">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 font-semibold shadow-md shadow-amber-500/10'
                : 'bg-slate-900 text-slate-400 border-slate-850 hover:border-slate-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product List Grid */}
      <div className="flex-1 grid grid-cols-1 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleOpenProduct(item)}
              className="bg-slate-900/60 border border-slate-850 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-500/40 transition-all duration-300 group flex"
            >
              {/* Product Thumbnail Frame */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-slate-950 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-1 left-1 bg-slate-950/80 backdrop-blur-md border border-white/5 px-1 rounded text-[8px] font-mono text-amber-400 uppercase tracking-widest flex items-center space-x-1">
                  <span>{item.code.split('-')[1] || 'GZ'}</span>
                  {item.pdfUrl && (
                    <span className="bg-rose-500 text-white rounded-[2px] px-0.5 font-bold font-sans">PDF</span>
                  )}
                </div>
              </div>

              {/* Product Info Description */}
              <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-amber-500">
                      {item.category}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">
                      {item.weight || item.width}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xs sm:text-sm text-slate-100 mt-1 line-clamp-1 group-hover:text-amber-300 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-[10px] sm:text-xs mt-1.5 font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-850/60">
                  <span className="text-[9px] font-mono text-slate-500 truncate max-w-[120px]">
                    {item.composition}
                  </span>
                  <div className="flex items-center space-x-2">
                    {item.pdfUrl && (
                      <span className="text-[9px] text-rose-400 font-medium bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded-md flex items-center space-x-1">
                        <BookOpen className="w-2.5 h-2.5" />
                        <span>PDF</span>
                      </span>
                    )}
                    <span className="text-[9px] text-amber-400 font-medium flex items-center space-x-0.5 group-hover:translate-x-0.5 transition-transform duration-200">
                      <span>View Specs</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 bg-slate-900/20 border border-slate-850/40 rounded-2xl">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400 text-xs">No matching textiles found.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Products');
                setSearchQuery('');
              }}
              className="text-amber-500 text-xs mt-3 underline"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>

      {/* Sticky Bottom Floating Status Tag */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 z-40 max-w-xs text-center">
        <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
        <span className="text-[10px] text-slate-300 font-medium tracking-wide">
          Click any textile product for technical specs
        </span>
      </div>

      {/* Backdrop Detailed Product Specs Modal Sheet */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end justify-center z-50 p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-w-md bg-slate-900 border-t sm:border border-slate-800 rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]"
            >
              {/* Product Hero Image Header */}
              <div className="h-44 sm:h-48 relative bg-slate-950 flex-shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full hover:bg-black text-slate-300 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Tag badges */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="bg-amber-500 text-slate-950 font-display font-semibold text-[9px] uppercase px-2 py-0.5 rounded-md shadow-md">
                    {selectedProduct.category}
                  </span>
                  <h3 className="font-display font-black text-lg text-white mt-1 leading-tight tracking-tight shadow-sm">
                    {selectedProduct.title}
                  </h3>
                </div>
              </div>

              {/* Specifications Body Content (Scrollable) */}
              <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-300">
                {/* Item description */}
                <div>
                  <p className="text-slate-400 font-light leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Spec details grid */}
                <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-850">
                  <div className="space-y-0.5 border-r border-slate-850 pr-2">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Product Code</span>
                    <p className="font-mono text-amber-400 font-semibold truncate">{selectedProduct.code}</p>
                  </div>
                  <div className="space-y-0.5 pl-2">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Weight / Width</span>
                    <p className="font-mono text-slate-200 font-medium truncate">{selectedProduct.weight}</p>
                  </div>
                  <div className="col-span-2 border-t border-slate-850/60 pt-2.5 mt-1">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Composition</span>
                    <p className="text-slate-200 font-medium leading-tight">{selectedProduct.composition}</p>
                  </div>
                  <div className="col-span-2 border-t border-slate-850/60 pt-2.5 mt-1">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Roll Standard Width</span>
                    <p className="text-slate-200 font-medium">{selectedProduct.width}</p>
                  </div>
                </div>

                {/* Specific fabric benefits list */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">Key Performance Advantages</span>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProduct.features.map((feat) => (
                      <div key={feat} className="flex items-center space-x-2.5 bg-slate-950/30 px-3 py-2 rounded-lg border border-slate-850/40">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-[11px] text-slate-300 font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action trigger footer button */}
              <div className="p-4 bg-slate-950 border-t border-slate-850/60 flex flex-col space-y-3 flex-shrink-0">
                {selectedProduct.pdfUrl && (
                  <button
                    onClick={() => {
                      try {
                        window.open(selectedProduct.pdfUrl, '_blank', 'noopener,noreferrer');
                      } catch (e) {
                        console.error('Failed to open PDF catalogue:', e);
                      }
                    }}
                    className="w-full py-2.5 bg-rose-650 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-md shadow-rose-600/10 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 animate-pulse" />
                    <span>View Catalogue PDF / Photo</span>
                  </button>
                )}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 py-2.5 border border-slate-800 hover:border-slate-700 bg-slate-900 rounded-xl text-slate-400 text-xs font-semibold transition-colors duration-200 cursor-pointer"
                  >
                    Close Specs
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      onNavigateToEnquiry(selectedProduct.title, selectedProduct.code);
                    }}
                    className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-bold rounded-xl transition-all duration-200 shadow-md shadow-amber-500/10 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Request Swatch</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
