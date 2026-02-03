import { Github, Linkedin, Mail, Code, FileText, Download } from "lucide-react";
import { personalDetails } from "@/data/portfolioData";
import { usePortfolio } from "@/data/PortfolioContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { resumeUrl, resumeDownloadUrl } = usePortfolio();

  return (
    <footer className="py-8 sm:py-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-lg sm:text-xl font-bold">
              <span className="text-foreground">Veeky Kumar</span>
              <span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Resume Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              View Resume
            </a>
            <a
              href={resumeDownloadUrl || resumeUrl}
              download="VeekyKumar_Resume.pdf"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Download
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={personalDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href={personalDetails.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href={personalDetails.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LeetCode"
            >
              <Code className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href={`mailto:${personalDetails.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
