import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import VideoIntroSection from "@/components/VideoIntroSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AdminPanel from "@/components/AdminPanel";
import AchievementsSection from "@/components/AchievementsSection";
import ThemeCustomizer from "@/components/ThemeCustomizer";

import { usePortfolio } from "@/data/PortfolioContext";

const Index = () => {
  const { showVideo } = usePortfolio();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        {showVideo && <VideoIntroSection />}
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
      <ThemeCustomizer />
      <AdminPanel />
    </div>
  );
};

export default Index;
