"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/portfolio";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

const services = [
  { title: "Secure MVP Build", desc: "Launch startup-ready MVPs with security baked in." },
  { title: "Codebase Rescue", desc: "Audit and refactor insecure legacy code." },
  { title: "Pentesting", desc: "Manual penetration testing for web apps." },
];

const processSteps = [
  {
    step: 1,
    title: "Discovery & Architecture",
    pitch: "We don't just write code; we plan for scale and security. We start with a 15-minute call to understand your business logic and where your sensitive data lives.",
    deliverable: "Project Proposal, Architecture Diagram, and fixed-price quote."
  },
  {
    step: 2,
    title: "AI-Accelerated Build",
    pitch: "Leveraging advanced AI coding tools, I build your core features, API integrations, and database schemas at 3x the speed of a traditional developer.",
    deliverable: "Functional Minimum Viable Product (MVP) ready for staging."
  },
  {
    step: 3,
    title: "The Pentester's Audit",
    pitch: "Before a single user touches your app, I put on my penetration tester hat. I manually attack the codebase, checking for OWASP Top 10 vulnerabilities (SQL Injection, IDOR, broken authentication).",
    deliverable: "Patched vulnerabilities and secure, sanitized code."
  },
  {
    step: 4,
    title: "Secure Handoff & Maintenance",
    pitch: "I transfer complete repository ownership to you, alongside a plain-English Security Report. We can discuss a monthly retainer to keep your infrastructure safe from zero-day threats.",
    deliverable: "Final Codebase, Mini Security Report PDF, and optional Retainer Agreement."
  }
];

export default function Home() {
  useEffect(() => {
    const preventOverscroll = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollTop = target.scrollTop || document.documentElement.scrollTop;

      if (scrollTop <= 0 && e.deltaY < 0) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventOverscroll, { passive: false });
    return () => document.removeEventListener('wheel', preventOverscroll);
  }, []);

  return (
    <main className="bg-[var(--color-bg-main)] text-[var(--color-text-body)] pt-[88px]">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <section id="services" className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-center mb-12"
        >
          Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-[var(--color-bg-card)] p-8 border border-[var(--color-border)] cursor-pointer"
            >
              <h3 className="font-serif text-xl font-semibold mb-3">{s.title}</h3>
              <p className="font-sans text-[var(--color-text-body)] text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="process" className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-center mb-12"
        >
          How We Work
        </motion.h2>
        <div className="space-y-12">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-[var(--color-bg-card)] p-8 border border-[var(--color-border)]"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#B84A39] text-white flex items-center justify-center font-serif text-xl font-semibold rounded-full relative">
                  <span className="absolute inset-0 flex items-center justify-center">{step.step}</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="font-sans text-[var(--color-text-body)] text-sm mb-3">{step.pitch}</p>
                  <p className="font-sans text-sm font-semibold text-[#B84A39]">Deliverable: {step.deliverable}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="projects" className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-center mb-12"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>
      </section>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-[var(--color-border)] py-8 text-center"
      >
         <Link href="#hero" className="inline-block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image src="/Rannel_Logo_Light.png" alt="Rannel" width={120} height={36} className="mx-auto mb-2 dark:hidden" />
            <Image src="/Rannel_Logo_Dark.png" alt="Rannel" width={120} height={36} className="mx-auto mb-2 hidden dark:block" />
          </motion.div>
        </Link>
        <p className="font-sans text-[var(--color-text-body)] text-sm">© Rannel by Jenel Esteron</p>
      </motion.footer>
    </main>
  );
}
