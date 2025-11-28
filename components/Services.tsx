import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../types';
import { PenTool, Layers, Monitor, Palette } from 'lucide-react';
import { useSheetData, SHEET_URLS, DEFAULT_SERVICES } from '../utils/dataManager';

const getIcon = (iconName: string) => {
  // Normalize string to handle potential whitespace or case issues from CSV
  const name = iconName?.toLowerCase().trim();
  
  switch (name) {
    case 'pen': return <PenTool size={32} strokeWidth={1.5} />;
    case 'monitor': return <Monitor size={32} strokeWidth={1.5} />;
    case 'layers': return <Layers size={32} strokeWidth={1.5} />;
    case 'palette': return <Palette size={32} strokeWidth={1.5} />;
    default: return <PenTool size={32} strokeWidth={1.5} />;
  }
};

export const Services: React.FC = () => {
  // Fetch services from Sheet
  const services = useSheetData<Service>(SHEET_URLS.services, DEFAULT_SERVICES);

  return (
    <section id="services" className="py-24 relative z-10 bg-gradient-to-b from-black to-neutral-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gold-gradient mb-6"
          >
            خدماتي
          </motion.h2>
          <p className="text-gray-400 text-lg font-light tracking-wide">التميز في كل تفصيل</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                transition: { type: "tween", ease: "easeOut", duration: 0.3 } 
              }}
              className="group h-full"
            >
              <div className="h-full bg-neutral-900/50 p-8 rounded-sm border border-white/5 hover:border-gold-500/40 transition-colors duration-500 flex flex-col items-center text-center relative overflow-hidden">
                
                {/* Top Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon Container */}
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-gold-500 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full duration-500"></div>
                  <div className="relative w-16 h-16 rounded-full border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:text-white group-hover:bg-gold-600 transition-all duration-300 shadow-[0_0_0_4px_rgba(212,175,55,0.05)]">
                    {getIcon(service.icon)}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold-300 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-400 transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};