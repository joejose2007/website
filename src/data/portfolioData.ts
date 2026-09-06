import { Project, LinuxDistro, SkillCategory, Strength, CyberDomain } from '../types';

export const PERSONAL_INFO = {
  name: 'Joe Jose',
  title: 'Computer Science Student · Cybersecurity Enthusiast · Linux Explorer · Developer',
  email: 'birdalen1@gmail.com',
  githubUrl: 'https://github.com/joejose2007',
  githubHandle: 'github.com/joejose2007',
  instagramUrl: 'https://instagram.com/_joeee__.__',
  instagramHandle: '@_joeee__.__',
  educationDegree: 'Bachelor of Technology — Computer Science & Engineering',
  educationStatus: 'Currently pursuing',
  motto: 'Build, break, investigate, experiment, and build again.',
  bio: "I'm Joe Jose, a Computer Science & Engineering student with a strong interest in cybersecurity, Linux, networking, digital forensics, AI, and software development. I enjoy learning by actually experimenting with technology rather than only studying theory. My interests range from understanding how computer networks work and analyzing digital information to configuring Linux systems, exploring security concepts, building small applications, and experimenting with automation.",
  distroCount: '25+ Linux distributions',
};

export const CORE_STRENGTHS: Strength[] = [
  {
    title: 'Analytical Thinking',
    description: 'I enjoy breaking complicated problems into smaller pieces and figuring out how different components interact.',
    icon: 'Brain',
  },
  {
    title: 'Curiosity',
    description: 'Technology changes constantly, so I\'m naturally interested in exploring new systems, tools, and technologies.',
    icon: 'Compass',
  },
  {
    title: 'Fast Learning',
    description: 'I\'m comfortable learning unfamiliar technologies independently through documentation, experimentation, and projects.',
    icon: 'Zap',
  },
  {
    title: 'Problem Solving',
    description: 'When something doesn\'t work, I prefer understanding the underlying problem instead of simply looking for a temporary fix.',
    icon: 'Hammer',
  },
  {
    title: 'Adaptability',
    description: 'I\'ve experimented with different operating systems, tools, development environments, and technologies, which has helped me become comfortable adapting to new environments.',
    icon: 'Shuffle',
  },
  {
    title: 'Self-Learning',
    description: 'A significant part of my technical learning happens outside the classroom through personal projects, experimentation, documentation, and practical research.',
    icon: 'BookOpen',
  },
];

export const EDUCATION_AREAS = [
  'Computer Networks',
  'Operating Systems',
  'Programming',
  'Cybersecurity',
  'Linux',
  'Databases',
  'Software Development',
  'Artificial Intelligence',
  'Digital Forensics',
];

export const CYBERSECURITY_DOMAINS: CyberDomain[] = [
  {
    title: 'Cybersecurity Fundamentals',
    icon: 'Shield',
    items: [
      'Security concepts',
      'Vulnerability analysis',
      'Threat awareness',
      'System security',
      'Security testing',
    ],
  },
  {
    title: 'Penetration Testing',
    icon: 'Crosshair',
    items: [
      'Reconnaissance',
      'Network enumeration',
      'Vulnerability identification',
      'Security testing methodologies',
      'Linux-based security tools',
    ],
  },
  {
    title: 'Network Security',
    icon: 'Network',
    items: [
      'Local network monitoring',
      'Network traffic concepts',
      'Device discovery',
      'Network visualization',
      'Basic network analysis',
    ],
  },
  {
    title: 'Digital Forensics',
    icon: 'FileSearch',
    items: [
      'Metadata analysis',
      'Digital evidence concepts',
      'File analysis',
      'Information extraction',
      'Investigating digital artifacts',
    ],
  },
  {
    title: 'OSINT (Open-Source Intelligence)',
    icon: 'Globe',
    items: [
      'Open-source intelligence concepts',
      'Information discovery',
      'Public-data analysis',
      'Digital footprint awareness',
    ],
  },
];

export const LINUX_DETAILS = {
  headline: '25+ Linux Distributions Explored',
  quote: "For me, Linux isn't just an operating system — it's also a way to understand how computers actually work underneath the graphical interface.",
  experienceAreas: [
    'Linux installation',
    'Desktop environments',
    'Package management',
    'System configuration',
    'Terminal-based workflows',
    'Networking',
    'System troubleshooting',
    'Performance optimization',
    'Security-oriented distributions',
    'Desktop customization',
    'Virtualization and experimentation',
  ],
};

