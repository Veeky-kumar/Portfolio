import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy, Medal, ExternalLink } from "lucide-react";
import { initialAchievements } from "@/data/portfolioData";

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-24 bg-[#0a0a0c] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
          >
            <Trophy className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-center"
          >
            Honors & <span className="text-primary tracking-tighter">Certifications</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {initialAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/0 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-card border border-white/5 rounded-3xl overflow-hidden p-6 hover:border-primary/20 transition-colors h-full flex flex-col">
                <div className="relative aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-black/40">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    {achievement.link && (
                      <a 
                        href={achievement.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-bold text-white bg-primary/80 px-4 py-2 rounded-full backdrop-blur-sm"
                      >
                        Verify Credential <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-primary/80 mb-2 uppercase text-[10px] font-black tracking-widest">
                    {achievement.category === 'hackathon' ? <Trophy className="w-3 h-3" /> : <Award className="w-3 h-3" />}
                    {achievement.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{achievement.title}</h3>
                  <div className="flex items-center justify-between text-muted-foreground text-sm font-light">
                    <span>{achievement.issuer}</span>
                    <span className="text-xs">{achievement.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
