import { motion } from "framer-motion";
import { ArrowDown, FileText, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalDetails } from "@/data/portfolioData";
import profilePhoto from "@/assets/profile-photo.png";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Decorative chevrons */}
      <div className="absolute left-4 sm:left-8 top-1/3 text-muted-foreground/20">
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none" className="w-8 h-12 sm:w-10 sm:h-16">
          <path d="M30 10L10 30L30 50" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute right-4 sm:right-8 bottom-1/3 text-muted-foreground/20">
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none" className="w-8 h-12 sm:w-10 sm:h-16">
          <path d="M10 10L30 30L10 50" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-base sm:text-lg mb-2"
            >
              Hello<span className="text-primary">.</span>
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
            >
              I'm <span className="text-foreground">Veeky Kumar</span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-4 sm:mb-6"
            >
              Software Developer
              <br />
              <span className="text-muted-foreground text-lg sm:text-xl md:text-2xl">AI / Generative AI Engineer</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0"
            >
              M.Tech (Generative AI) @ NIT Jalandhar
              <br />
              Building LLM-powered systems, RAG pipelines, and scalable AI applications
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                asChild 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a href="#contact">
                  Got a project?
                  <ArrowDown className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-border hover:bg-secondary"
              >
                <a href={personalDetails.resumePath} target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  My Resume
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <a
                href={personalDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalDetails.email}`}
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Glowing ring behind image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-orange-400 blur-2xl opacity-40 scale-90" />
              <div className="absolute inset-4 sm:inset-8 rounded-full border-2 border-primary/30 glow-ring" />
              
              <img
                src={profilePhoto}
                alt="Veeky Kumar"
                className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] object-cover object-top rounded-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 sm:mt-16 lg:mt-20 pt-8 border-t border-border"
        >
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-muted-foreground text-xs sm:text-sm">
            {["Python", "TypeScript", "React", "FastAPI", "LLMs", "RAG", "Docker"].map((tech) => (
              <span key={tech} className="hover:text-foreground transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
