"use client";

import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleClose = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setCaptchaToken(null);
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.addEventListener("keydown", handleEsc);
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !availableTime || !projectName) {
      alert("Please fill in all required fields (Email, Available Time, Project Name)");
      return;
    }
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    setIsLoading(true);
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
          captchaToken,
        }),
      });

      if (!response.ok) throw new Error('Failed to send');

      setStatus({ type: 'success', message: 'Your inquiry has been sent! I\'ll get back to you within 24 hours.' });
      setTimeout(() => {
        handleClose();
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
        setCaptchaToken(null);
        setIsLoading(false);
      }, 5000);
    } catch {
      setStatus({ type: 'error', message: 'Failed to send. Please try again or email jenelesteron01@gmail.com' });
      setIsLoading(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ marginTop: '0px' }}>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={handleClose} style={{ marginTop: '0px' }} />
      <div className="relative z-51 bg-[var(--color-bg-main)] rounded-none max-w-lg w-full p-6 md:p-8 border border-[var(--color-border)]">
        <button
          onClick={handleClose}
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
          <div className={`p-6 text-center ${status.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
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
               <p className="text-xs text-[var(--color-text-body)] mb-1">Select your preferred date and time</p>
               <div className="relative">
                 <input
                   id="time-input"
                   type="datetime-local"
                   required
                   value={availableTime}
                   onChange={(e) => setAvailableTime(e.target.value)}
                   className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-bg-main)] text-[var(--color-text-heading)] rounded-none focus:outline-none focus:border-[#B84A39]"
                 />
                 <button
                   type="button"
                   onClick={() => {
                     if (availableTime) {
                       setAvailableTime("");
                     } else {
                       const input = document.getElementById('time-input') as HTMLInputElement;
                       if (input) {
                         try {
                           input.showPicker();
                         } catch {
                           input.focus();
                         }
                       }
                     }
                   }}
                   className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-text-body)] hover:text-[#B84A39]"
                 >
                   {availableTime ? (
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   ) : (
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                   )}
                 </button>
               </div>
               {availableTime && (
                 <p className="text-sm text-[var(--color-text-body)] mt-1">
                   {(() => {
                     const d = new Date(availableTime);
                     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                     return `${days[d.getDay()]}, ${d.toLocaleDateString()} at ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                   })()}
                 </p>
               )}
             </div>
              {availableTime && (
                <p className="text-sm text-[var(--color-text-body)] mt-1">
                  {(() => {
                    const d = new Date(availableTime);
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    return `${days[d.getDay()]}, ${d.toLocaleDateString()} at ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                  })()}
                </p>
              )}
                </button>
              </div>
              {availableTime && (
                <p className="text-sm text-[var(--color-text-body)] mt-1">
                  {(() => {
                    const d = new Date(availableTime);
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    return `${days[d.getDay()]}, ${d.toLocaleDateString()} at ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                  })()}
                </p>
              )}
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
            <div className="mb-4">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token: string | null) => setCaptchaToken(token)}
              />
            </div>
            <p className="text-xs text-[var(--color-text-body)] mb-3">
              <span className="text-[#B84A39]">*</span> Required fields
            </p>
            <button
              type="submit"
              disabled={isLoading || !captchaToken}
              className={`w-full px-8 py-3.5 rounded-none font-semibold transition-colors flex items-center justify-center gap-2 ${isLoading ? 'bg-[#9a3e30] cursor-wait' : captchaToken ? 'bg-[#B84A39] text-white hover:bg-[#9a3e30]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
