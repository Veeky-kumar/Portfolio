// Extensible data structures for easy future updates

export interface Skill {
  name: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  context?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  cgpa?: string;
  location: string;
  backgroundImage: string;
  highlights?: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  image: string;
  link?: string;
  category: 'hackathon' | 'certification' | 'award';
}

import projectLlm from "@/assets/project-llm.png";
import projectResume from "@/assets/project-resume.png";
import projectDiabetes from "@/assets/project-diabetes.png";
import projectKdsh from "@/assets/project-kdsh.jpg";
import certHackathon from "@/assets/cert-hackathon.png";
import certTensorFlow from "@/assets/cert-tensorflow.png";

// Personal Details
export const personalDetails = {
  name: "Veeky Kumar",
  title: "Software Developer | AI Engineer (Generative AI)",
  email: "vk133162@gmail.com",
  location: "Jalandhar, India",
  linkedin: "https://linkedin.com/in/veeky-kumar",
  github: "https://github.com/Veeky-kumar",
  leetcode: "https://leetcode.com/u/Veeky_kumar/",
  resumePath: "/VeekyResume.pdf",
  videoIntroUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Default/Placeholder video URL
};

// Skills - Add new skills here
export const initialSkills: Skill[] = [
  // Programming
  { name: "Python", category: "programming" },
  { name: "SQL", category: "programming" },
  { name: "C++", category: "programming" },
  { name: "JavaScript", category: "programming" },
  { name: "TypeScript", category: "programming" },
  
  // AI / ML (Including Vector Search)
  { name: "NLP", category: "ai-ml" },
  { name: "LLMs", category: "ai-ml" },
  { name: "RAG", category: "ai-ml" },
  { name: "Sentence Transformers", category: "ai-ml" },
  { name: "Hugging Face", category: "ai-ml" },
  { name: "PyTorch", category: "ai-ml" },
  { name: "TensorFlow", category: "ai-ml" },
  { name: "FAISS", category: "ai-ml" },
  { name: "Pinecone", category: "ai-ml" },
  { name: "Embeddings", category: "ai-ml" },
  { name: "Semantic Similarity", category: "ai-ml" },
  
  // Backend
  { name: "FastAPI", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Microservices", category: "backend" },
  
  // Frontend
  { name: "React.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "HTML", category: "frontend" },
  { name: "CSS", category: "frontend" },
  
  // DevOps / Tools
  { name: "Docker", category: "devops" },
  { name: "Git", category: "devops" },
  { name: "Linux", category: "devops" },
  { name: "AWS (Basics)", category: "devops" },
  { name: "CI/CD", category: "devops" },
  { name: "Vercel", category: "devops" },
  { name: "Render", category: "devops" },
  { name: "Ollama", category: "devops" },
];

// Projects - Add new projects here
export const initialProjects: Project[] = [
  {
    id: "long-context-llm",
    title: "Narrative Consistency Verification for Long-Context LLMs",
    context: "IIT Kharagpur Data Science Hackathon",
    description: "Designed a long-context LLM reasoning system for narratives exceeding 100k+ words using evidence-grounded semantic retrieval and consistency scoring.",
    technologies: ["Python", "NLP", "Sentence Transformers", "Semantic Search", "Ollama"],
    githubUrl: "https://github.com/Veeky-kumar/long-context-reasoning-system-",
    image: projectKdsh,
  },
  {
    id: "resume-matching",
    title: "AI-Powered Resume Matching Platform (RAG)",
    description: "Built a semantic resume–JD matching platform using Retrieval-Augmented Generation and FAISS-based vector search.",
    technologies: ["Python", "FastAPI", "React", "FAISS", "RAG"],
    githubUrl: "https://github.com/Veeky-kumar/interviewAI",
    liveUrl: "https://interview-ai-drab.vercel.app/",
    image: projectResume,
  },
  {
    id: "diabetes-prediction",
    title: "End-to-End Diabetes Risk Prediction System",
    description: "Developed a complete ML pipeline including preprocessing, model training, inference, and deployment.",
    technologies: ["Python", "Random Forest", "FastAPI", "React", "Docker"],
    liveUrl: "https://diabetes-prediction-frontend-delta.vercel.app/",
    image: projectDiabetes,
  },
];

// Education - Add new education entries here
export const education: Education[] = [
  {
    id: "nitj-mtech",
    institution: "National Institute of Technology, Jalandhar",
    degree: "M.Tech",
    field: "Artificial Intelligence (Generative AI)",
    duration: "2025 – Present",
    cgpa: "8.04 / 10",
    location: "Jalandhar, India",
    backgroundImage: "nitj-campus",
    highlights: ["Generative AI", "LLM Systems", "Research-oriented Thinking", "Strong Theoretical Foundations"],
  },
  {
    id: "cu-btech",
    institution: "Chandigarh University",
    degree: "Bachelor of Engineering",
    field: "Computer Science & Engineering",
    duration: "2020 – 2024",
    cgpa: "7.75 / 10",
    location: "Mohali, India",
    backgroundImage: "chandigarh-university",
    highlights: ["Data Structures", "Algorithms", "Software Engineering", "Database Systems"],
  },
];

// Experience - Add new experience entries here
export const experience: Experience[] = [
  {
    id: "protolabz",
    title: "Full Stack Developer",
    company: "Protolabz eServices",
    location: "Mohali",
    duration: "May 2024 – Feb 2025",
    responsibilities: [
      "Developed API-driven data workflows",
      "Migrated frontend to TypeScript",
      "Integrated RESTful backend services",
      "Implemented JWT-based authentication",
      "Improved backend performance and reliability",
    ],
  },
];

// Skill categories for display
export const skillCategories = [
  { key: "programming", label: "Programming" },
  { key: "ai-ml", label: "AI / ML" },
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "devops", label: "DevOps / Tools" },
] as const;

// Achievements - Add your certificates and hackathon wins here
export const initialAchievements: Achievement[] = [
  {
    id: "kdsh-2024",
    title: "Kharagpur Data Science Hackathon (Round 1)",
    issuer: "IIT Kharagpur",
    date: "2024",
    image: certHackathon,
    category: "hackathon"
  },
  {
    id: "tensorflow-cert",
    title: "Introduction to TensorFlow for AI, ML, and Deep Learning",
    issuer: "DeepLearning.AI (Coursera)",
    date: "2021",
    image: certTensorFlow,
    category: "certification",
    link: "https://www.coursera.org/verify/28EF8DEXL26C"
  }
];

// About me text
export const aboutMe = {
  text: "I am an M.Tech student in Artificial Intelligence (Generative AI) at NIT Jalandhar with strong foundations in Python, SQL, and data processing. I enjoy building end-to-end AI systems, semantic retrieval pipelines, and LLM-driven applications that bridge research and real-world engineering.",
  highlights: [
    { icon: "Cpu", label: "End-to-end AI systems" },
    { icon: "Database", label: "LLM & RAG pipelines" },
    { icon: "GitBranch", label: "Data engineering + ML integration" },
    { icon: "Server", label: "Clean, scalable backend design" },
  ],
};
