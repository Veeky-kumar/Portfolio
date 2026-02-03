import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Project, 
  Skill, 
  Achievement,
  initialProjects, 
  initialSkills, 
  initialAchievements,
  personalDetails,
  skillCategories
} from "./portfolioData";

interface PortfolioContextType {
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
  videoUrl: string;
  resumeUrl: string;
  resumeDownloadUrl: string;
  showVideo: boolean;
  categories: { key: string; label: string }[];
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateProject: (project: Project) => void;
  addSkill: (skill: Skill) => void;
  deleteSkill: (name: string) => void;
  addAchievement: (achievement: Achievement) => void;
  deleteAchievement: (id: string) => void;
  updateAchievement: (achievement: Achievement) => void;
  updateVideoUrl: (url: string) => void;
  updateResumeLinks: (url: string, downloadUrl: string) => void;
  setShowVideo: (show: boolean) => void;
  addCategory: (category: { key: string; label: string }) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  currentAccentHex: () => string;
}

export const accentColors = [
  { name: "Orange", value: "17 100% 55%", hex: "ff5722" },
  { name: "Cyber Blue", value: "199 89% 48%", hex: "0ea5e9" },
  { name: "Emerald Green", value: "142 70% 45%", hex: "10b981" },
  { name: "Neon Purple", value: "270 91% 65%", hex: "a855f7" },
  { name: "Crimson", value: "346 84% 61%", hex: "f43f5e" },
];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("portfolio_projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem("portfolio_skills");
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem("portfolio_achievements");
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [videoUrl, setVideoUrl] = useState(() => {
    return localStorage.getItem("portfolio_video_url") || personalDetails.videoIntroUrl;
  });

  const [resumeUrl, setResumeUrl] = useState(() => {
    return localStorage.getItem("portfolio_resume_url") || personalDetails.resumePath;
  });

  const [resumeDownloadUrl, setResumeDownloadUrl] = useState(() => {
    return localStorage.getItem("portfolio_resume_download_url") || "";
  });

  const [categories, setCategories] = useState<{ key: string; label: string }[]>(() => {
    const saved = localStorage.getItem("portfolio_categories");
    return saved ? JSON.parse(saved) : Array.from(skillCategories);
  });

  const [showVideo, setShowVideo] = useState(() => {
    const saved = localStorage.getItem("portfolio_show_video");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem("portfolio_accent_color") || "17 100% 55%";
  });

  useEffect(() => {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("portfolio_skills", JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem("portfolio_achievements", JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem("portfolio_video_url", videoUrl);
  }, [videoUrl]);

  useEffect(() => {
    localStorage.setItem("portfolio_resume_url", resumeUrl);
  }, [resumeUrl]);

  useEffect(() => {
    localStorage.setItem("portfolio_resume_download_url", resumeDownloadUrl);
  }, [resumeDownloadUrl]);

  useEffect(() => {
    localStorage.setItem("portfolio_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("portfolio_show_video", JSON.stringify(showVideo));
  }, [showVideo]);

  useEffect(() => {
    localStorage.setItem("portfolio_accent_color", accentColor);
    document.documentElement.style.setProperty('--primary', accentColor);
  }, [accentColor]);

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter(p => p.id !== id));
  };

  const updateProject = (updatedProject: Project) => {
    setProjects((prev) => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const addSkill = (skill: Skill) => {
    // Prevent duplicates
    setSkills((prev) => prev.some(s => s.name === skill.name) ? prev : [...prev, skill]);
  };

  const deleteSkill = (name: string) => {
    setSkills((prev) => prev.filter(s => s.name !== name));
  };

  const addAchievement = (achievement: Achievement) => {
    setAchievements((prev) => [achievement, ...prev]);
  };

  const deleteAchievement = (id: string) => {
    setAchievements((prev) => prev.filter(a => a.id !== id));
  };

  const updateAchievement = (updatedAchievement: Achievement) => {
    setAchievements((prev) => prev.map(a => a.id === updatedAchievement.id ? updatedAchievement : a));
  };

  const updateVideoUrl = (url: string) => {
    // Convert watch URL to embed URL if needed
    let finalUrl = url;
    if (url.includes("watch?v=")) {
      finalUrl = url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      finalUrl = url.replace("youtu.be/", "youtube.com/embed/");
    }
    setVideoUrl(finalUrl);
  };

  const updateResumeLinks = (url: string, downloadUrl: string) => {
    setResumeUrl(url);
    setResumeDownloadUrl(downloadUrl);
  };

  const addCategory = (category: { key: string; label: string }) => {
    setCategories(prev => {
      if (prev.some(c => c.key === category.key)) return prev;
      return [...prev, category];
    });
  };

  return (
    <PortfolioContext.Provider value={{ 
      projects, 
      skills, 
      achievements,
      videoUrl, 
      resumeUrl,
      resumeDownloadUrl,
      showVideo, 
      categories,
      addProject, 
      deleteProject, 
      updateProject,
      addSkill, 
      deleteSkill, 
      addAchievement,
      deleteAchievement,
      updateAchievement,
      updateVideoUrl,
      updateResumeLinks,
      setShowVideo,
      addCategory,
      accentColor,
      setAccentColor,
      currentAccentHex: () => accentColors.find(c => c.value === accentColor)?.hex || "ff5722"
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
