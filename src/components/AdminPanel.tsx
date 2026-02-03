import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Settings2, Trash2, Pencil, LayoutGrid, BrainCircuit, Type, Link as LinkIcon, Image as ImageIcon, Video, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePortfolio } from "@/data/PortfolioContext";
import { Project, Skill, Achievement, skillCategories } from "@/data/portfolioData";
import { Award, Trophy, Medal, ExternalLink, Calendar, User, FileText } from "lucide-react";
import { toast } from "sonner";

const AdminPanel = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [passwordInput, setPasswordInput] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"project" | "skill" | "honors" | "settings">("project");
  
  const { 
    projects, 
    skills, 
    achievements,
    addProject, 
    deleteProject, 
    updateProject,
    addSkill, 
    deleteSkill, 
    addAchievement,
    deleteAchievement,
    updateAchievement,
    updateVideoUrl, 
    videoUrl,
    resumeUrl,
    resumeDownloadUrl,
    updateResumeLinks,
    showVideo,
    setShowVideo,
    categories,
    addCategory
  } = usePortfolio();

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setShowAuthModal(false);
      }
    };
    if (isOpen || showAuthModal) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, showAuthModal]);

  const handleOpenAttempt = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setIsOpen(true);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "veeky2026") {
      setIsAuthenticated(true);
      setShowAuthModal(false);
      setIsOpen(true);
      setPasswordInput("");
      toast.success("Welcome back, Admin!");
    } else {
      toast.error("Incorrect password!");
    }
  };

  // Project Form State
  const [projectForm, setProjectForm] = React.useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    context: "",
    image: "", // Empty for fallback
  });

  const [editingProjectId, setEditingProjectId] = React.useState<string | null>(null);

  // Skill Form State
  const [skillForm, setSkillForm] = React.useState({
    name: "",
    category: categories[0]?.key || "programming",
  });

  // New Category Form State
  const [categoryForm, setCategoryForm] = React.useState({
    key: "",
    label: "",
  });

  // Achievement Form State
  const [achievementForm, setAchievementForm] = React.useState({
    title: "",
    issuer: "",
    date: "",
    description: "",
    image: "",
    link: "",
    category: "certification" as Achievement["category"],
  });

  const [editingAchievementId, setEditingAchievementId] = React.useState<string | null>(null);

  // Settings Form State
  const [newVideoUrl, setNewVideoUrl] = React.useState(videoUrl);
  const [newResumeUrl, setNewResumeUrl] = React.useState(resumeUrl);
  const [newResumeDownloadUrl, setNewResumeDownloadUrl] = React.useState(resumeDownloadUrl);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fallback Image Logic
    const fallbackImage = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800";
    const imageUrl = projectForm.image.trim() || fallbackImage;

    if (editingProjectId) {
      updateProject({
        id: editingProjectId,
        title: projectForm.title,
        description: projectForm.description,
        technologies: projectForm.technologies.split(",").map(t => t.trim()),
        githubUrl: projectForm.githubUrl,
        liveUrl: projectForm.liveUrl,
        context: projectForm.context,
        image: imageUrl,
      });
      setEditingProjectId(null);
      toast.success("Project updated successfully!");
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        title: projectForm.title,
        description: projectForm.description,
        technologies: projectForm.technologies.split(",").map(t => t.trim()),
        githubUrl: projectForm.githubUrl,
        liveUrl: projectForm.liveUrl,
        context: projectForm.context,
        image: imageUrl,
      };
      addProject(newProject);
      toast.success("Project added successfully!");
    }
    setProjectForm({ title: "", description: "", technologies: "", githubUrl: "", liveUrl: "", context: "", image: "" });
  };

  const handleEditClick = (project: Project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      context: project.context || "",
      image: project.image,
    });
    setEditingProjectId(project.id);
  };

  const cancelEdit = () => {
    setEditingProjectId(null);
    setProjectForm({ title: "", description: "", technologies: "", githubUrl: "", liveUrl: "", context: "", image: "" });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const newSkill: Skill = {
      name: skillForm.name,
      category: skillForm.category,
    };
    addSkill(newSkill);
    setSkillForm({ name: "", category: "programming" });
    toast.success("Skill added successfully!");
  };

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateVideoUrl(newVideoUrl);
    updateResumeLinks(newResumeUrl, newResumeDownloadUrl);
    toast.success("Profile settings updated!");
  };

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fallbackImage = "https://images.unsplash.com/photo-1523240715639-93f8fdad4e65?auto=format&fit=crop&q=80&w=800";
    const imageUrl = achievementForm.image.trim() || fallbackImage;

    if (editingAchievementId) {
      updateAchievement({
        id: editingAchievementId,
        title: achievementForm.title,
        issuer: achievementForm.issuer,
        date: achievementForm.date,
        description: achievementForm.description,
        image: imageUrl,
        link: achievementForm.link,
        category: achievementForm.category,
      });
      setEditingAchievementId(null);
      toast.success("Achievement updated successfully!");
    } else {
      const newAchievement: Achievement = {
        id: Date.now().toString(),
        title: achievementForm.title,
        issuer: achievementForm.issuer,
        date: achievementForm.date,
        description: achievementForm.description,
        image: imageUrl,
        link: achievementForm.link,
        category: achievementForm.category,
      };
      addAchievement(newAchievement);
      toast.success("Achievement added successfully!");
    }
    setAchievementForm({ title: "", issuer: "", date: "", description: "", image: "", link: "", category: "certification" });
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setAchievementForm({
      title: achievement.title,
      issuer: achievement.issuer,
      date: achievement.date,
      description: achievement.description || "",
      image: achievement.image,
      link: achievement.link || "",
      category: achievement.category,
    });
    setEditingAchievementId(achievement.id);
  };

  const cancelAchievementEdit = () => {
    setEditingAchievementId(null);
    setAchievementForm({ title: "", issuer: "", date: "", description: "", image: "", link: "", category: "certification" });
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.key || !categoryForm.label) return;
    addCategory({
      key: categoryForm.key.toLowerCase().replace(/\s+/g, '-'),
      label: categoryForm.label
    });
    setCategoryForm({ key: "", label: "" });
    toast.success("Category added successfully!");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpenAttempt}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:shadow-primary/40 transition-shadow"
      >
        <Settings2 className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[350px] bg-card border border-border p-8 rounded-3xl shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Settings2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Admin Access</h3>
              <p className="text-sm text-muted-foreground mb-6">Please enter the administrative password to manage your portfolio.</p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="bg-secondary/50 rounded-xl h-12 text-center text-lg tracking-widest"
                  autoFocus
                />
                <div className="flex gap-3">
                  <Button 
                    type="button"
                    variant="ghost" 
                    onClick={() => setShowAuthModal(false)}
                    className="flex-1 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 rounded-xl bg-primary hover:bg-primary/90 font-bold"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Admin Panel Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[450px] h-[85vh] max-h-[700px] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/20 shrink-0">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-sm">Portfolio Manager</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex p-2 gap-1 bg-secondary/10 shrink-0">
                {(["project", "skill", "honors", "settings"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-1.5 text-[10px] uppercase font-bold rounded-xl transition-all ${
                      activeTab === tab ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 max-h-[60vh]">
                {activeTab === "project" && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] uppercase font-black text-primary tracking-widest">
                        {editingProjectId ? "Edit Project" : "Add New Project"}
                      </h4>
                      {editingProjectId && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={cancelEdit}
                          className="h-6 px-2 rounded-lg text-[10px] font-bold text-destructive hover:bg-destructive/10"
                        >
                          Cancel Edit
                        </Button>
                      )}
                    </div>
                    <form onSubmit={handleAddProject} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Title</label>
                          <Input 
                            placeholder="Title" 
                            value={projectForm.title} 
                            onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                            required
                            className="bg-secondary/30 rounded-xl h-9 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Context</label>
                          <Input 
                            placeholder="e.g. Hackathon" 
                            value={projectForm.context} 
                            onChange={e => setProjectForm({...projectForm, context: e.target.value})}
                            className="bg-secondary/30 rounded-xl h-9 text-xs"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Description</label>
                        <Textarea 
                          placeholder="Project description..." 
                          value={projectForm.description} 
                          onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                          required
                          className="bg-secondary/30 rounded-xl resize-none h-20 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Technologies</label>
                        <Input 
                          placeholder="React, AI, NLP..." 
                          value={projectForm.technologies} 
                          onChange={e => setProjectForm({...projectForm, technologies: e.target.value})}
                          required
                          className="bg-secondary/30 rounded-xl h-9 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Image URL (Optional)</label>
                        <Input 
                          placeholder="https://images.unsplash.com/..." 
                          value={projectForm.image} 
                          onChange={e => setProjectForm({...projectForm, image: e.target.value})}
                          className="bg-secondary/30 rounded-xl h-9 text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input 
                          placeholder="GitHub Link" 
                          value={projectForm.githubUrl} 
                          onChange={e => setProjectForm({...projectForm, githubUrl: e.target.value})}
                          className="bg-secondary/30 rounded-xl h-9 text-xs"
                        />
                        <Input 
                          placeholder="Live Link" 
                          value={projectForm.liveUrl} 
                          onChange={e => setProjectForm({...projectForm, liveUrl: e.target.value})}
                          className="bg-secondary/30 rounded-xl h-9 text-xs"
                        />
                      </div>
                      <Button type="submit" className="w-full rounded-xl bg-primary hover:bg-primary/90 font-bold h-10">
                        {editingProjectId ? <><Pencil className="w-4 h-4 mr-2" /> Update Project</> : <><Plus className="w-4 h-4 mr-2" /> Add Project</>}
                      </Button>
                    </form>

                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <h4 className="text-[10px] uppercase font-black text-primary tracking-widest">Existing Projects</h4>
                      <div className="space-y-2">
                        {projects.map(project => (
                          <div key={project.id} className="flex items-center justify-between p-3 rounded-2xl bg-secondary/20 border border-white/5 group">
                            <span className="text-xs font-medium truncate pr-4">{project.title}</span>
                            <div className="flex gap-1">
                              <button 
                                onClick={() => handleEditClick(project)}
                                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteProject(project.id)}
                                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "skill" && (
                  <div className="space-y-8">
                    <form onSubmit={handleAddSkill} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Skill Name</label>
                          <Input 
                            placeholder="e.g. Rust" 
                            value={skillForm.name} 
                            onChange={e => setSkillForm({...skillForm, name: e.target.value})}
                            required
                            className="bg-secondary/30 rounded-xl h-9 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Category</label>
                          <select 
                            className="w-full bg-secondary/30 rounded-xl border border-input h-9 px-3 text-xs outline-none focus:border-primary transition-colors appearance-none"
                            value={skillForm.category}
                            onChange={e => setSkillForm({...skillForm, category: e.target.value})}
                          >
                            {categories.map(cat => (
                              <option key={cat.key} value={cat.key}>{cat.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <Button type="submit" className="w-full rounded-xl bg-primary hover:bg-primary/90 font-bold h-10">
                        <Plus className="w-4 h-4 mr-2" /> Add Skill
                      </Button>
                    </form>

                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <h4 className="text-[10px] uppercase font-black text-primary tracking-widest">Add New Category</h4>
                      <form onSubmit={handleAddCategory} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <Input 
                            placeholder="Category Key (e.g. cloud)" 
                            value={categoryForm.key} 
                            onChange={e => setCategoryForm({...categoryForm, key: e.target.value})}
                            required
                            className="bg-secondary/30 rounded-xl h-9 text-xs"
                          />
                          <Input 
                            placeholder="Display Label (e.g. Cloud)" 
                            value={categoryForm.label} 
                            onChange={e => setCategoryForm({...categoryForm, label: e.target.value})}
                            required
                            className="bg-secondary/30 rounded-xl h-9 text-xs"
                          />
                        </div>
                        <Button type="submit" variant="outline" className="w-full rounded-xl border-primary/30 text-primary font-bold h-10">
                          <LayoutGrid className="w-4 h-4 mr-2" /> Add Category
                        </Button>
                      </form>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <h4 className="text-[10px] uppercase font-black text-primary tracking-widest">Existing Skills</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {skills.map(skill => (
                          <div key={skill.name} className="flex items-center justify-between pl-3 pr-1 py-1 rounded-xl bg-secondary/20 border border-white/5 group">
                            <span className="text-[10px] font-medium truncate">{skill.name}</span>
                            <button 
                              onClick={() => deleteSkill(skill.name)}
                              className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "honors" && (
                  <div className="space-y-8">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <h4 className="text-[10px] uppercase font-black text-primary tracking-widest">
                        {editingAchievementId ? "Edit Honor" : "Add New Honor/Cert"}
                      </h4>
                      {editingAchievementId && (
                        <button 
                          onClick={cancelAchievementEdit}
                          className="text-[10px] font-bold text-destructive hover:underline"
                        >
                          Cancel Editing
                        </button>
                      )}
                    </div>
                    <form onSubmit={handleAddAchievement} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Title</label>
                        <Input 
                          placeholder="e.g. TensorFlow Developer Certificate" 
                          value={achievementForm.title} 
                          onChange={e => setAchievementForm({...achievementForm, title: e.target.value})}
                          required
                          className="bg-secondary/30 rounded-xl h-9 text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Issuer</label>
                          <Input 
                            placeholder="e.g. Google" 
                            value={achievementForm.issuer} 
                            onChange={e => setAchievementForm({...achievementForm, issuer: e.target.value})}
                            required
                            className="bg-secondary/30 rounded-xl h-9 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Date</label>
                          <Input 
                            placeholder="e.g. 2024" 
                            value={achievementForm.date} 
                            onChange={e => setAchievementForm({...achievementForm, date: e.target.value})}
                            required
                            className="bg-secondary/30 rounded-xl h-9 text-xs"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Category</label>
                          <select 
                            className="w-full bg-secondary/30 rounded-xl border border-input h-9 px-3 text-xs outline-none focus:border-primary transition-colors cursor-pointer"
                            value={achievementForm.category}
                            onChange={e => setAchievementForm({...achievementForm, category: e.target.value as Achievement["category"]})}
                          >
                            <option value="certification">Certification</option>
                            <option value="hackathon">Hackathon</option>
                            <option value="award">Award</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Image/PDF Preview</label>
                          <div className="w-full h-9 rounded-xl border border-white/5 bg-black/20 overflow-hidden flex items-center justify-center">
                            {achievementForm.image ? (
                              achievementForm.image.includes('drive.google.com') ? (
                                <div className="flex items-center gap-2 text-[10px] text-blue-400 font-bold uppercase tracking-tighter">
                                  <Video className="w-3 h-3" /> PDF File
                                </div>
                              ) : (
                                <img 
                                  src={achievementForm.image} 
                                  alt="Preview" 
                                  className="h-full w-full object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              )
                            ) : (
                              <ImageIcon className="w-4 h-4 text-muted-foreground/30" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Description</label>
                        <Textarea 
                          placeholder="Briefly describe this honor..." 
                          value={achievementForm.description} 
                          onChange={e => setAchievementForm({...achievementForm, description: e.target.value})}
                          className="bg-secondary/30 rounded-xl min-h-[60px] text-xs resize-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between ml-1">
                          <label className="text-[10px] uppercase font-bold text-muted-foreground">Image/PDF URL</label>
                          {achievementForm.image && (
                            <a 
                              href={achievementForm.image} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[9px] text-primary hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-2 h-2" /> Open Link
                            </a>
                          )}
                        </div>
                        <Input 
                          placeholder="Paste Direct Image Link or Google Drive PDF Link" 
                          value={achievementForm.image} 
                          onChange={e => setAchievementForm({...achievementForm, image: e.target.value})}
                          className="bg-secondary/30 rounded-xl h-9 text-xs"
                        />
                        <div className="p-3 mt-2 rounded-xl bg-primary/5 border border-primary/10 text-[9px] text-muted-foreground leading-relaxed">
                          <p className="font-bold text-primary mb-1 uppercase tracking-tighter">Support Info:</p>
                          • <span className="text-primary font-bold">Images:</span> Must be direct links (end in .jpg/png/webp). Use <a href="https://postimages.org/" target="_blank" rel="noreferrer" className="text-primary underline font-bold">postimages.org</a> for easy upload (Get the 'Direct Link').<br/>
                          • <span className="text-blue-400 font-bold">PDFs:</span> Paste your Google Drive link here. We'll show a fallback image and add a <span className="text-blue-400">"View PDF"</span> button automatically.
                        </div>
                        {achievementForm.image.startsWith('C:') || achievementForm.image.startsWith('/') ? (
                          <p className="flex items-center gap-1 text-[9px] text-destructive mt-1 font-bold italic">
                            <AlertCircle className="w-3 h-3" /> Browsers CANNOT access your local computer files. You MUST use a web URL.
                          </p>
                        ) : null}
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Verification Link</label>
                        <Input 
                          placeholder="Credential URL" 
                          value={achievementForm.link} 
                          onChange={e => setAchievementForm({...achievementForm, link: e.target.value})}
                          className="bg-secondary/30 rounded-xl h-9 text-xs"
                        />
                      </div>
                      <Button type="submit" className="w-full rounded-xl bg-primary hover:bg-primary/90 font-bold h-10">
                        {editingAchievementId ? <><Pencil className="w-4 h-4 mr-2" /> Update Honor</> : <><Plus className="w-4 h-4 mr-2" /> Add Honor</>}
                      </Button>
                    </form>

                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <h4 className="text-[10px] uppercase font-black text-primary tracking-widest">Existing Achievements</h4>
                      <div className="space-y-2">
                        {achievements.map(achievement => (
                          <div key={achievement.id} className="flex items-center justify-between p-3 rounded-2xl bg-secondary/20 border border-white/5 group">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="w-8 h-8 rounded-lg bg-black/40 flex-shrink-0 overflow-hidden">
                                <img src={achievement.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-[11px] font-bold truncate">{achievement.title}</p>
                                <p className="text-[9px] text-muted-foreground">{achievement.issuer}</p>
                              </div>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <button 
                                onClick={() => handleEditAchievement(achievement)}
                                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => deleteAchievement(achievement.id)}
                                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <form onSubmit={handleUpdateSettings} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">YouTube Intro URL</label>
                        <Input 
                          placeholder="https://www.youtube.com/watch?v=..." 
                          value={newVideoUrl} 
                          onChange={e => setNewVideoUrl(e.target.value)}
                          className="bg-secondary/30 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2 pt-4 border-t border-white/5">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Resume View Link (Drive)</label>
                        <Input 
                          placeholder="Google Drive View Link" 
                          value={newResumeUrl} 
                          onChange={e => setNewResumeUrl(e.target.value)}
                          className="bg-secondary/30 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Direct Download Link</label>
                        <Input 
                          placeholder="Direct Download URL" 
                          value={newResumeDownloadUrl} 
                          onChange={e => setNewResumeDownloadUrl(e.target.value)}
                          className="bg-secondary/30 rounded-xl"
                        />
                        <p className="text-[9px] text-muted-foreground ml-1 italic">
                          Tip: For Google Drive, use a direct download formatter if you want 'One-Click Download'.
                        </p>
                      </div>

                      <Button type="submit" className="w-full rounded-xl bg-primary hover:bg-primary/90 font-bold h-10 shadow-lg shadow-primary/20">
                        <Settings2 className="w-4 h-4 mr-2" /> Update All Settings
                      </Button>
                    </form>

                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <h4 className="text-[10px] uppercase font-black text-primary tracking-widest">Section Visibility</h4>
                      <Button 
                        onClick={() => setShowVideo(!showVideo)}
                        variant={showVideo ? "destructive" : "outline"}
                        className="w-full rounded-xl font-bold h-10"
                      >
                        {showVideo ? "Hide Video Section" : "Show Video Section"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
