import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Settings2, Trash2, Pencil, LayoutGrid, BrainCircuit, Type, Link as LinkIcon, Image as ImageIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePortfolio } from "@/data/PortfolioContext";
import { Project, Skill, skillCategories } from "@/data/portfolioData";
import { toast } from "sonner";

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [activeTab, setActiveTab] = useState<"project" | "skill" | "video">("project");
  
  const { 
    projects, 
    skills, 
    addProject, 
    deleteProject, 
    updateProject,
    addSkill, 
    deleteSkill, 
    updateVideoUrl, 
    videoUrl,
    showVideo,
    setShowVideo,
    categories,
    addCategory
  } = usePortfolio();

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
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    context: "",
    image: "", // Empty for fallback
  });

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Skill Form State
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: categories[0]?.key || "programming",
  });

  // New Category Form State
  const [categoryForm, setCategoryForm] = useState({
    key: "",
    label: "",
  });

  // Video Form State
  const [newVideoUrl, setNewVideoUrl] = useState(videoUrl);

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

  const handleUpdateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    updateVideoUrl(newVideoUrl);
    toast.success("Video URL updated!");
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[110]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] max-w-[90vw] bg-card border border-border p-8 rounded-3xl shadow-2xl z-[120] text-center"
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
          </>
        )}

        {/* Admin Panel Modal */}
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[110]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-24 right-6 w-[400px] max-w-[90vw] bg-card border border-border rounded-3xl shadow-2xl z-[120] overflow-hidden flex flex-col"
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
                {(["project", "skill", "video"] as const).map((tab) => (
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

                {activeTab === "video" && (
                  <div className="space-y-6">
                    <form onSubmit={handleUpdateVideo} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">YouTube URL</label>
                        <Input 
                          placeholder="https://www.youtube.com/watch?v=..." 
                          value={newVideoUrl} 
                          onChange={e => setNewVideoUrl(e.target.value)}
                          required
                          className="bg-secondary/30 rounded-xl"
                        />
                      </div>
                      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                        <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                          Currently showing: <span className="text-primary break-all">{videoUrl}</span>
                        </p>
                      </div>
                      <Button type="submit" className="w-full rounded-xl bg-primary hover:bg-primary/90 font-bold h-10 shadow-lg shadow-primary/20">
                        <Video className="w-4 h-4 mr-2" /> Update Intro Video
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
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
