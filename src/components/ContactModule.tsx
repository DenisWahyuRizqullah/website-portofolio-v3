import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, FileText } from 'lucide-react';
import type { Profile } from '../types/portfolio';

interface ContactModuleProps {
  profile: Profile;
}

export const ContactModule: React.FC<ContactModuleProps> = ({ profile }) => {
  return (
    <section id="contact" className="pt-10 pb-16 space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="border-b border-stone-200/80 dark:border-stone-800 pb-4">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-1">
          05 / CONTACT
        </div>
        <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-stone-950 dark:text-stone-100">
          Initiate Engineering Dialogue
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {/* Left column: Overview, Resumes & Verified Credentials */}
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Open for software systems engineering, IoT architecture, and embedded research roles. Based in Malang, Indonesia; adaptable to on-site, hybrid, or remote technical engagements.
          </p>

          {/* Resumes & Documentation */}
          {profile.resumes && profile.resumes.length > 0 && (
            <div className="space-y-3 pt-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500 block">
                Technical Resumes & Documentation
              </span>
              <div className="space-y-2.5 font-mono text-xs">
                {profile.resumes.map((res) => (
                  <a
                    key={res.label}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-white dark:bg-[#141417] rounded border border-stone-200/80 dark:border-stone-800 hover:border-stone-900 dark:hover:border-stone-400 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText size={14} className="text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors shrink-0" />
                      <div className="truncate">
                        <span className="text-stone-900 dark:text-stone-100 block truncate font-medium">{res.label}</span>
                        <span className="text-[10px] text-stone-400 dark:text-stone-500 block truncate">{res.sublabel}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={13} className="text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Digital Presence / Socials */}
          <div className="space-y-3 pt-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500 block">
              Digital Presence & Code
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white dark:bg-[#141417] hover:bg-stone-100 dark:hover:bg-stone-800 rounded border border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 transition-colors flex items-center gap-1.5 group"
                >
                  <span>{s.label}</span>
                  <ArrowUpRight size={11} className="text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Direct Communication Channels & Status Card */}
        <div className="space-y-6">
          <div className="space-y-3 font-mono text-xs text-stone-700 dark:text-stone-300">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500 block">
              Direct Channels
            </span>

            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 p-3.5 bg-white dark:bg-[#141417] rounded border border-stone-200/80 dark:border-stone-800 hover:border-stone-900 dark:hover:border-stone-400 transition-colors group"
            >
              <Mail size={15} className="text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 block uppercase tracking-wider">Electronic Mail</span>
                <span className="truncate text-stone-900 dark:text-stone-100 font-medium">{profile.email}</span>
              </div>
              <ArrowUpRight size={13} className="text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors shrink-0" />
            </a>

            <a
              href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-3 p-3.5 bg-white dark:bg-[#141417] rounded border border-stone-200/80 dark:border-stone-800 hover:border-stone-900 dark:hover:border-stone-400 transition-colors group"
            >
              <Phone size={15} className="text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 block uppercase tracking-wider">Direct Voice / WhatsApp</span>
                <span className="truncate text-stone-900 dark:text-stone-100 font-medium">{profile.phone}</span>
              </div>
              <ArrowUpRight size={13} className="text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors shrink-0" />
            </a>

            <div className="flex items-center gap-3 p-3.5 bg-white dark:bg-[#141417] rounded border border-stone-200/80 dark:border-stone-800">
              <MapPin size={15} className="text-stone-400 dark:text-stone-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 block uppercase tracking-wider">Coordinates</span>
                <span className="text-stone-900 dark:text-stone-100 font-medium">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Operational Status */}
          <div className="p-4 bg-white dark:bg-[#141417] rounded border border-stone-200/80 dark:border-stone-800 space-y-1.5 font-mono">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 dark:text-stone-500 block">
              Engagement Status
            </span>
            <div className="text-xs text-stone-900 dark:text-stone-100 font-medium">
              {profile.status}
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans font-light leading-relaxed pt-1">
              Direct inquiries via email or WhatsApp receive rapid response within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
