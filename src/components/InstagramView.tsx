/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Instagram, Heart, MessageCircle, ExternalLink, Bookmark, Grid, User, Film, Tag, X, Send, Globe } from 'lucide-react';
import { InstagramPost } from '../types';
import { GINZA_INFO, INSTAGRAM_POSTS } from '../data';
import { logButtonClick } from '../utils';

interface InstagramViewProps {
  onBack: () => void;
}

export default function InstagramView({ onBack }: InstagramViewProps) {
  const [posts, setPosts] = useState<InstagramPost[]>(INSTAGRAM_POSTS);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, string[]>>({
    'post-1': ['Incredible booth design!', 'Will visit your stall tomorrow!', 'Interested in recycled nylon.'],
    'post-2': ['Are these available for export to the US?', 'Amazing hand feel indeed.'],
    'post-3': ['Very cool sustainability story!', 'Sustainable textile leadership.'],
  });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    logButtonClick('instagram');
  }, []);

  const handleLike = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const isLiked = !!likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }));
    
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1 };
      }
      return p;
    }));

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => prev ? { ...prev, likes: isLiked ? prev.likes - 1 : prev.likes + 1 } : null);
    }
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment.trim()]
    }));
    setNewComment('');
  };

  const handleOpenExternal = () => {
    try {
      window.open(GINZA_INFO.instagram, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.error('Failed to open Instagram in a new window:', e);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-slate-950 text-white relative p-4 pb-16">
      {/* Header Navigation */}
      <div className="flex items-center justify-between sticky top-0 py-3 bg-slate-950/95 backdrop-blur-md z-40 border-b border-white/5 -mx-4 px-4 mb-3">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-pink-400 transition-colors duration-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hub</span>
        </button>

        <div className="flex items-center space-x-1 text-pink-500">
          <Instagram className="w-4 h-4" />
          <span className="font-display font-bold text-sm text-slate-100 tracking-tight">Instagram Lookbook</span>
        </div>
      </div>

      {/* Real Instagram Deep Link Banner */}
      <div className="bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-orange-600/20 border border-pink-500/30 rounded-xl p-4 mb-5 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" />
        <h3 className="font-display font-bold text-sm text-white flex items-center space-x-1.5">
          <Instagram className="w-4 h-4 text-pink-500 animate-pulse" />
          <span>Visit Official Instagram</span>
        </h3>
        <p className="text-[10px] text-slate-300 mt-1 mb-3 font-light max-w-xs leading-relaxed">
          Open our official social profile directly on Instagram to check our latest updates, lookbook reels, and factory highlights.
        </p>
        <button
          onClick={handleOpenExternal}
          className="w-full py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:opacity-90 active:scale-98 text-white font-bold text-xs rounded-lg transition-all duration-200 shadow-md flex items-center justify-center space-x-1.5"
        >
          <span>Open @ginza.industries.limited</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Simulated Instagram Bio Profile */}
      <div className="px-1 mb-5">
        <div className="flex items-center space-x-5 mb-4">
          {/* Logo Circle */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2.5px] flex-shrink-0">
            <div className="w-full h-full rounded-full bg-slate-950 border-2 border-slate-950 overflow-hidden flex items-center justify-center font-display font-black text-xs tracking-wider text-pink-400">
              GZ TEXT
            </div>
          </div>

          {/* Followers / Following Stats */}
          <div className="flex-1 flex justify-around text-center">
            <div>
              <p className="font-bold font-mono text-sm leading-none">{posts.length}</p>
              <p className="text-[10px] text-slate-500 font-light mt-0.5">posts</p>
            </div>
            <div>
              <p className="font-bold font-mono text-sm leading-none">2.4k</p>
              <p className="text-[10px] text-slate-500 font-light mt-0.5">followers</p>
            </div>
            <div>
              <p className="font-bold font-mono text-sm leading-none">186</p>
              <p className="text-[10px] text-slate-500 font-light mt-0.5">following</p>
            </div>
          </div>
        </div>

        {/* Brand Meta info */}
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-slate-100 font-display">Ginza Limited Textiles</h4>
          <span className="text-[10px] uppercase font-semibold text-slate-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">Textile Manufacturer</span>
          <p className="text-slate-300 font-light mt-1.5 leading-relaxed">
            🌿 GRS Certified sustainable warp knits & elastics.<br />
            🌸 Premium laces & warp fabrics since 1986.<br />
            📍 Hall 2, Booth H2-B14, Bharat Tex 2026.
          </p>
          <a
            href={GINZA_INFO.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 font-medium hover:underline flex items-center space-x-1 pt-1"
          >
            <Globe className="w-3 h-3" />
            <span>ginzalimited.com</span>
          </a>
        </div>
      </div>

      {/* Grid Tabs */}
      <div className="border-t border-slate-900 flex justify-around text-slate-500 text-xs mb-3">
        <button className="py-2.5 text-white border-b border-white flex items-center justify-center space-x-1.5 flex-1">
          <Grid className="w-4 h-4" />
          <span className="font-medium text-[10px] uppercase tracking-wider">Posts</span>
        </button>
        <button className="py-2.5 flex items-center justify-center space-x-1.5 flex-1 hover:text-white transition-colors duration-200">
          <Film className="w-4 h-4" />
          <span className="font-medium text-[10px] uppercase tracking-wider">Reels</span>
        </button>
        <button className="py-2.5 flex items-center justify-center space-x-1.5 flex-1 hover:text-white transition-colors duration-200">
          <User className="w-4 h-4" />
          <span className="font-medium text-[10px] uppercase tracking-wider">Tagged</span>
        </button>
      </div>

      {/* 3x3 Photo Grid */}
      <div className="grid grid-cols-3 gap-1 shadow-inner bg-slate-950">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 0.99, filter: 'brightness(1.05)' }}
            onClick={() => setSelectedPost(post)}
            className="aspect-square bg-slate-900 cursor-pointer overflow-hidden relative group"
          >
            <img
              src={post.image}
              alt="Post thumbnail"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            
            {/* Quick hover info overlay (heart + comments) */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-3.5 text-xs text-white">
              <span className="flex items-center space-x-1 font-semibold">
                <Heart className={`w-4 h-4 ${likedPosts[post.id] ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
                <span>{post.likes}</span>
              </span>
              <span className="flex items-center space-x-1 font-semibold">
                <MessageCircle className="w-4 h-4 text-white" />
                <span>{comments[post.id]?.length || 0}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Instagram Post Detail Modal/Lightbox */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Lightbox Instagram Header */}
              <div className="p-3 border-b border-slate-850 flex items-center justify-between bg-slate-900">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[1.5px] flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center font-display font-bold text-[7px] text-pink-400">
                      GZ
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-sans text-slate-100 leading-none">@ginza_limited_textiles</h4>
                    <p className="text-[9px] text-slate-500 mt-0.5">{GINZA_INFO.booth}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Lightbox Post Image */}
              <div className="aspect-square bg-slate-950 relative">
                <img
                  src={selectedPost.image}
                  alt="Expanded Instagram Post"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Engagement icons bar */}
              <div className="p-3 pb-1 flex items-center justify-between border-t border-slate-850 bg-slate-900">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => handleLike(selectedPost.id, e)}
                    className="hover:scale-110 active:scale-95 transition-all text-slate-200 hover:text-rose-500"
                  >
                    <Heart className={`w-5 h-5 ${likedPosts[selectedPost.id] ? 'fill-rose-500 text-rose-500' : 'text-slate-200'}`} />
                  </button>
                  <button className="hover:scale-110 transition-transform text-slate-200 hover:text-pink-500">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
                <button className="text-slate-200 hover:text-amber-500 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              {/* Likes & caption detail container (Scrollable) */}
              <div className="p-3 flex-1 overflow-y-auto space-y-3 text-xs leading-relaxed text-slate-300 bg-slate-900/40">
                <div>
                  <p className="font-bold text-slate-100">{selectedPost.likes} likes</p>
                  <p className="mt-1">
                    <span className="font-bold text-slate-100 mr-1.5">@ginza_limited_textiles</span>
                    <span className="text-slate-300 font-light">{selectedPost.caption}</span>
                  </p>
                  <p className="text-[9px] uppercase text-slate-500 font-mono mt-1 tracking-wider">{selectedPost.date}</p>
                </div>

                {/* Simulated Comment List */}
                <div className="border-t border-slate-850 pt-2.5 space-y-2">
                  <h5 className="font-semibold text-slate-400 text-[10px] uppercase tracking-wider">Comments</h5>
                  {(comments[selectedPost.id] || []).length > 0 ? (
                    (comments[selectedPost.id] || []).map((cmt, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-[11px] leading-tight">
                        <span className="font-bold text-slate-200">visitor_{idx + 22}</span>
                        <span className="text-slate-300 font-light">{cmt}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-[10px] italic">No comments yet. Be the first to say something!</p>
                  )}
                </div>
              </div>

              {/* Quick Input Comment Form */}
              <form
                onSubmit={(e) => handleAddComment(selectedPost.id, e)}
                className="p-2 border-t border-slate-850 bg-slate-900 flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="p-1.5 rounded-lg bg-pink-500 hover:bg-pink-600 disabled:opacity-40 text-white transition-colors duration-200"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
