import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { experience } from "@/data/portfolioData";

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Experience
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Professional work experience
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative pl-6 sm:pl-8 border-l-2 border-primary/30 pb-8 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary -translate-x-[7px] sm:-translate-x-[9px]" />

              <div className="glass-card rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-medium text-sm sm:text-base">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground text-xs sm:text-sm flex-shrink-0">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-muted-foreground text-xs sm:text-sm"
                    >
                      <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
