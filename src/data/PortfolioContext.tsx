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
import { db } from "@/lib/firebase";
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  query,
  collectionGroup
} from "firebase/firestore";

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
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [videoUrl, setVideoUrl] = useState(personalDetails.videoIntroUrl);
  const [resumeUrl, setResumeUrl] = useState(personalDetails.resumePath);
  const [resumeDownloadUrl, setResumeDownloadUrl] = useState("");
  const [categories, setCategories] = useState<{ key: string; label: string }[]>(Array.from(skillCategories));
  const [showVideo, setShowVideo] = useState(true);
  const [accentColor, setAccentColor] = useState("17 100% 55%");

  useEffect(() => {
    // 1. Sync Settings (Video, Resume, Accent)
    const settingsDoc = doc(db, "settings", "global");
    const unsubSettings = onSnapshot(settingsDoc, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.videoUrl) setVideoUrl(data.videoUrl);
        if (data.resumeUrl) setResumeUrl(data.resumeUrl);
        if (data.resumeDownloadUrl) setResumeDownloadUrl(data.resumeDownloadUrl);
        if (data.accentColor) {
          setAccentColor(data.accentColor);
          document.documentElement.style.setProperty('--primary', data.accentColor);
        }
        if (data.showVideo !== undefined) setShowVideo(data.showVideo);
      } else {
        // Initialize if not exists
        setDoc(settingsDoc, {
          videoUrl: personalDetails.videoIntroUrl,
          resumeUrl: personalDetails.resumePath,
          resumeDownloadUrl: "",
          accentColor: "17 100% 55%",
          showVideo: true
        });
      }
    });

    // 2. Sync Projects
    const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
      if (!snapshot.empty) {
        setProjects(snapshot.docs.map(d => d.data() as Project));
      } else {
        // Migration: Upload initial data if empty
        initialProjects.forEach(p => setDoc(doc(db, "projects", p.id), p));
      }
    });

    // 3. Sync Skills
    const unsubSkills = onSnapshot(collection(db, "skills"), (snapshot) => {
      if (!snapshot.empty) {
        setSkills(snapshot.docs.map(d => d.data() as Skill));
      } else {
        initialSkills.forEach(s => setDoc(doc(db, "skills", s.name), s));
      }
    });

    // 4. Sync Achievements
    const unsubAchievements = onSnapshot(collection(db, "achievements"), (snapshot) => {
      if (!snapshot.empty) {
        setAchievements(snapshot.docs.map(d => d.data() as Achievement));
      } else {
        initialAchievements.forEach(a => setDoc(doc(db, "achievements", a.id), a));
      }
    });

    // 5. Sync Categories
    const unsubCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
      if (!snapshot.empty) {
        setCategories(snapshot.docs.map(d => d.data() as { key: string; label: string }));
      } else {
        skillCategories.forEach(c => setDoc(doc(db, "categories", c.key), c));
      }
    });

    return () => {
      unsubSettings();
      unsubProjects();
      unsubSkills();
      unsubAchievements();
      unsubCategories();
    };
  }, []);

  const addProject = async (project: Project) => {
    await setDoc(doc(db, "projects", project.id), project);
  };

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
  };

  const updateProject = async (updatedProject: Project) => {
    await setDoc(doc(db, "projects", updatedProject.id), updatedProject);
  };

  const addSkill = async (skill: Skill) => {
    await setDoc(doc(db, "skills", skill.name), skill);
  };

  const deleteSkill = async (name: string) => {
    await deleteDoc(doc(db, "skills", name));
  };

  const addAchievement = async (achievement: Achievement) => {
    await setDoc(doc(db, "achievements", achievement.id), achievement);
  };

  const deleteAchievement = async (id: string) => {
    await deleteDoc(doc(db, "achievements", id));
  };

  const updateAchievement = async (updatedAchievement: Achievement) => {
    await setDoc(doc(db, "achievements", updatedAchievement.id), updatedAchievement);
  };

  const updateVideoUrl = async (url: string) => {
    let finalUrl = url;
    if (url.includes("watch?v=")) {
      finalUrl = url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      finalUrl = url.replace("youtu.be/", "youtube.com/embed/");
    }
    await updateDoc(doc(db, "settings", "global"), { videoUrl: finalUrl });
  };

  const updateResumeLinks = async (url: string, downloadUrl: string) => {
    await updateDoc(doc(db, "settings", "global"), { 
      resumeUrl: url, 
      resumeDownloadUrl: downloadUrl 
    });
  };

  const addCategory = async (category: { key: string; label: string }) => {
    await setDoc(doc(db, "categories", category.key), category);
  };

  const updateAccentColor = async (color: string) => {
    await updateDoc(doc(db, "settings", "global"), { accentColor: color });
  };

  const updateShowVideo = async (show: boolean) => {
    await updateDoc(doc(db, "settings", "global"), { showVideo: show });
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
      setShowVideo: updateShowVideo,
      addCategory,
      accentColor,
      setAccentColor: updateAccentColor,
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