export const LINUX_DISTROS_SAMPLES: LinuxDistro[] = [
  {
    name: 'Arch Linux',
    category: 'Customization & Rolling',
    description: 'Constructed from a minimal base using pacman, custom systemd configs, and tiling window managers (i3/Hyprland).',
    exploredFeatures: ['Manual installation via CLI', 'Pacman & AUR', 'Custom kernel parameters', 'Lightweight memory tuning'],
    highlight: 'Deep understanding of fundamental OS components',
  },
  {
    name: 'Kali Linux',
    category: 'Security & Pentest',
    description: 'Industry-standard penetration testing distribution with pre-configured reconnaissance and forensic tooling.',
    exploredFeatures: ['Nmap & Wireshark', 'Metasploit framework', 'Aircrack-ng suite', 'Burp Suite proxy testing'],
    highlight: 'Offensive security & penetration testing tooling',
  },
  {
    name: 'Parrot Security OS',
    category: 'Security & Pentest',
    description: 'Security & privacy-focused Debian derivative with hardened sandbox environments and forensic modes.',
    exploredFeatures: ['AnonSurfer routing', 'Forensic boot mode', 'Cryptography utilities', 'Privacy-first network configurations'],
    highlight: 'Hardened sandboxing & stealth reconnaissance',
  },
  {
    name: 'Debian',
    category: 'Enterprise & Server',
    description: 'The universal operating system. Rock-solid stability, APT packaging, and upstream parent of dozens of distributions.',
    exploredFeatures: ['System stability testing', 'Server configuration', 'APT repository mechanics', 'Service daemon management'],
    highlight: 'Core Linux stability & upstream architecture',
  },
  {
    name: 'Fedora',
    category: 'Everyday',
    description: 'Cutting-edge workstation featuring Wayland, SELinux enforcement, and current kernel features.',
    exploredFeatures: ['SELinux access controls', 'DNF package manager', 'Flatpak sandboxing', 'PipeWire audio architecture'],
    highlight: 'Modern security controls & cutting-edge software stack',
  },
  {
    name: 'Void Linux',
    category: 'Customization & Rolling',
    description: 'Independent distribution with XBPS package manager and runit init system instead of systemd.',
    exploredFeatures: ['runit init service scripts', 'XBPS source packages', 'Musl libc vs glibc comparison', 'Ultra-fast boot speeds'],
    highlight: 'Exploring alternatives to standard systemd architecture',
  },
  {
    name: 'Alpine Linux',
    category: 'Lightweight & Minimal',
    description: 'Security-oriented, ultra-lightweight distro based on musl libc and busybox, popular in containerized infrastructure.',
    exploredFeatures: ['BusyBox utilities', 'APK package manager', 'RAM-disk run mode', 'Minimal footprint containers'],
    highlight: 'Minimalism, containerization & tiny attack surface',
  },
  {
    name: 'Tails OS',
    category: 'Security & Pentest',
    description: 'The Amnesic Incognito Live System designed to preserve privacy, forcing all outgoing connections through Tor.',
    exploredFeatures: ['Tor network routing', 'RAM-only volatile storage', 'Cryptographic key storage', 'Anti-forensics design'],
    highlight: 'Digital privacy, anonymity & memory anti-forensics',
  },
  {
    name: 'NixOS',
    category: 'Customization & Rolling',
    description: 'Declarative operating system with atomic upgrades, reproducibility, and functional package management.',
    exploredFeatures: ['configuration.nix declarations', 'Reproducible builds', 'Rollback generations', 'Isolated development shells'],
    highlight: 'Declarative system architecture & reproducibility',
  },
  {
    name: 'Ubuntu',
    category: 'Everyday',
    description: 'The leading consumer and enterprise Linux platform for development, virtualization, and servers.',
    exploredFeatures: ['Server administration', 'Snap vs deb packaging', 'LTS upgrade cycles', 'Hardware driver integration'],
    highlight: 'General computing & standard deployment workflows',
  },
  {
    name: 'Linux Mint',
    category: 'Everyday',
    description: 'Classic desktop-focused distribution with Cinnamon environment and out-of-the-box multimedia workflow.',
    exploredFeatures: ['Cinnamon environment customization', 'Update management policies', 'Driver manager testing', 'Desktop usability'],
    highlight: 'Desktop environment user ergonomics',
  },
  {
    name: 'Manjaro',
    category: 'Everyday',
    description: 'Accessible Arch-based distro with curating testing branches and Pamac GUI.',
    exploredFeatures: ['Kernel switching utilities', 'Arch-compatibility validation', 'Hardware auto-detection', 'Desktop themes'],
    highlight: 'Streamlined Arch ergonomics & hardware management',
  },
  {
    name: 'Pop!_OS',
    category: 'Everyday',
    description: 'Ubuntu-based OS engineered for developers, featuring auto-tiling windows and native GPU switching.',
    exploredFeatures: ['Auto-tiling window management', 'Hybrid graphics switching', 'COSMIC environment', 'Developer toolchains'],
    highlight: 'Productive developer tiling workflows',
  },
  {
    name: 'openSUSE Tumbleweed',
    category: 'Customization & Rolling',
    description: 'Rolling-release distribution backed by openQA testing, Zypper, and the YaST control center.',
    exploredFeatures: ['YaST system management', 'Btrfs snapshots & snapper rollbacks', 'Zypper package manager', 'RPM builds'],
    highlight: 'Filesystem snapshot rollbacks & deep system config',
  },
  {
    name: 'Puppy Linux',
    category: 'Lightweight & Minimal',
    description: 'Extremely small distro running entirely in computer RAM, ideal for reviving vintage hardware.',
    exploredFeatures: ['RAM load execution', 'SFS package stacking', 'Instant responsiveness on low-spec hardware', 'Rescue media'],
    highlight: 'In-memory operating system execution',
  },
];

