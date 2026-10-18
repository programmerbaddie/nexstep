export interface UserProfile {
  name: string
  handle: string
  email: string
  avatar: string
  major: string
  university: string
  year: string
  targetRole: string
  gpa: number
  streakDays: number
  bio: string
  skills: string[]
  interests: string[]
  academicLoad: 'light' | 'moderate' | 'heavy'
  chosenCompanion: string // e.g. 'nova'
  companionCustomName: string // e.g. 'Nova'
}

export interface Companion {
  id: string
  name: string
  emoji: string
  tagline: string
  personality: string
  color: string
  avatarBg: string
  avatarBorder: string
  description: string
  greeting: string
}

export const COMPANIONS: Companion[] = [
  {
    id: 'nova',
    name: 'Nova',
    emoji: '🌱',
    tagline: 'The Calming Sprout',
    personality: 'Gentle & Grounding',
    color: '#7EC8A5',
    avatarBg: 'bg-emerald-50',
    avatarBorder: 'border-emerald-200',
    description: 'Specializes in burnout prevention, pacing heavy CS coursework, and mindful breathing breaks.',
    greeting: "Remember: small daily commits lead to monumental breakthroughs. Let's take it one step at a time.",
  },
  {
    id: 'byte',
    name: 'Byte',
    emoji: '⚡',
    tagline: 'The Curious Bot',
    personality: 'Energized & Focused',
    color: '#FBD38D',
    avatarBg: 'bg-amber-50',
    avatarBorder: 'border-amber-200',
    description: 'Thrives on deep work sprint blocks, clean system architecture, and algorithmic mastery.',
    greeting: "High bandwidth detected! Let's lock in and crack that distributed consensus lab today.",
  },
  {
    id: 'lumi',
    name: 'Lumi',
    emoji: '✨',
    tagline: 'The Guiding Star',
    personality: 'Strategic & Ambitious',
    color: '#D3C5F5',
    avatarBg: 'bg-purple-50',
    avatarBorder: 'border-purple-200',
    description: 'Guides your career trajectory: internship applications, hackathons, and technical interview roadmaps.',
    greeting: "Your career milestones are aligning. Every application and problem solved compounds your value.",
  },
  {
    id: 'zen',
    name: 'Zen',
    emoji: '🍃',
    tagline: 'The Mindful Sage',
    personality: 'Peaceful & Reflective',
    color: '#A5D8F3',
    avatarBg: 'bg-sky-50',
    avatarBorder: 'border-sky-200',
    description: 'Protects mental equilibrium during midterms, reduces cognitive fatigue, and encourages guilt-free rest.',
    greeting: "Breathe in clarity, breathe out pressure. Your worth is never measured by compile errors.",
  },
]

export interface ConnectedService {
  id: string
  name: string
  category: 'academic' | 'career' | 'productivity' | 'wellbeing'
  icon: string
  status: 'connected' | 'disconnected'
  lastSync?: string
  description: string
  stats?: string
  requiredInOnboarding?: boolean
}

export interface DailyCheckinRecord {
  date: string
  feeling?: 'great' | 'busy' | 'overwhelmed' | 'exhausted' | 'lost'
  attention?: 'Exams' | 'Assignments' | 'Internship' | 'Hackathon' | 'Personal'
  energy?: number // 1-5
  stress?: number // 1-5
  mood?: 'energized' | 'calm' | 'neutral' | 'overwhelmed' | 'tired'
  journalPrompt?: string
  notes?: string
  topGoal?: string
}

export interface ActionItem {
  id: string
  title: string
  category: 'academic' | 'career' | 'wellbeing'
  courseOrCompany?: string
  dueText: string
  estimatedMinutes: number
  priority: 'high' | 'medium' | 'low'
  completed: boolean
  aiReasoning: string
}

export interface CareerOpportunity {
  id: string
  title: string
  company: string
  location: string
  type: 'Internship' | 'Hackathon' | 'Research' | 'Open Source'
  deadline: string
  tags: string[]
  matchScore: number
  link: string
  description: string
}

export interface CalendarEvent {
  id: string
  title: string
  time: string
  duration: string
  type: 'class' | 'study' | 'career' | 'break' | 'exam'
  location?: string
}

