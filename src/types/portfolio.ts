export interface SocialLink {
  label: string;
  url: string;
  handle: string;
}

export interface ResumeLink {
  label: string;
  sublabel: string;
  url: string;
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  degree: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  status: string;
  bioParagraphs: string[];
  resumes: ResumeLink[];
  socials: SocialLink[];
}

export interface MetricPillar {
  index: string;
  code: string;
  label: string;
  value: string;
  detail: string;
}

export interface CaseStudy {
  about: string[];
  background?: string[];
  objectives?: string[];
  methodology?: string[];
  challenge?: string[];
  images?: string[];
  reportUrl?: string;
  reportLabel?: string;
}

export interface ProjectItem {
  id: number;
  indexStr: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
  tags: string[];
  category: string;
  featured: boolean;
  metric?: string;
  caseStudy?: CaseStudy;
  githubUrl?: string;
  liveUrl?: string;
}

export interface EthosItem {
  indexStr: string;
  title: string;
  subtitle: string;
  narrative: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  tags: string[];
  reportUrl?: string;
  reportLabel?: string;
}

export interface SkillCategory {
  category: string;
  code: string;
  description: string;
  items: string[];
}

export interface PortfolioData {
  profile: Profile;
  pillars: MetricPillar[];
  projects: ProjectItem[];
  ethos: EthosItem[];
  experiences: ExperienceItem[];
  skills: SkillCategory[];
}
