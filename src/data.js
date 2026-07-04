 export const TELEGRAM_PROFILE_URL = 'https://wa.me/message/CXY6GG6AUHNRE1';

export const CATEGORIES = [
  { id: 'social-media-ads', label: 'motion design' },
  { id: '3d-works',         label: '3D design' },
  { id: 'software',         label: 'software eng' },
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

       {
    id: 'lockette',
    slug: 'lockette',
    title: 'lockette',
    media: [
      '/assets/lockette.png',
    ],
    tools: ['vscode'],
    skills: ['next.js, css'],
    summary: 'study assistant',
    featured: true,
    category: 'software',
    externalUrl: 'https://lockette.uk/',
    thumbnail: '/assets/lockette.png' ,
  },

        {
    id: 'blip',
    slug: 'blip',
    title: 'blip',
    media: [
      '/assets/blip-brand-icon.png',
    ],
    tools: ['vscode'],
    skills: ['next.js, css'],
    summary: '2010 insta inspired social media',
    featured: true,
    category: 'software',
    externalUrl: 'https://myblip.org/',
    thumbnail: '/assets/blip-brand-icon.png' ,
  },

         {
    id: 'finity-hub',
    slug: 'finity-hub',
    title: 'finityhub logo design',
    media: [
      '/assets/finityhub-white.png',
      '/assets/finityhub-black.png',
      'assets/finityhub-green.png',
    ],
    tools: ['vscode'],
    skills: ['next.js, css'],
    summary: 'imaging affinity, my go to for graphic design wanted to make a marketplace for their users to sell assets, this would be their logo, but they are never going to see this',
    featured: true,
    category: '3d-works',
    thumbnail: '/assets/finityhub-black.jpg' ,
  },
 
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0];