export const INITIAL_USER: UserProfile = {
  name: 'Alex Rivera',
  handle: '@alexrivera_cs',
  email: 'alex.rivera@cs.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  major: 'Computer Science & AI',
  university: 'University Tech Institute',
  year: 'Junior (3rd Year)',
  targetRole: 'SWE & Distributed Systems Intern',
  gpa: 3.84,
  streakDays: 14,
  bio: 'CS junior navigating algorithms, distributed systems, and interview prep while trying not to burn out. Building high-throughput systems and loving calm morning coffee.',
  skills: ['React', 'TypeScript', 'Go', 'Python', 'Docker', 'PostgreSQL', 'Data Structures & Algos'],
  interests: ['System Architecture', 'LLM Agents', 'Mindfulness in Tech', 'Hackathons'],
  academicLoad: 'heavy',
  chosenCompanion: 'nova',
  companionCustomName: 'Nova',
}

export const INITIAL_SERVICES: ConnectedService[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'productivity',
    icon: 'Mail',
    status: 'connected',
    lastSync: '8 mins ago',
    description: 'Syncs interview invitations, campus updates, and professor office hours.',
    stats: 'Inbox synced · 1 interview update',
    requiredInOnboarding: true,
  },
  {
    id: 'google_calendar',
    name: 'Google Calendar',
    category: 'productivity',
    icon: 'Calendar',
    status: 'connected',
    lastSync: '5 mins ago',
    description: 'Unified view of lectures, study blocks, interview dates, and downtime.',
    stats: '5 events today · 2 study blocks',
    requiredInOnboarding: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'career',
    icon: 'Github',
    status: 'connected',
    lastSync: '12 mins ago',
    description: 'Track commit consistency, project repos, and open-source contributions.',
    stats: '14 day commit streak · 18 repos',
    requiredInOnboarding: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'career',
    icon: 'Linkedin',
    status: 'connected',
    lastSync: '1 hour ago',
    description: 'Monitors recruiter inbound inquiries, alumni network, and hiring cycles.',
    stats: 'Profile active · 4 recruiter views',
    requiredInOnboarding: true,
  },
  {
    id: 'unstop',
    name: 'Unstop',
    category: 'career',
    icon: 'Trophy',
    status: 'disconnected',
    description: 'Discover collegiate hackathons, coding challenges, and case competitions.',
    stats: 'Optional integration',
    requiredInOnboarding: false,
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'productivity',
    icon: 'FileText',
    status: 'connected',
    lastSync: '2 hours ago',
    description: 'Pull lecture notes, project roadmaps, and personal journals.',
    stats: 'Coursework workspace synced',
    requiredInOnboarding: false,
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    category: 'academic',
    icon: 'GraduationCap',
    status: 'connected',
    lastSync: '40 mins ago',
    description: 'Sync deadlines, assignment grades, announcements, and syllabus dates.',
    stats: '4 courses synced · 2 upcoming assignments',
    requiredInOnboarding: false,
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    category: 'career',
    icon: 'Code2',
    status: 'connected',
    lastSync: '3 hours ago',
    description: 'Monitors problem-solving cadence without toxic grind pressure.',
    stats: '142 Solved (68 Medium) · Top 18%',
    requiredInOnboarding: false,
  },
  {
    id: 'spotify',
    name: 'Spotify Focus',
    category: 'wellbeing',
    icon: 'Music2',
    status: 'connected',
    lastSync: 'Yesterday',
    description: 'Syncs calm lofi beats and binaural soundscapes during focus sessions.',
    stats: 'Lo-fi Study Beats synced',
    requiredInOnboarding: false,
  },
]

export const INITIAL_ACTION_ITEMS: ActionItem[] = [
  {
    id: 'act-1',
    title: 'Complete Distributed Systems: Raft Consensus Lab 2B',
    category: 'academic',
    courseOrCompany: 'CS 452: Distributed Systems',
    dueText: 'Tomorrow, 11:59 PM',
    estimatedMinutes: 90,
    priority: 'high',
    completed: false,
    aiReasoning: 'Critical assignment weighted 15% of grade. You usually focus best in 45-min sprints.',
  },
  {
    id: 'act-2',
    title: 'Solve 1 Medium Dynamic Programming Problem (Coin Change)',
    category: 'career',
    courseOrCompany: 'Technical Interview Prep',
    dueText: 'Today, 5:00 PM',
    estimatedMinutes: 35,
    priority: 'medium',
    completed: false,
    aiReasoning: 'Reinforces yesterday’s recursion tree notes while keeping your problem-solving momentum intact.',
  },
  {
    id: 'act-3',
    title: 'Unplug & Take a 15-Minute Sunlight Walk',
    category: 'wellbeing',
    courseOrCompany: 'Wellbeing Ritual',
    dueText: 'After current study block',
    estimatedMinutes: 15,
    priority: 'high',
    completed: false,
    aiReasoning: 'Your last check-in recorded a stress level of 4/5. Resetting your nervous system prevents mid-afternoon burnout.',
  },
  {
    id: 'act-4',
    title: 'Submit Application for Stripe Fall 2026 SWE Internship',
    category: 'career',
    courseOrCompany: 'Stripe Careers',
    dueText: 'In 3 days',
    estimatedMinutes: 25,
    priority: 'medium',
    completed: false,
    aiReasoning: 'Matches your Go and Distributed Systems profile with a 94% alignment score.',
  },
  {
    id: 'act-5',
    title: 'Review Algorithms Lecture Slides: Network Flow (Max-Flow)',
    category: 'academic',
    courseOrCompany: 'CS 320: Algorithms',
    dueText: 'Thursday, 9:00 AM',
    estimatedMinutes: 40,
    completed: true,
    priority: 'low',
    aiReasoning: 'Light review to prepare for Friday recitation session.',
  },
]

