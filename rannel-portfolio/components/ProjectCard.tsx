"use client";

import type { Project } from "@/data/portfolio";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[var(--color-bg-card)] p-8 border border-[var(--color-border)]"
    >
      <h3 className="font-serif text-[var(--color-text-heading)] text-2xl font-semibold mb-3">
        {project.title}
      </h3>
      <p className="font-sans text-[var(--color-text-body)] mb-6">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map((tech) => (
          <span key={tech} className="bg-[var(--color-bg-main)] text-[var(--color-text-heading)] text-sm px-3 py-1 font-mono border border-[var(--color-border)]">
            {tech}
          </span>
        ))}
      </div>
      <div className="border-l-2 border-[#B84A39] pl-4 mb-6">
        <h4 className="font-mono text-[#B84A39] text-sm uppercase tracking-wider mb-2">Security Highlights</h4>
        <ul className="space-y-1">
          {project.securityFeatures.map((f) => (
            <li key={f} className="font-sans text-[var(--color-text-body)] text-sm">■ {f}</li>
          ))}
        </ul>
      </div>
      {expanded && (
        <div className="mb-6 space-y-4">
          <div>
            <h5 className="font-serif text-[var(--color-text-heading)] font-semibold mb-2">The Problem</h5>
            <p className="font-sans text-[var(--color-text-body)] text-sm">{project.problem}</p>
          </div>
          <div>
            <h5 className="font-serif text-[var(--color-text-heading)] font-semibold mb-2">Architecture</h5>
            <p className="font-mono text-[var(--color-text-body)] text-sm bg-[var(--color-bg-main)] p-3 border border-[var(--color-border)]">{project.architecture}</p>
          </div>
          <div>
            <h5 className="font-serif text-[var(--color-text-heading)] font-semibold mb-2">Security Audit</h5>
            <p className="font-sans text-[var(--color-text-body)] text-sm">{project.securityAudit}</p>
          </div>
        </div>
      )}
      <div className="flex gap-4 items-center">
        <a href={project.githubUrl} className="text-[#B84A39] text-sm">GitHub</a>
        <a href={project.liveUrl} className="text-[#B84A39] text-sm">Live Demo</a>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#B84A39] text-sm ml-auto hover:underline"
        >
          {expanded ? "Show Less" : "View Details"}
        </button>
      </div>
    </motion.div>
  );
}
