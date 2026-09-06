export type RoomId = 'corridor' | 'studio' | 'workshop' | 'gallery' | 'desk';

export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  tags: string[];
  description: string;
  concepts: string[];
  github?: string;
  potentialCapabilities?: string[];
  status: 'active' | 'concept' | 'featured';
  hasInteractiveDemo: boolean;
}

export interface LinuxDistro {
  name: string;
  category: 'Everyday' | 'Security & Pentest' | 'Lightweight & Minimal' | 'Customization & Rolling' | 'Enterprise & Server';
  description: string;
  exploredFeatures: string[];
  highlight: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface Strength {
  title: string;
  description: string;
  icon: string;
}

export interface CyberDomain {
  title: string;
  items: string[];
  icon: string;
}
