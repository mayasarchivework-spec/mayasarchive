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
  bio: "I'm a solo designer making expressive motion and thoughtful products, with the goal to add my own piece of creativity to the the digital world.",
  roles: ['Product designer', 'Motion designer'],
  links: [
    { label: 'Instagram', href: 'https://www.instagram.com/mayasarchive.zip/', icon: 'instagram' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@mayasarchive.zip', icon: 'tiktok' },
    { label: 'email', href: 'mailto:mayasarchive.work@gmail.com', icon: 'mail' },
  ],
};

export const projects = [
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
    featured: true,
    tone: 'lavender',
  },
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0];
