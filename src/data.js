import { GamepadDirectional } from "lucide-react";

export const CONTACT_URL = 'https://wa.me/message/CXY6GG6AUHNRE1';

export const CATEGORIES = [
  { id: 'motion', label: 'Motion design' },
  { id: 'product', label: 'Product design' },
];

export const profile = {
  name: "Maya's Archive",
  shortName: 'Maya',
  location: 'Glasgow, UK',
  bio: "I'm a solo designer making expressive motion and thoughtful products, with the goal to add my own piece of creativity to the digital world.",
  roles: ['Product designer', 'Motion designer'],
  links: [
    { label: 'Instagram', href: 'https://www.instagram.com/mayasarchive.zip/', icon: 'instagram' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@mayasarchive.zip', icon: 'tiktok' },
    { label: 'threads', href: 'https://www.threads.com/@mayasarchive.zip', icon: 'threads' },
    { label: 'X', href: 'https://x.com/mayasarchivezip', icon: 'X' },
  ],
};

export const projects = [
  {
    id: 'arc-browser',
    slug: 'arc-browser',
    title: 'arc browser',
    kicker: 'motion design',
    category: 'motion',
    description: '',
    summary: 'concept ad i made for arc browser, while learning how to make more fast paced work',
    thumbnail: '/assets/Arc-Browser-Ad.mp4',
    media: ['/assets/Arc-Browser-Ad.mp4'],
    tools: ['after effects, affinity'],
    skills: ['motion design'],
    featured: true,
    tone: 'lavender',
  },
  {
    id: 'THE',
    slug: 'theditingco',
    title: 'theditingco web design',
    kicker: 'web design',
    category: 'product',
    description: '',
    summary: 'Portfolio/website designed for theditingco',
    thumbnail: '/assets/the-banner.png',
    media: ['/assets/the-full-breakdown.png'],
    tools: ['react.js, typescript, next.js, css'],
    skills: ['web design'],
    externalUrl: 'https://theditingcompany.vercel.app/',
    featured: true,
    tone: 'lavender',
  },
  {
    id: 'luminate',
    slug: 'luminate',
    title: 'Luminate ad',
    kicker: 'social media ad',
    category: 'motion',
    description: '',
    summary: 'Social media ad i made, for luminate a specialized tech and dev team focusing on building customized digital products and applications.',
    thumbnail: '/assets/luminate-ad-2.mp4',
    media: ['/assets/luminate-ad-2.mp4'],
    tools: ['After Effects'],
    skills: ['Motion design'],
    featured: false,
    tone: 'lavender',
  },
    {
    id: 'edithub',
    slug: 'edithub',
    title: 'edithub product design',
    kicker: 'product design',
    category: 'product',
    description: '',
    summary: 'realised a lot of editors want a marketplace to get scenepacks and editing assets so i made one. Concept work.',
    thumbnail: '/assets/edithub-banner.png',
    media: ['/assets/edithub-1.png', '/assets/edithub-2.png', '/assets/edithub-3.png'],
    tools: ['typescript, next.js, framer'],
    skills: ['web design, product design'],
    externalUrl: 'https://edithub-roan.vercel.app/',
    featured: true,
    tone: 'lavender',
  },
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0];
