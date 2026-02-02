import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { personalDetails } from "@/data/portfolioData";
import { usePortfolio } from "@/data/PortfolioContext";
import { Button } from "./ui/button";

const GitHubSection = () => {
  const { currentAccentHex } = usePortfolio();
  const hex = currentAccentHex();
  
  // Robust username extraction from any github URL format
  const username = personalDetails.github.replace(/\/$/, '').split("/").pop();

  return (
    <section id="github" className="py-20 bg-secondary/10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
          >
            <Github className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-center"
          >
            GitHub <span className="text-primary tracking-tighter">Activity</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground text-center max-w-2xl font-light mb-8"
          >
            A real-time snapshot of my open-source contributions, most used languages, and development streak.
          </motion.p>

          <Button variant="outline" className="rounded-full border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary group" asChild>
            <a href={personalDetails.github} target="_blank" rel="noreferrer">
              Follow on GitHub
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-1 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent"
          >
            <div className="bg-card h-full rounded-[22px] p-6 flex flex-col items-center justify-center border border-white/5 backdrop-blur-xl min-h-[200px]">
              <img 
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&title_color=${hex}&text_color=ffffff&icon_color=${hex}&hide_border=true&include_all_commits=true&count_private=true`} 
                alt="GitHub Stats"
                className="w-full max-w-md h-auto"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          </motion.div>

          {/* Languages Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-1 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent"
          >
            <div className="bg-card h-full rounded-[22px] p-6 flex flex-col items-center justify-center border border-white/5 backdrop-blur-xl min-h-[200px]">
               <img 
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&title_color=${hex}&text_color=ffffff&icon_color=${hex}&hide_border=true&langs_count=8`} 
                alt="Top Languages"
                className="w-full max-w-md h-auto"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 p-1 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent"
          >
            <div className="bg-card h-full rounded-[22px] p-6 flex flex-col items-center justify-center border border-white/5 backdrop-blur-xl min-h-[160px]">
               <img 
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&stroke=${hex}&fire=${hex}&ring=${hex}&currStreakLabel=${hex}&sideNums=ffffff&sideLabels=ffffff&dates=ffffff&hide_border=true`} 
                alt="GitHub Streak"
                className="w-full max-w-3xl h-auto"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