export const DISCOVER_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'disc-1',
    title: 'Software Engineering Intern — Core Infrastructure',
    company: 'Stripe',
    location: 'San Francisco, CA / Hybrid',
    type: 'Internship',
    deadline: 'Rolling (Closes in 5 days)',
    tags: ['Go', 'Distributed Systems', 'APIs', 'High Impact'],
    matchScore: 95,
    link: 'https://stripe.com/jobs',
    description: 'Work on payment reliability engines and low-latency financial rails. Highly relevant to your coursework in CS 452.',
  },
  {
    id: 'disc-2',
    title: 'HackTheNorth 2026 — Premier Student Hackathon',
    company: 'Waterloo & Tech Partners',
    location: 'Waterloo, ON / Hybrid',
    type: 'Hackathon',
    deadline: 'Nov 12, 2026',
    tags: ['36-Hour Build', 'Mentorship', 'Hardware Lab', 'Networking'],
    matchScore: 90,
    link: 'https://hackthenorth.com',
    description: 'Connect with 1,000+ passionate student hackers. Perfect venue to build and launch an AI-driven dev tool.',
  },
  {
    id: 'disc-3',
    title: 'Open Source Contributor: Supabase Auth & Realtime',
    company: 'Supabase OSS',
    location: 'Remote',
    type: 'Open Source',
    deadline: 'Open Community',
    tags: ['TypeScript', 'Elixir', 'Good First Issue', 'Mentored'],
    matchScore: 88,
    link: 'https://github.com/supabase/supabase',
    description: 'Great beginner-friendly issues labeled `good-first-issue` on developer tooling and client SDKs.',
  },
  {
    id: 'disc-4',
    title: 'Undergraduate AI Systems Research Assistant',
    company: 'Institute for Intelligent Systems',
    location: 'On Campus',
    type: 'Research',
    deadline: 'Nov 30, 2026',
    tags: ['PyTorch', 'Model Quantization', 'Co-Authorship', 'Stipend'],
    matchScore: 84,
    link: '#',
    description: 'Collaborate with PhD candidates investigating energy-efficient transformer inference on consumer devices.',
  },
]

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'CS 452: Distributed Systems Lecture',
    time: '10:00 AM - 11:30 AM',
    duration: '1h 30m',
    type: 'class',
    location: 'Hall B, Engineering Annex',
  },
  {
    id: 'ev-2',
    title: 'Calm Reset & Nutritious Lunch',
    time: '12:00 PM - 1:00 PM',
    duration: '1h',
    type: 'break',
    location: 'Campus Courtyard',
  },
  {
    id: 'ev-3',
    title: 'Deep Work: Raft Consensus Implementation',
    time: '1:30 PM - 3:30 PM',
    duration: '2h',
    type: 'study',
    location: 'Library Quiet Pod #4',
  },
  {
    id: 'ev-4',
    title: 'Mock Technical Interview with Peer Mentor',
    time: '4:15 PM - 5:00 PM',
    duration: '45m',
    type: 'career',
    location: 'Google Meet',
  },
  {
    id: 'ev-5',
    title: 'Midterm 2: Algorithms & Complexity',
    time: 'Tomorrow, 2:00 PM',
    duration: '2h',
    type: 'exam',
    location: 'Auditorium A',
  },
]

export const CALM_QUOTES = [
  {
    quote: "You don't have to code 14 hours a day to become a phenomenal engineer. Consistency and clarity outperform exhausting sprints.",
    author: "NexStep Wellbeing Guide",
  },
  {
    quote: "Bugs in code are just unfinished thoughts. Breathe, take a walk, and the solution will reveal itself.",
    author: "Tech Mindfulness Principle",
  },
  {
    quote: "Celebrate the small wins: clean commits, passed tests, and taking breaks when your mind whispers for rest.",
    author: "Daily Reminder",
  },
]