export const PYTHON_PROGRAMMING = {
  summary: 'Python is one of the main languages I use for experimentation and project development.',
  focus: "My focus isn't simply learning syntax. I want to use programming as a tool for solving practical problems.",
  areas: [
    'Automation',
    'Security tools',
    'File analysis',
    'Metadata extraction',
    'Networking',
    'Data processing',
    'System utilities',
    'AI/ML experimentation',
    'Small applications',
  ],
};

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    title: 'Programming',
    icon: 'Code',
    skills: [
      'Python',
      'Basic software development',
      'Scripting',
      'Automation',
    ],
  },
  {
    title: 'Cybersecurity',
    icon: 'ShieldCheck',
    skills: [
      'Cybersecurity fundamentals',
      'Penetration-testing concepts',
      'Security research',
      'Metadata analysis',
      'Digital forensics fundamentals',
      'OSINT concepts',
    ],
  },
  {
    title: 'Networking',
    icon: 'Share2',
    skills: [
      'Networking fundamentals',
      'Local network monitoring',
      'Device discovery',
      'Network analysis',
      'Network visualization',
    ],
  },
  {
    title: 'Operating Systems',
    icon: 'Terminal',
    skills: [
      'Linux (25+ distros explored)',
      'Windows',
      'System configuration',
      'Linux administration',
      'Desktop environment customization',
      'System troubleshooting',
    ],
  },
  {
    title: 'Development Tools',
    icon: 'Cpu',
    skills: [
      'Git',
      'GitHub',
      'Docker',
      'Linux Terminal',
    ],
  },
  {
    title: 'AI & Automation',
    icon: 'Bot',
    skills: [
      'AI-assisted development',
      'AI/ML experimentation',
      'Automation workflows',
      'Python-based AI experimentation',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'metadataguard',
    title: 'MetadataGuard',
    subtitle: 'Cybersecurity · Metadata Analysis · Python',
    category: 'Cybersecurity',
    tags: ['Cybersecurity', 'Python', 'Digital Forensics', 'Metadata Analysis', 'Privacy'],
    description: 'MetadataGuard is a cybersecurity-focused project designed around analyzing metadata contained within digital files. Metadata can sometimes reveal information that isn\'t immediately visible from the file itself. This makes metadata analysis useful for privacy awareness, digital forensics, investigations, and security research. The project focuses on making metadata inspection easier and more understandable.',
    concepts: [
      'File metadata',
      'Digital privacy',
      'Information disclosure',
      'Metadata extraction',
      'Digital forensics',
      'File analysis',
      'Security awareness',
    ],
    github: 'https://github.com/joejose2007/metadataguard',
    status: 'featured',
    hasInteractiveDemo: true,
  },
  {
    id: 'local-network-monitor',
    title: 'Local Network Monitor',
    subtitle: 'Cybersecurity · Networking · Monitoring',
    category: 'Networking & Security',
    tags: ['Networking', 'Cybersecurity', 'Monitoring', 'Device Discovery', 'Python'],
    description: 'The Local Network Monitor is a project concept focused on understanding and monitoring devices connected to a local network. Instead of treating networking as something invisible happening in the background, the project aims to make network activity easier to understand. This project combines my interests in networking, cybersecurity, Python, and visualization.',
    concepts: [
      'Local network monitoring',
      'Device discovery',
      'Network traffic concepts',
      'Visual network presentation',
      'Security-oriented overview',
    ],
    potentialCapabilities: [
      'Discover devices on a local network',
      'Display IP addresses',
      'Display MAC addresses',
      'Identify active devices',
      'Monitor changes',
      'Present network information visually',
      'Provide a simple security-oriented overview',
    ],
    status: 'concept',
    hasInteractiveDemo: false,
  },
  {
    id: 'network-visualizer',
    title: 'Network Visualizer',
    subtitle: 'Networking · Visualization · Cybersecurity',
    category: 'Visualization',
    tags: ['Networking', 'Visualization', 'Cybersecurity', 'Interactive Map', 'Security'],
    description: 'Network Visualizer is a project concept designed to visually represent devices and connections within a network. Rather than displaying network information only as text, the goal is to create a more intuitive visual representation: Device → Router → Device → Device, allowing users to interact with the map to understand topology, relationships, and unusual devices.',
    concepts: [
      'Visual topology mapping (Device → Router → Device)',
      'Device relationships & hierarchy',
      'Network structure inspection',
      'IP & connection change detection',
      'Potentially unusual/unauthorized devices identification',
    ],
    potentialCapabilities: [
      'Understand which devices are connected',
      'Inspect device relationships and paths',
      'Analyze network structure visually',
      'Track IP addresses and route changes',
      'Highlight potentially unusual devices',
      'Make networking concepts intuitive to non-specialists',
    ],
    status: 'concept',
    hasInteractiveDemo: true,
  },
];

