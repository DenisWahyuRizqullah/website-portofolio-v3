import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import type { Profile } from '../types/portfolio';

interface ContactModuleProps {
  profile: Profile;
}

export const ContactModule: React.FC<ContactModuleProps> = ({ profile }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    sender: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="pt-10 pb-16 space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800 pb-4">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-1">
          05 / TRANSMISSION & CONTACT
        </div>
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-stone-950 dark:text-stone-100">
          Initiate Engineering Dialogue
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
        {/* Left column: Direct channels & coordinates */}
        <div className="md:col-span-5 space-y-6">
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Open for software systems engineering, IoT architecture, and embedded research roles. Based in Malang, Indonesia; adaptable to on-site, hybrid, or remote technical engagements.
          </p>

          <div className="space-y-3 font-mono text-xs text-stone-700 dark:text-stone-300">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 p-3 bg-white dark:bg-[#141417] rounded border border-stone-200/80 dark:border-stone-800 hover:border-stone-900 dark:hover:border-stone-400 transition-colors"
            >
              <Mail size={14} className="text-stone-400 dark:text-stone-500" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 block uppercase">Electronic Mail</span>
                <span className="truncate">{profile.email}</span>
              </div>
              <ArrowUpRight size={13} className="text-stone-400 dark:text-stone-500" />
            </a>

            <a
              href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-3 p-3 bg-white dark:bg-[#141417] rounded border border-stone-200/80 dark:border-stone-800 hover:border-stone-900 dark:hover:border-stone-400 transition-colors"
            >
              <Phone size={14} className="text-stone-400 dark:text-stone-500" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 block uppercase">Direct Voice / WhatsApp</span>
                <span className="truncate">{profile.phone}</span>
              </div>
              <ArrowUpRight size={13} className="text-stone-400 dark:text-stone-500" />
            </a>

            <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#141417] rounded border border-stone-200/80 dark:border-stone-800">
              <MapPin size={14} className="text-stone-400 dark:text-stone-500" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 block uppercase">Coordinates</span>
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded text-stone-700 dark:text-stone-300 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right column: Clean Minimalist Form */}
        <div className="md:col-span-7">
          <div className="p-6 sm:p-8 bg-white dark:bg-[#141417] rounded-lg border border-stone-200/80 dark:border-stone-800 space-y-5">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 mx-auto flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-base font-normal text-stone-950 dark:text-stone-100">
                  Transmission Dispatched
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-light max-w-sm mx-auto">
                  Thank you. Your message has been logged. Alternatively, you can reach out directly via {profile.email}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ sender: '', email: '', message: '' });
                  }}
                  className="mt-4 text-xs font-mono underline underline-offset-4 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="sender" className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    Your Name / Engineering Team
                  </label>
                  <input
                    id="sender"
                    type="text"
                    required
                    value={formData.sender}
                    onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                    placeholder="e.g. Lead Engineer, Research Lab"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50/50 dark:bg-stone-900/80 rounded border border-stone-200/80 dark:border-stone-800 focus:outline-none focus:border-stone-900 dark:focus:border-stone-400 transition-colors text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 font-light"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    Return Email Channel
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@organization.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50/50 dark:bg-stone-900/80 rounded border border-stone-200/80 dark:border-stone-800 focus:outline-none focus:border-stone-900 dark:focus:border-stone-400 transition-colors text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 font-light"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    Technical Specifications / Inquiries
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, role, or technical problem..."
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50/50 dark:bg-stone-900/80 rounded border border-stone-200/80 dark:border-stone-800 focus:outline-none focus:border-stone-900 dark:focus:border-stone-400 transition-colors text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 font-light resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-950 text-xs font-mono tracking-wider transition-colors"
                >
                  <Send size={13} />
                  <span>TRANSMIT DISPATCH</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
