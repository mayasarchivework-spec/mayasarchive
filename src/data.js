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
    'I’m passionate about designing and building immersive digital experiences, from clean ui design to building products that work and marketing with addicting motion.',
    'I make motion that sells and motion that ships — social ads and animated UI for startups and apps.',
    "let's make something good!.",
  ],
  roles: ['Motion Designer','Software Engineer', '3d artist'],
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
    media: [,
     '/assets/luminate-ad-2.mp4',
     '/assets/luminate-sfx.mp4',
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

     {
    id: 'pink-noise',
    slug: 'pink-noise',
    title: 'pink noise',
    media: [
      '/assets/pink-noise.jpg',
    ],
    tools: ['Blender, Affinity'],
    skills: ['3D design, Graphic design'],
    summary: 'design for nothing 4a pro using blender and affinity',
    featured: true,
    category: '3d-works',
    externalUrl: 'https://www.instagram.com/p/DaECfOdiGmN/?img_index=1',
    thumbnail: '/assets/pink-noise.jpg' ,
  },

      {
    id: 'nothing-text',
    slug: 'nothing-text',
    title: 'nothing text',
    media: [
      '/assets/nothing-text.jpg',
    ],
    tools: ['Blender, Affinity'],
    skills: ['3D design, Graphic design'],
    summary: 'design for nothing 4a pro using blender and affinity',
    featured: true,
    category: '3d-works',
    externalUrl: 'https://www.instagram.com/p/DaECfOdiGmN/?img_index=1',
    thumbnail: '/assets/nothing-text.jpg' ,
  },

       {
    id: 'nothing-camera',
    slug: 'nothing-camera',
    title: 'nothing camera',
    media: [
      '/assets/nothing-camera.jpg',
    ],
    tools: ['Blender, Affinity'],
    skills: ['3D design, Graphic design'],
    summary: 'design for nothing 4a pro using blender and affinity',
    featured: true,
    category: '3d-works',
    externalUrl: 'https://www.instagram.com/p/DaECfOdiGmN/?img_index=1',
    thumbnail: '/assets/nothing-camera.jpg' ,
  },
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0];
