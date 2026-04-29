/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookCallModal from "./BookCallModal";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-[100] bg-[var(--color-bg-main)]/95 backdrop-blur-md border-b border-[var(--color-border)] ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="#hero" className="inline-block" style={{ marginTop: '10px' }}>
              {mounted && (
                <Image
                  src={theme === "dark" ? "/Rannel_Logo_Dark.png" : "/Rannel_Logo_Light.png"}
                  alt="Rannel"
                  width={120}
                  height={40}
                  style={{ height: '40px', width: 'auto' }}
                />
              )}
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: "services", label: "Services" },
              { id: "process", label: "How we work" },
              { id: "projects", label: "Projects" }
            ].map((section) => (
              <motion.div
                key={section.id}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  href={`#${section.id}`}
                  className="text-[var(--color-text-body)] hover:text-[#B84A39] text-sm"
                >
                  {section.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-[#B84A39] text-white px-5 py-2.5 rounded-none text-sm"
            >
              Book a Call
            </motion.button>
            <motion.button
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-[var(--color-text-body)] w-6 h-6 flex items-center justify-center"
            >
              {mounted ? (theme === "dark" ? "☀️" : "🌙") : "🌙"}
            </motion.button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[var(--color-text-body)] w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-main)]"
            >
              <div className="px-6 py-6 space-y-4">
                {[
                  { id: "services", label: "Services" },
                  { id: "process", label: "How we work" },
                  { id: "projects", label: "Projects" }
                ].map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById(section.id);
                      if (el) {
                        const navbar = document.querySelector('nav');
                        const navbarHeight = navbar ? navbar.offsetHeight : 70;
                        const y = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }, 300);
                  }}
                  className="block text-[var(--color-text-body)] hover:text-[#B84A39] py-2 text-sm"
                >
                  {section.label}
                </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-[#B84A39] text-white px-5 py-3 rounded-none text-sm"
                >
                  Book a Call
                </button>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full text-[var(--color-text-body)] py-3 text-sm border border-[var(--color-border)] rounded-none"
                >
                  {mounted && theme === "dark" ? "☀️ Switch to Light" : "🌙 Switch to Dark"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <BookCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </motion.nav>
    </>
  );
}
