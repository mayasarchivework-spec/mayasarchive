export const TELEGRAM_PROFILE_URL = 'https://wa.me/message/CXY6GG6AUHNRE1';

export const CATEGORIES = [
  { id: 'social-media-ads', label: 'motion design' },
  { id: 'product-design', label: 'product design' },
];

export const profile = {
  name: 'maya',
  username: 'mayasarchive',
  location: 'London, UK',
  avatar: '/assets/maya-profile.jpg',
  bio: [
    'I make motion that sells for startups and apps.',
    'I also build product visuals, interface concepts, and little brand systems when the idea needs a fuller world around it.',
  ],
  roles: ['Motion Designer', 'Product Designer', '3D Artist'],
  links: [
    { label: 'Instagram', href: 'https://www.instagram.com/mayasarchive.zip/', icon: 'instagram', target: '_blank', rel: 'noopener noreferrer' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@mayasarchive.zip', icon: 'tiktok', target: '_blank', rel: 'noopener noreferrer' },
    { label: 'email', href: 'mailto:mayasarchive.work@gmail.com', icon: 'Email', target: '_blank', rel: 'noopener noreferrer' },
    { label: 'youtube', href: 'https://www.youtube.com/@mayasarch1ve', icon: 'youtube', target: '_blank', rel: 'noopener noreferrer' },
  ],
};

// Add new work here as you make it. Each project automatically appears on /work.
export const projects = [
  {
    id: 'luminate',
    slug: 'luminate-concept-ad',
    title: 'luminate concept ad',
    media: [
      '/assets/luminate-ad-2.mp4',
      '/assets/luminate-sfx.mp4',
    ],
    tools: ['Adobe After Effects'],
    skills: ['Motion Design'],
    summary: 'Set of clean motion design ads I made while working at luminate-os.',
    featured: true,
    category: 'social-media-ads',
    externalUrl: 'https://www.instagram.com/p/DX4biTToaLT/',
    thumbnail: '/assets/luminate-ad-2.mp4',
  },

  {
    id: 'faircado',
    slug: 'faircado-concept-ad',
    title: 'faircado concept ad',
    media: '/assets/faircado ad final(1).mp4',
    tools: ['Adobe After Effects'],
    skills: ['Motion Design'],
    summary: 'A clean concept ad for Faircado, focused on cosy pacing and flexible text animation.',
    featured: true,
    category: 'social-media-ads',
    externalUrl: 'https://www.instagram.com/reel/DYNALtTIkfj/',
    thumbnail: '/assets/faircado ad final(1).mp4',
  },

  {
    id: 'ots',
    slug: 'ots-logo-animation',
    title: 'ots logo animation',
    media: [
      '/assets/ots-logo-blue.mp4',
      '/assets/ots-logo-yellow.mp4',
    ],
    tools: ['Adobe After Effects'],
    skills: ['Motion Design'],
    summary: 'A logo animation commission for OTS Studio with two colour directions and sound-led pacing.',
    featured: true,
    category: 'social-media-ads',
    externalUrl: 'https://www.youtube.com/watch?v=4avxTWUox-I',
    thumbnail: '/assets/ots-logo-blue.mp4',
  },

  {
    id: 'apple-invites-ad',
    slug: 'apple-invites-ad',
    title: 'apple invites ad',
    media: [
      '/public/assets/Apple-Invites-Ad.mp4',
    ],
    tools: ['Adobe After Effects'],
    skills: ['Motion Design'],
    summary: 'concept ad for apple invites',
    featured: true,
    category: 'social-media-ads',
    externalUrl: 'https://www.youtube.com/watch?v=4avxTWUox-I',
    thumbnail: '/public/assets/Apple-Invites-Ad.mp4',
  },
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0];
