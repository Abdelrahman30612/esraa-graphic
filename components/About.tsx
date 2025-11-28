import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';
import { useSheetData, SHEET_URLS, DEFAULT_SKILLS } from '../utils/dataManager';

export const About: React.FC = () => {
  // Fetch skills from Sheet
  const skills = useSheetData<Skill>(SHEET_URLS.skills, DEFAULT_SKILLS);

  return (
    <section id="about" className="py-24 relative z-10 overflow-hidden bg-black">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white font-display">
              من <span className="text-gold-500">أنا؟</span>
            </h2>
            <div className="w-20 h-[2px] bg-gold-600 mb-8 mx-auto" />
            
            <p className="text-lg text-gray-400 leading-9 font-light max-w-2xl mx-auto">
              أنا لست مجرد مصمم، بل شريكك الاستراتيجي في التواصل البصري. أساعد العلامات التجارية على تجاوز ضوضاء السوق من خلال صياغة رسائل بصرية قوية ومدروسة. أؤمن أن التصميم الفعال هو مزيج من الجمالية الهادفة والتحليل العميق، وهو قادر على تحويل الأفكار المعقدة إلى قصص بصرية لا تُنسى تحقق أهداف العمل
            </p>
          </div>

          {/* Gold Skill Bars */}
          <div className="space-y-8">
            {skills.map((skill, index) => (
              <div key={skill.name || index}>
                <div className="flex justify-between mb-3 text-sm font-medium tracking-wider text-gray-400">
                  <span>{skill.name}</span>
                  <span className="text-gold-400">{skill.level}%</span>
                </div>
                {/* Background bar */}
                <div className="h-[2px] w-full bg-white/10 relative">
                  {/* Gold Progress Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
                    className="h-full absolute top-0 left-0 bg-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                    style={{ backgroundColor: skill.color || '#D4AF37' }}
                  />
                  {/* Dot at end */}
                  <motion.div 
                    initial={{ left: 0, opacity: 0 }}
                    whileInView={{ left: `${skill.level}%`, opacity: 1 }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_5px_#D4AF37]"
                    style={{ backgroundColor: skill.color || '#D4AF37' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};