import { motion } from "framer-motion";
import { usePortfolio } from "@/data/PortfolioContext";
import { Play } from "lucide-react";

const VideoIntroSection = () => {
  const { videoUrl } = usePortfolio();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Video <span className="text-primary">Introduction</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            A brief overview of my passion for AI development and software engineering.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/5 bg-secondary/20 aspect-video"
        >
          <iframe
            className="w-full h-full"
            src={videoUrl}
            title="Video Intro"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/5 text-[10px] font-bold text-primary uppercase tracking-widest shadow-xl">
              <Play className="w-3 h-3 fill-primary" />
              Intro Video
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoIntroSection;
