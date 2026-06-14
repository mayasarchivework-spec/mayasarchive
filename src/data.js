export const TELEGRAM_PROFILE_URL = 'https://wa.me/message/CXY6GG6AUHNRE1';

export const CATEGORIES = [
  { id: 'social-media-ads', label: 'motion design' },
  { id: '3d-works',         label: '3D works' },
  { id: 'software',         label: 'software engineering' },
];

export const profile = {
  name: 'maya',
  username: 'mayasarchive',
  location: 'London, UK',
  avatar: '/assets/maya-profile.jpg',
  bio: [
    "I’m a 16-year-old self-taught motion designer.",
    'I’m passionate about designing and building immersive digital experiences, from clean ui design to building products that work and marketing with addicting motion.',
    'I make motion that sells and motion that ships — social ads and animated UI for startups and apps.',
    "let's make something good!.",
  ],
  roles: ['Motion Designer','Software Engineer', '3d artist'],
  links: [
    { label: 'Instagram', href: 'https://www.instagram.com/mayasarchive.zip/', icon: 'instagram', target: '_blank', rel: 'noopener noreferrer' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@mayasarchive.zip', icon: 'tiktok', target: '_blank', rel: 'noopener noreferrer' },
    { label: 'YouTube', href: 'https://www.youtube.com/@mayasarch1ve', icon: 'youtube', target: '_blank', rel: 'noopener noreferrer' },
    { href: 'mailto:mayasarchive.work@gmail.com', label: 'Email', icon: 'email', target: '_blank', rel: 'noopener noreferrer' },
  ],
};

// Add new work here as you make it. Each project automatically appears on /work.
export const projects = [
  {
    id: 'luminate',
    slug: 'luminate-concept-ad',
    title: 'luminate concept ad',
    media: [
     '/assets/luminate-sfx.mp4',
     '/assets/luminate-ad-2.mp4',
    ],
    tools: ['Adobe After Effects'],
    skills: ['Motion Design'],
    summary: 'Set of clean motion design ads i made while working at luminate-os.',
    featured: true,
    category: 'social-media-ads',
    externalUrl: 'https://www.instagram.com/p/DX4biTToaLT/',
    thumbnail: '/assets/luminate-ad-2.mp4',
  },

  {
    id: 'blip',
    slug: 'blip',
    title: 'blip',
    media: [
     '/assets/blip-logo.png',
    ],
    tools: ['next.js(react), typescript'],
    skills: ['website design', 'website development, basic backend development'],
    summary: '2010 inspired social media',
    featured: true,
    category: 'software',
    externalUrl: 'https://myblip.ord/',
    thumbnail: '/assets/blip-logo.png',
  },

  {
    id: 'faircado',
    slug: 'faircado-concept-ad',
    title: 'faircado concept ad',
    media: '/assets/faircado ad final(1).mp4',
    tools: ['Adobe After Effects'],
    skills: ['Motion Design'],
    summary: 'A clean concept ad exploring for faircado, focusing on cozy and smooth flexible looking text animations',
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
      '/assets/ots logo animation blue sfx.mp4',
      '/assets/ots logo animation yellow sfx.mp4',
    ],
    tools: ['Adobe After Effects'],
    skills: ['Motion Design'],
    summary: 'logo animation commission i made for ots studio',
    featured: true,
    category: 'social-media-ads',
    externalUrl: 'https://www.youtube.com/watch?v=4avxTWUox-I',
    thumbnail: '/assets/ots logo animation blue sfx.mp4',
  },
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0];
