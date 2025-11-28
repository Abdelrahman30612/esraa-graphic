import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink, X, Maximize, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useSheetData, SHEET_URLS, DEFAULT_PROJECTS } from '../utils/dataManager';

export const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [scale, setScale] = useState(1);
  const constraintsRef = useRef(null);
  
  // Fetch main projects data (Cover, Title, Description)
  const projects = useSheetData<Project>(SHEET_URLS.portfolio, DEFAULT_PROJECTS);
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Handle closing everything
  const handleClose = () => {
    setSelectedProject(null);
    setIsFullScreen(false);
    setScale(1);
  };

  // Reset zoom when closing fullscreen
  useEffect(() => {
    if (!isFullScreen) setScale(1);
  }, [isFullScreen]);

  // Zoom handlers
  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(prev => Math.max(prev - 0.5, 1));
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.deltaY < 0) {
      setScale(prev => Math.min(prev + 0.2, 4));
    } else {
      setScale(prev => Math.max(prev - 0.2, 1));
    }
  };

  // Helper to fix protocol-relative URLs
  const normalizeUrl = (url: string | undefined) => {
    if (!url) return '';
    const cleanUrl = url.trim();
    if (cleanUrl.startsWith('//')) {
      return `https:${cleanUrl}`;
    }
    return cleanUrl;
  };

  return (
    <section id="portfolio" className="py-24 relative z-10 bg-black">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gold-gradient"
          >
            معرض الأعمال
          </motion.h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 perspective-1000">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02, 
                y: -10
              }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="glass-panel p-[1px] rounded-lg h-full transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] bg-gradient-to-b from-gold-500/20 to-transparent">
                <div className="bg-neutral-900/90 rounded-lg h-full overflow-hidden flex flex-col">
                    <div className="relative overflow-hidden h-64">
                    <img 
                        src={normalizeUrl(project.image)} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    
                    {/* Minimal Category Badge */}
                    <div className="absolute top-4 right-4 bg-black/80 border border-gold-500/30 px-3 py-1 text-gold-300 text-xs tracking-widest uppercase">
                        {project.category}
                    </div>
                    </div>
                    
                    <div className="p-6 relative">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors font-display">
                            {project.title}
                        </h3>
                        <div className="w-10 h-[1px] bg-gold-500/50 mb-4 transition-all group-hover:w-20" />
                        
                        <div className="flex items-center text-gold-500 text-sm gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <span>تفاصيل المشروع</span>
                            <ExternalLink size={14} />
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Luxury Modal - Rendered via Portal to sit on top of everything (including Navbar) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 h-screen w-screen">
              {/* Opaque Background to hide Navbar and content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black"
                onClick={handleClose}
              />
              
              <motion.div
                layoutId={`project-${selectedProject.id}`}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-6xl h-full md:h-[90vh] bg-neutral-900 md:border border-gold-500/30 shadow-[0_0_60px_rgba(212,175,55,0.15)] rounded-none md:rounded-sm flex flex-col overflow-hidden z-[10000]"
              >
                {/* Header with Close & Maximize Buttons aligned */}
                <div className="absolute top-0 left-0 w-full z-50 flex justify-end md:justify-start items-center p-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-none gap-3">
                  <button 
                    onClick={handleClose}
                    className="pointer-events-auto flex items-center gap-2 px-5 py-2 bg-red-900/80 hover:bg-red-700 text-white rounded-full backdrop-blur-md border border-red-500/30 transition-all shadow-lg group"
                  >
                    <X size={20} className="group-hover:rotate-90 transition-transform" />
                    <span className="text-sm font-bold">إغلاق</span>
                  </button>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFullScreen(true);
                    }}
                    className="pointer-events-auto flex items-center justify-center w-10 h-10 bg-black/60 text-white/80 rounded-full backdrop-blur-md border border-white/10 hover:bg-gold-500 hover:text-black transition-all shadow-lg"
                    title="عرض الصورة كاملة"
                  >
                    <Maximize size={20} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 h-full overflow-y-auto md:overflow-hidden">
                  {/* Left Column: Single Image Display */}
                  <div className="h-64 md:h-full border-l border-white/5 relative bg-black flex items-center justify-center overflow-hidden group/image">
                    <img 
                        src={normalizeUrl(selectedProject.image)} 
                        alt={selectedProject.title} 
                        className="w-full h-full object-cover cursor-zoom-in"
                        onClick={() => setIsFullScreen(true)}
                    />
                  </div>
                  
                  {/* Right Column: Text Content */}
                  <div className="p-8 md:p-12 flex flex-col bg-gradient-to-br from-neutral-900 to-black overflow-y-auto">
                    <div className="mt-14 md:mt-16">
                      <span className="text-gold-500 text-xs tracking-[0.2em] uppercase mb-4 block">{selectedProject.category}</span>
                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
                        {selectedProject.title}
                      </h3>
                      <div className="w-20 h-[3px] bg-gold-500 mb-8" />
                      <p className="text-gray-300 leading-8 text-lg font-light text-justify whitespace-pre-line">
                        {selectedProject.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lightbox / Fullscreen Viewer Overlay with Zoom */}
                <AnimatePresence>
                  {isFullScreen && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="fixed inset-0 z-[11000] bg-black/98 flex items-center justify-center overflow-hidden"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFullScreen(false);
                      }}
                      onWheel={handleWheel}
                    >
                      {/* Close Button for Lightbox */}
                      <button 
                        onClick={() => setIsFullScreen(false)}
                        className="absolute top-6 right-6 p-2 bg-neutral-800/50 text-white rounded-full hover:bg-red-600 transition-colors z-50 border border-white/10"
                      >
                        <X size={36} />
                      </button>
                      
                      {/* Zoom Controls */}
                      <div 
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50 bg-neutral-900/80 p-3 rounded-full border border-gold-500/30 backdrop-blur-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                         <button 
                           onClick={handleZoomOut} 
                           className="p-2 text-white hover:text-gold-400 hover:bg-white/10 rounded-full transition-colors"
                           disabled={scale <= 1}
                         >
                           <ZoomOut size={24} />
                         </button>
                         <button 
                           onClick={handleResetZoom} 
                           className="p-2 text-white hover:text-gold-400 hover:bg-white/10 rounded-full transition-colors"
                           title="Reset Zoom"
                         >
                           <RotateCcw size={20} />
                         </button>
                         <button 
                           onClick={handleZoomIn} 
                           className="p-2 text-white hover:text-gold-400 hover:bg-white/10 rounded-full transition-colors"
                           disabled={scale >= 4}
                         >
                           <ZoomIn size={24} />
                         </button>
                      </div>

                      {/* Image Container with Drag Constraints */}
                      <motion.div 
                        ref={constraintsRef}
                        className="w-full h-full flex items-center justify-center cursor-move"
                      >
                        <motion.img 
                          src={normalizeUrl(selectedProject.image)} 
                          alt={selectedProject.title}
                          className="max-w-[95vw] max-h-[95vh] object-contain select-none shadow-2xl"
                          onClick={(e) => e.stopPropagation()} 
                          onDoubleClick={() => setScale(scale > 1 ? 1 : 2)}
                          drag={scale > 1}
                          dragConstraints={constraintsRef}
                          dragElastic={0.1}
                          animate={{ scale: scale }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};