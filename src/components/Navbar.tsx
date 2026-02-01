import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalDetails } from "@/data/portfolioData";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#home" className="text-lg sm:text-xl font-bold">
            <span className="text-foreground">Veeky</span>
            <span className="text-primary">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Resume Buttons */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <a href={personalDetails.resumePath} target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">View Resume</span>
              </a>
            </Button>
            <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
              <a href={personalDetails.resumePath} download="VeekyKumar_Resume.pdf">
                <Download className="w-4 h-4 mr-1.5" />
                <span className="hidden sm:inline">Download</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <a href={personalDetails.resumePath} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-1.5" />
                    View
                  </a>
                </Button>
                <Button size="sm" asChild className="flex-1 bg-primary hover:bg-primary/90">
                  <a href={personalDetails.resumePath} download="VeekyKumar_Resume.pdf">
                    <Download className="w-4 h-4 mr-1.5" />
                    Download
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
