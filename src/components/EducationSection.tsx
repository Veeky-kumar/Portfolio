import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { education } from "@/data/portfolioData";
import nitjCampus from "@/assets/nitj-campus.png";
import cuCampus from "@/assets/chandigarh-university.png";

const backgroundImages: Record<string, string> = {
  "nitj-campus": nitjCampus,
  "chandigarh-university": cuCampus,
};

const EducationSection = () => {
  return (
    <section id="education" className="py-16 sm:py-20 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Education
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Academic foundation in Computer Science and Artificial Intelligence
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden"
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImages[edu.backgroundImage]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />

              {/* Content */}
              <div className="relative z-10 p-5 sm:p-6 md:p-8 lg:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                          {edu.institution}
                        </h3>
                      </div>
                    </div>

                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-primary mb-2">
                      {edu.degree} in {edu.field}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-muted-foreground text-xs sm:text-sm mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {edu.location}
                      </span>
                      {edu.cgpa && (
                        <span className="text-primary font-medium">
                          CGPA: {edu.cgpa}
                        </span>
                      )}
                    </div>

                    {edu.highlights && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {edu.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-2 sm:px-3 py-1 bg-secondary/80 rounded-full text-xs text-muted-foreground"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
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

export default EducationSection;
