import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative z-10 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">تواصل معي</h2>
            <div className="h-[1px] w-16 bg-gold-500 mx-auto mb-6" />
            <p className="text-gray-400 font-light">للمشاريع الحصرية والتعاون الإبداعي</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 justify-center">
             <motion.a 
                href="mailto:soo729367@gmail.com"
                whileHover={{ y: -5 }}
                className="flex items-center justify-center gap-6 p-8 bg-neutral-900/50 border border-white/5 rounded-sm hover:border-gold-500/30 transition-all group"
             >
                <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-colors duration-300">
                  <Mail size={28} />
                </div>
                <div className="text-right">
                   <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">البريد الإلكتروني</p>
                   <p className="text-lg md:text-xl text-white font-display group-hover:text-gold-400 transition-colors dir-ltr">soo729367@gmail.com</p>
                </div>
             </motion.a>

             <motion.a 
                href="https://wa.me/201142417759"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -5 }}
                className="flex items-center justify-center gap-6 p-8 bg-neutral-900/50 border border-white/5 rounded-sm hover:border-gold-500/30 transition-all group"
             >
                <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-colors duration-300">
                  <MessageCircle size={28} />
                </div>
                <div className="text-right">
                   <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">واتساب</p>
                   <p className="text-lg md:text-xl text-white font-display group-hover:text-gold-400 transition-colors dir-ltr">01142417759</p>
                </div>
             </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};