import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy, Medal, ExternalLink } from "lucide-react";
import { usePortfolio } from "@/data/PortfolioContext";

const AchievementsSection = () => {
  const { achievements } = usePortfolio();

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

        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative w-full md:w-[calc(50%-1rem)] lg:w-[calc(50%-2rem)]"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/0 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-card border border-white/5 rounded-3xl overflow-hidden p-6 hover:border-primary/20 transition-colors h-full flex flex-col">
                <div className="relative aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-[#111113] border border-white/10 flex items-center justify-center p-2 shadow-2xl">
                  {/* Backdrop Award Icon */}
                  <Award className="absolute text-primary/5 w-24 h-24 rotate-12" />
                  
                  <img 
                    src={achievement.image && !achievement.image.includes('/view') ? achievement.image : "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"} 
                    alt={achievement.title}
                    className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (!img.src.includes('images.unsplash.com')) {
                        img.src = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800";
                      }
                    }}
                  />
                  
                  <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-2">
                    {achievement.image?.includes('drive.google.com') && (
                      <a 
                        href={achievement.image} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-[9px] font-bold text-white bg-blue-600 px-3 py-1.5 rounded-full shadow-lg hover:bg-blue-500 transition-all active:scale-95"
                      >
                        View PDF <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                    {achievement.link && (
                      <a 
                        href={achievement.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-[9px] font-bold text-white bg-primary px-3 py-1.5 rounded-full shadow-lg shadow-primary/20 hover:brightness-110 transition-all active:scale-95"
                      >
                        Verify <ExternalLink className="w-2.5 h-2.5" />
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
                  {achievement.description && (
                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {achievement.description}
                    </p>
                  )}
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
