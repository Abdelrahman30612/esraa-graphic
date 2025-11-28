import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Layers, PenTool } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden bg-black">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center z-10">
        
        {/* Subtle Floating Gold Icons */}
        <div className="absolute inset-0 pointer-events-none">
             <motion.div 
               animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
               className="absolute top-1/3 left-[15%] text-gold-500/20"
             >
               <Layers size={80} strokeWidth={1} />
             </motion.div>
             <motion.div 
               animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} 
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
               className="absolute bottom-1/3 right-[15%] text-gold-500/20"
             >
               <PenTool size={80} strokeWidth={1} />
             </motion.div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <h2 className="text-sm md:text-base text-gold-300 font-bold tracking-[0.4em] mb-6 uppercase border-b border-gold-500/30 inline-block pb-2">
            فخامة التصميم الرقمي
          </h2>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-medium mb-10 leading-tight font-display">
            <span className="block text-white drop-shadow-lg">
              مرحباً بك في
            </span>
            <span className="block bg-clip-text text-transparent bg-gold-gradient text-glow-gold mt-2 font-bold animate-shine bg-[length:200%_auto]">
              عالم الفخامة
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-14 leading-relaxed font-light">
            حيث يلتقي الفن بالدقة. نحول الأفكار إلى تحف بصرية باستخدام لمسات من الذهب والظل لإنشاء هوية لا تُنسى.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <motion.a
              href="#portfolio"
              onClick={(e) => handleScrollTo(e, 'portfolio')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-10 py-4 bg-gold-500 text-black font-bold text-lg rounded-sm overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-all"
            >
              <span className="relative z-10 tracking-wider">استكشف أعمالي</span>
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="#contact"
              onClick={(e) => handleScrollTo(e, 'contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 glass-panel text-gold-100 font-bold text-lg rounded-sm border border-gold-500/30 hover:bg-gold-500/10 transition-colors tracking-wider"
            >
              تواصل معي
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-500/50"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};