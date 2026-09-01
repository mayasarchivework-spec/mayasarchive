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
  ],
};

export const projects = [
  {
    id: 'causal',
    slug: 'causal',
    title: 'causal ad',
    kicker: 'social media ad',
    category: 'motion',
    description: '',
    summary: 'Social media ad i made, for causal. An infinite workspace for your ideas.',
    thumbnail: '/assets/causal_ad.mp4',
    media: ['/assets/causal_ad.mp4'],
    tools: ['After Effects, affinity, framer'],
    skills: ['Motion design'],
    featured: true,
    tone: 'lavender',
  },
  {
    id: 'google m3e',
    slug: 'google-m3e-ad',
    title: 'Google material 3 expressive',
    kicker: 'motion design',
    category: 'motion',
    description: '',
    summary: 'kinetic motion design ad i made for google material 3 expressive, showcasing their ui elements - concept work',
    thumbnail: '/assets/google-m3e-ad.mp4',
    media: ['/assets/google-m3e-ad.mp4'],
    tools: ['aftereffects, affinity'],
    skills: ['motion design'],
    featured: true,
    tone: 'lavender',
  },
    {
    id: 'edithub',
    slug: 'edithub',
    title: 'edithub',
    kicker: 'product design',
    category: 'product',
    description: '',
    summary: 'realised a lot of editors want a marketplace to get scenepacks and editing assets so i made one. Concept work.',
    thumbnail: '/assets/edithub-thumbnail.png',
    media: ['/assets/edithub-case-study.png'],
    tools: ['next.js, css, framer'],
    skills: ['web design, product design'],
    externalUrl: 'https://edithub-app-three.vercel.app/',
    featured: false,
    tone: 'lavender',
  },
/*{
    id: 'ego-death',
    slug: 'ego-death',
    title: 'ego death',
    kicker: 'motion design',
    category: 'motion',
    description: '',
    summary: 'Lyric motion graphics edit for fka twigs ego death',
    thumbnail: '/assets/ego_death.mp4',
    media: ['/assets/ego_death.mp4'],
    tools: ['aftereffects'],
    skills: ['motion design, story telling'],
    featured: false,
    tone: 'lavender',
  },*/
  /*{
    id: 'squarespace ad',
    slug: 'squarespace-ad',
    title: 'squarespace ad',
    kicker: 'motion design',
    category: 'motion',
    description: '',
    summary: 'kinetic motion design ad i made for squarespace - concept work',
    thumbnail: '/assets/Squarespace-ad.mp4',
    media: ['/assets/Squarespace-ad.mp4'],
    tools: ['aftereffects'],
    skills: ['motion design, affinity'],
    featured: false,
    tone: 'lavender',
  },*/
  /*{
    id: 'THE',
    slug: 'theditingco',
    title: 'theditingco',
    kicker: 'web design',
    category: 'product',
    description: '',
    summary: 'Portfolio/website designed for theditingco',
    thumbnail: '/assets/THE-thumbnail.png',
    media: ['/assets/the-full-breakdown.png'],
    tools: ['framer, next.js, css'],
    skills: ['web design'],
    externalUrl: 'https://theditingcompany.vercel.app/',
    featured: false,
    tone: 'lavender',
  },*/
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0];
