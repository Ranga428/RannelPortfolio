"use client";

import { useState, useEffect } from "react";

export default function BookCallModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [projectName, setProjectName] = useState("");
  const [frontendTech, setFrontendTech] = useState("");
  const [backendTech, setBackendTech] = useState("");
  const [databaseTech, setDatabaseTech] = useState("");
  const [authMethod, setAuthMethod] = useState("");
  const [coreFeatures, setCoreFeatures] = useState("");
  const [securityCompliance, setSecurityCompliance] = useState("");
  const [deploymentTarget, setDeploymentTarget] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [showOptional, setShowOptional] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !availableTime || !projectName) {
      alert("Please fill in all required fields (Email, Available Time, Project Name)");
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          availableTime,
          projectName,
          frontendTech,
          backendTech,
          databaseTech,
          authMethod,
          coreFeatures,
          securityCompliance,
          deploymentTarget,
          description,
        }),
      });

      if (!response.ok) throw new Error('Failed to send');

      setStatus({ type: 'success', message: 'Your inquiry has been sent! I\'ll get back to you within 24 hours.' });
      setTimeout(() => {
        onClose();
        setEmail("");
        setAvailableTime("");
        setProjectName("");
        setFrontendTech("");
        setBackendTech("");
        setDatabaseTech("");
        setAuthMethod("");
        setCoreFeatures("");
        setSecurityCompliance("");
        setDeploymentTarget("");
        setDescription("");
        setStatus(null);
      }, 5000);
    } catch {
      setStatus({ type: 'error', message: 'Failed to send. Please try again or email jenelesteron01@gmail.com' });
      setTimeout(() => setStatus(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ marginTop: '0px' }}>
      <div className="fixed inset-0 bg-black/50" onClick={onClose} style={{ marginTop: '0px' }} />
      <div className="relative bg-[var(--color-bg-main)] rounded-none max-w-lg w-full p-6 md:p-8 border border-[var(--color-border)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#4A4A4A] dark:text-[#A8A39C] hover:text-[#B84A39] text-2xl"
        >
          &times;
        </button>
        <h2 className="font-serif text-[var(--color-text-heading)] text-2xl font-semibold mb-2">
          Book a Discovery Call
        </h2>
        <p className="font-sans text-sm text-[var(--color-text-body)] mb-6">
           Tell me about your project and I&apos;ll get back to you within 24 hours.
        </p>
        {status ? (
          <div className={`p-6 text-center ${status.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'} rounded-none`}>
            <div className="text-4xl mb-4">{status.type === 'success' ? '✓' : '✗'}</div>
            <p className={`font-sans ${status.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
              {status.message}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 max-h-[65vh] overflow-y-auto pr-2">
          <div className="space-y-4">
            <h3 className="font-serif text-[var(--color-text-heading)] text-lg font-semibold border-b border-[var(--color-border)] pb-2">
              Contact Information
            </h3>
            <div>
              <label htmlFor="email" className="block text-sm font-sans text-[var(--color-text-body)] mb-1">
                Your Email <span className="text-[#B84A39]">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39]"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-sans text-[var(--color-text-body)] mb-1">
                Available Time <span className="text-[#B84A39]">*</span>
              </label>
              <p className="text-xs text-[var(--color-text-body)] mb-1">When are you available for a 15-min discovery call?</p>
              <input
                id="time"
                type="text"
                required
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39]"
                placeholder="e.g., Mondays 2-4pm, May 5th 3pm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-[var(--color-text-heading)] text-lg font-semibold border-b border-[var(--color-border)] pb-2">
              Project Details
            </h3>
            <div>
              <label htmlFor="projectName" className="block text-sm font-sans text-[var(--color-text-body)] mb-1">
                Project Name <span className="text-[#B84A39]">*</span>
              </label>
              <input
                id="projectName"
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39]"
                placeholder="e.g., MediVault Portal"
              />
            </div>
            <div>
              <label htmlFor="coreFeatures" className="block text-sm font-sans text-[var(--color-text-body)] mb-1">
                Core Features
              </label>
              <p className="text-xs text-[var(--color-text-body)] mb-1">What are the main features you need?</p>
              <textarea
                id="coreFeatures"
                value={coreFeatures}
                onChange={(e) => setCoreFeatures(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39] resize-none"
                placeholder="e.g., User login, upload PDF, view dashboard, Stripe checkout"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowOptional(!showOptional)}
            className="flex items-center gap-2 text-sm font-sans text-[var(--color-text-body)] hover:text-[#B84A39] transition-colors"
          >
            <span className={`transform transition-transform ${showOptional ? 'rotate-90' : ''}`}>▶</span>
            Technical Details (Optional)
          </button>

          {showOptional && (
            <div className="space-y-4 pl-6 border-l-2 border-[var(--color-border)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="frontendTech" className="block text-sm font-sans text-[var(--color-text-body)] mb-1">
                    Frontend
                  </label>
                  <input
                    id="frontendTech"
                    type="text"
                    value={frontendTech}
                    onChange={(e) => setFrontendTech(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39]"
                    placeholder="Next.js, React, Vue..."
                  />
                </div>
                <div>
                  <label htmlFor="backendTech" className="block text-sm font-sans text-[var(--color-text-body)] mb-1">
                    Backend
                  </label>
                  <input
                    id="backendTech"
                    type="text"
                    value={backendTech}
                    onChange={(e) => setBackendTech(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39]"
                    placeholder="Node.js, Python, Go..."
                  />
                </div>
                <div>
                  <label htmlFor="databaseTech" className="block text-sm font-sans text-[var(--color-text-body)] mb-1">
                    Database
                  </label>
                  <input
                    id="databaseTech"
                    type="text"
                    value={databaseTech}
                    onChange={(e) => setDatabaseTech(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39]"
                    placeholder="PostgreSQL, MongoDB..."
                  />
                </div>
                <div>
                  <label htmlFor="authMethod" className="block text-sm font-sans text-[var(--color-text-body)] mb-1">
                    Auth Method
                  </label>
                  <input
                    id="authMethod"
                    type="text"
                    value={authMethod}
                    onChange={(e) => setAuthMethod(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39]"
                    placeholder="JWT, OAuth2, NextAuth..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="securityCompliance" className="block text-sm font-sans text-[var(--color-text-body)] mb-1">
                    Security Level
                  </label>
                  <input
                    id="securityCompliance"
                    type="text"
                    value={securityCompliance}
                    onChange={(e) => setSecurityCompliance(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39]"
                    placeholder="OWASP Top 10, HIPAA..."
                  />
                </div>
                <div>
                  <label htmlFor="deploymentTarget" className="block text-sm font-sans text-[var(--color-text-body)] mb-1">
                    Deployment
                  </label>
                  <input
                    id="deploymentTarget"
                    type="text"
                    value={deploymentTarget}
                    onChange={(e) => setDeploymentTarget(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39]"
                    placeholder="Vercel, AWS, DigitalOcean..."
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-sans text-[var(--color-text-body)] mb-1">
                  Additional Details
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39] resize-none"
                  placeholder="Any other project details or requirements..."
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <p className="text-xs text-[var(--color-text-body)] mb-3">
              <span className="text-[#B84A39]">*</span> Required fields
            </p>
            <button
              type="submit"
              className="w-full bg-[#B84A39] text-white px-8 py-3.5 rounded-none hover:bg-[#9a3e30] transition-colors font-semibold"
            >
              Submit Request
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