export const OSINT_DETAILS = {
  title: 'OSINT & Digital Investigation',
  description: 'Another area that interests me is Open-Source Intelligence (OSINT). I\'m interested in how publicly available information can be collected, organized, correlated, and analyzed. The goal is to understand how much information can unintentionally become publicly accessible and how that information can be analyzed responsibly.',
  topics: [
    'Digital footprints',
    'Public information discovery',
    'Metadata correlation',
    'Domain information',
    'Network information',
    'Digital identities',
    'Information correlation',
    'Investigative techniques',
  ],
};

export const AI_AUTOMATION_DETAILS = {
  title: 'AI & Automation',
  description: 'I\'m also interested in the intersection of AI and software development. Rather than treating AI purely as a chatbot, I\'m interested in using it as a development and automation tool. I\'m particularly interested in combining AI + cybersecurity + automation to create practical tools.',
  topics: [
    'AI-assisted programming',
    'Python automation',
    'AI/ML concepts',
    'Local AI models',
    'Developer productivity',
    'Automated analysis',
    'AI-powered utilities',
  ],
};

export const NETWORKING_DETAILS = {
  title: 'Networking',
  description: 'Networking is an important part of my cybersecurity learning. Projects such as Local Network Monitor and Network Visualizer allow me to turn these concepts into practical experiments.',
  topics: [
    'IP addressing',
    'Local networks',
    'Network devices',
    'Ports',
    'Protocols',
    'Network communication',
    'Device discovery',
    'Network monitoring',
    'Basic network security',
  ],
};

export const EXPERIMENTATION_PHILOSOPHY = {
  headline: 'Learning Through Experimentation',
  paragraphs: [
    'A major part of my learning style is experimentation. Instead of only following tutorials, I like taking systems apart, changing configurations, testing different approaches, and figuring out why something works or doesn\'t work.',
    'This has led me to experiment with different Linux distributions, desktop environments, system customization, networking, security tools, Python scripts, AI tools, development environments, and open-source software.',
    'Sometimes the experiment works.',
    'Sometimes it completely breaks the system.',
    'Either way, there\'s usually something to learn.',
  ],
};

export const CAREER_INTERESTS = [
  'Cybersecurity',
  'Security Engineering',
  'Penetration Testing',
  'SOC / Security Operations',
  'Digital Forensics',
  'Network Security',
  'Security Research',
  'Cloud Security',
  'Application Security',
  'Security Automation',
];

export const CURRENTLY_LEARNING = [
  'Data Structures & Algorithms',
  'Computer Networks',
  'Operating Systems',
  'Python',
  'Linux',
  'Cybersecurity',
  'Digital Forensics',
  'Networking',
  'Git & GitHub',
  'Docker',
  'AI/ML',
  'Software Development',
];

export const BUILDING_TOWARD = {
  headline: "What I'm Building Toward",
  text: "My goal isn't to simply collect certificates or list technologies on a resume. I want to build a portfolio that demonstrates actual curiosity, technical experimentation, and problem-solving ability. That means creating projects that solve real problems, demonstrate technical concepts, are understandable to other people, can be tested and improved, are documented publicly, and show progression over time. My portfolio will continue evolving as I learn new technologies and build more ambitious projects.",
};

export const PORTFOLIO_KEYWORDS = [
  'Computer Science',
  'Cybersecurity',
  'Linux',
  'Python',
  'Networking',
  'Penetration Testing',
  'Digital Forensics',
  'OSINT',
  'AI',
  'Automation',
  'Git',
  'GitHub',
  'Docker',
  'Open Source',
  'Network Security',
  'Security Research',
];
