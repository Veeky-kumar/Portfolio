// Extensible data structures for easy future updates

export interface Skill {
  name: string;
  category: 'programming' | 'ai-ml' | 'vector-search' | 'backend' | 'frontend' | 'devops';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  context?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
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
};

// Skills - Add new skills here
export const skills: Skill[] = [
  // Programming
  { name: "Python", category: "programming" },
  { name: "SQL", category: "programming" },
  { name: "C++", category: "programming" },
  { name: "JavaScript", category: "programming" },
  { name: "TypeScript", category: "programming" },
  
  // AI / ML
  { name: "NLP", category: "ai-ml" },
  { name: "LLMs", category: "ai-ml" },
  { name: "RAG", category: "ai-ml" },
  { name: "Sentence Transformers", category: "ai-ml" },
  { name: "Hugging Face", category: "ai-ml" },
  { name: "PyTorch", category: "ai-ml" },
  { name: "TensorFlow", category: "ai-ml" },
  
  // Vector Search
  { name: "FAISS", category: "vector-search" },
  { name: "Pinecone", category: "vector-search" },
  { name: "Embeddings", category: "vector-search" },
  { name: "Semantic Similarity", category: "vector-search" },
  
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
export const projects: Project[] = [
  {
    id: "long-context-llm",
    title: "Narrative Consistency Verification for Long-Context LLMs",
    context: "IIT Kharagpur Data Science Hackathon",
    description: "Designed a long-context LLM reasoning system for narratives exceeding 100k+ words using evidence-grounded semantic retrieval and consistency scoring.",
    technologies: ["Python", "NLP", "Sentence Transformers", "Semantic Search", "Ollama"],
    githubUrl: "https://github.com/Veeky-kumar/long-context-reasoning-system-",
  },
  {
    id: "resume-matching",
    title: "AI-Powered Resume Matching Platform (RAG)",
    description: "Built a semantic resume–JD matching platform using Retrieval-Augmented Generation and FAISS-based vector search.",
    technologies: ["Python", "FastAPI", "React", "FAISS", "RAG"],
    githubUrl: "https://github.com/Veeky-kumar/interviewAI",
    liveUrl: "https://interview-ai-drab.vercel.app/",
  },
  {
    id: "diabetes-prediction",
    title: "End-to-End Diabetes Risk Prediction System",
    description: "Developed a complete ML pipeline including preprocessing, model training, inference, and deployment.",
    technologies: ["Python", "Random Forest", "FastAPI", "React", "Docker"],
    liveUrl: "https://diabetes-prediction-frontend-delta.vercel.app/",
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
  { key: "vector-search", label: "Vector Search" },
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
  { key: "devops", label: "DevOps / Tools" },
] as const;

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
