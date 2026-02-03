import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalDetails } from "@/data/portfolioData";
import { usePortfolio } from "@/data/PortfolioContext";
import profilePhoto from "@/assets/profile-photo.png";
import Typewriter from "@/components/ui/Typewriter";

const FloatingShape = ({ delay = 0, initialX = 0, initialY = 0, size = 40 }) => (
  <motion.div
    initial={{ x: initialX, y: initialY, rotate: 0, opacity: 0 }}
    animate={{ 
      y: [initialY - 20, initialY + 20, initialY - 20],
      rotate: [0, 90, 180, 270, 360],
      opacity: [0.1, 0.3, 0.1]
    }}
    transition={{ 
      duration: 10 + Math.random() * 5, 
      repeat: Infinity, 
      delay,
      ease: "linear"
    }}
    style={{ left: initialX, top: initialY, width: size, height: size }}
    className="absolute border border-primary/20 rounded-lg pointer-events-none z-0"
  />
);

const Particle = ({ mouseX, mouseY }: { mouseX: any; mouseY: any }) => {
  const particles = Array.from({ length: 15 });
  return (
    <>
      {particles.map((_, i) => {
        const x = useSpring(useTransform(mouseX, (v: number) => v * (1 + i * 0.1) + (Math.random() - 0.5) * 50), { stiffness: 50 + i * 2, damping: 20 });
        const y = useSpring(useTransform(mouseY, (v: number) => v * (1 + i * 0.1) + (Math.random() - 0.5) * 50), { stiffness: 50 + i * 2, damping: 20 });
        
        return (
          <motion.div
            key={i}
            style={{ x, y, left: "50%", top: "50%" }}
            className="absolute w-1 h-1 bg-primary/40 rounded-full blur-[1px] pointer-events-none z-0"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
            }}
          />
        );
      })}
    </>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { resumeUrl, resumeDownloadUrl } = usePortfolio();
  
  const yScroll = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityScroll = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleScroll = useTransform(scrollY, [0, 300], [1, 0.8]);

  const mouseX = useSpring(0, { stiffness: 40, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 15 });
  
  // 3D Tilt for image
  const rotateX = useTransform(mouseY, [-50, 50], [10, -10]);
  const rotateY = useTransform(mouseX, [-50, 50], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 100);
      mouseY.set((clientY / innerHeight - 0.5) * 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center relative pt-20 bg-[#0a0a0c] overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,87,34,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px' 
          }} 
        />
        
        <div className="absolute inset-x-0 top-0 h-full bg-noise opacity-[0.03]" />
        
        {/* Interactive Particles */}
        <Particle mouseX={mouseX} mouseY={mouseY} />
        
        {/* Floating Shapes - Strictly constrained */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingShape initialX={100} initialY={200} size={60} delay={0} />
          <FloatingShape initialX={800} initialY={100} size={40} delay={2} />
          <FloatingShape initialX={1200} initialY={600} size={80} delay={1} />
          <FloatingShape initialX={200} initialY={700} size={30} delay={3} />
          <FloatingShape initialX={400} initialY={300} size={50} delay={1.5} />
        </div>

        {/* Animated Glow Rings */}
        <motion.div
          style={{ x: mouseX, y: mouseY, left: "50%", top: "50%" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] mix-blend-screen"
        />
        <motion.div
          style={{ 
            x: useSpring(useTransform(mouseX, x => x * 1.5), { stiffness: 60, damping: 25 }), 
            y: useSpring(useTransform(mouseY, y => y * 1.5), { stiffness: 60, damping: 25 }),
            left: "50%",
            top: "50%"
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/20 blur-[80px] mix-blend-overlay"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-primary/5 blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div style={{ y: yScroll, opacity: opacityScroll, scale: scaleScroll }} className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase"
              >
                <Sparkles className="w-3 h-3" />
                Specializing in GEN-AI
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tighter"
              >
                I'm <span className="text-gradient">Veeky Kumar</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl md:text-3xl text-muted-foreground font-light h-[1.5em]"
              >
                <Typewriter
                  words={[
                    "Software Developer",
                    "AI Engineer (Generative AI)",
                    "Full Stack Developer",
                  ]}
                  typingSpeed={100}
                  deletingSpeed={50}
                  delayBetweenWords={2000}
                />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed font-light"
            >
              Building high-performance AI systems and modern web experiences. 
              Currently exploring the frontiers of <span className="text-foreground font-medium">Large Language Models</span> and <span className="text-foreground font-medium">Generative AI</span> at NIT Jalandhar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 group" asChild>
                <a href="#projects">
                  Explore Work
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary px-8" asChild>
                <a 
                  href={resumeDownloadUrl || resumeUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  download="VeekyKumar_Resume.pdf"
                >
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="relative flex justify-center lg:justify-end py-10 lg:py-0"
          >
            {/* Wrapper container with enough margin to prevent clipping our effects */}
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] lg:mr-10">
              {/* Profile Ring (Halo) - Main glow */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 rounded-full border-[6px] border-primary/60 shadow-[0_0_100px_rgba(255,87,34,0.4)] z-10"
              />
              
              {/* Secondary outer glow */}
              <motion.div
                animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[-10%] rounded-full bg-primary/10 blur-[80px] z-0"
              />

              {/* Profile Image Container */}
              <div className="absolute inset-[5%] rounded-full overflow-hidden bg-secondary/30 backdrop-blur-sm border border-white/10 shadow-2xl z-20">
                <img
                  src={profilePhoto}
                  alt="Veeky Kumar"
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-110"
                />
              </div>

              {/* Rotating Dashed Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-12%] border border-dashed border-primary/20 rounded-full pointer-events-none z-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
