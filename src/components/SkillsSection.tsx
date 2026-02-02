import { motion } from "framer-motion";
import { usePortfolio } from "@/data/PortfolioContext";
import { skillCategories } from "@/data/portfolioData";
import { 
  Code2, 
  BrainCircuit, 
  Server, 
  Layout, 
  Wrench,
  Sparkles
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const categoryIcons: Record<string, any> = {
  programming: Code2,
  "ai-ml": BrainCircuit,
  backend: Server,
  frontend: Layout,
  devops: Wrench,
};

const SkillsSection = () => {
  const { skills } = usePortfolio();
  
  const getSkillsByCategory = (category: string) => {
    return skills.filter((skill) => skill.category === (category as any));
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background">
      {/* Decorative background flare */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Tech Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Specialized <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            I leverage a diverse set of modern technologies to build intelligent, scalable, and user-centric applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TooltipProvider delayDuration={100}>
            {skillCategories.map((category, categoryIndex) => {
              const Icon = categoryIcons[category.key] || Code2;
              
              return (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-2xl bg-secondary/20 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">
                      {category.label}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {getSkillsByCategory(category.key).map((skill, skillIndex) => (
                      <Tooltip key={skill.name}>
                        <TooltipTrigger asChild>
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                            className="px-4 py-2 bg-background border border-border/50 rounded-full text-sm font-medium hover:border-primary/50 hover:text-primary transition-all cursor-default"
                          >
                            {skill.name}
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-popover border-border">
                          <p>Professional proficiency in {skill.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
