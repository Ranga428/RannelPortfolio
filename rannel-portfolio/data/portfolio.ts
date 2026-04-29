export interface Project {
  title: string;
  description: string;
  techStack: string[];
  securityFeatures: string[];
  githubUrl: string;
  liveUrl: string;
  problem: string;
  architecture: string;
  buildProcess: string;
  securityAudit: string;
}

export const projects: Project[] = [
  {
    title: "Zero-Trust Patient Portal",
    description: "Healthcare HIPAA-compliant secure document upload and messaging system between doctors and patients.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "AWS S3", "Node.js"],
    securityFeatures: ["RBAC", "AES-256 encryption", "Audit logging", "Malware scanning"],
    githubUrl: "#",
    liveUrl: "#",
    problem: "Healthcare apps frequently suffer from IDOR vulnerabilities, leaking patient data.",
    architecture: "Frontend Next.js → Backend API with middleware → PostgreSQL (encrypted) + S3 (scanned files)",
    buildProcess: "Used AI-assisted development to build RBAC middleware and encryption layers 3x faster.",
    securityAudit: "Mitigated Broken Access Control: Implemented strict middleware preventing IDOR (user_id tampering returns 403). Data at rest encryption for PII fields (SSN, medical history)."
  },
  {
    title: "Fraud-Resistant Payment API",
    description: "FinTech micro-service handling wallet balances, P2P transfers with mock Stripe integration.",
    techStack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Stripe Test"],
    securityFeatures: ["ACID transactions", "Rate limiting", "Webhook validation", "Row locking"],
    githubUrl: "#",
    liveUrl: "#",
    problem: "Financial systems vulnerable to race conditions allowing double-spend and balance manipulation.",
    architecture: "Simple Dashboard → Payment API (Go/Python) → PostgreSQL (ACID) + Stripe Webhook Validation",
    buildProcess: "AI-accelerated development of atomic transaction logic and anti-brute force protections.",
    securityAudit: "Mitigated Race Conditions: Database row locking prevents double-spend (user with $100 clicking send twice in 5ms). Input validation rejects negative amounts. Parameterized queries prevent injection."
  },
  {
    title: "Automated Code Auditor CLI",
    description: "DevSecOps CLI tool that scans local code directories using Gemini API to generate vulnerability reports.",
    techStack: ["Python", "Gemini API", "ReportLab", "Click"],
    securityFeatures: ["OWASP Top 10 scanning", "Severity ranking", "PDF report generation", "Directory traversal"],
    githubUrl: "#",
    liveUrl: "#",
    problem: "Developers lack accessible tools to quickly identify security vulnerabilities in their codebase.",
    architecture: "CLI Tool → Directory Parser (ignores .git/node_modules) → Gemini API (vulnerability analysis) → PDF/Markdown Report",
    buildProcess: "Built with AI assistance for prompt engineering and report generation logic in record time.",
    securityAudit: "Tooling Creation: Proves deep DevSecOps understanding. AI Integration: Demonstrates LLM API expertise, context window management, and effective system prompt programming. Free download captures leads for n8n pipeline."
  },
];
