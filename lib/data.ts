export interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  features: string[];
  price: string;
  tag: string;
}

export interface PortfolioItem {
  id: string;
  category: string;
  tag: string;
  name: string;
  description: string;
  features: string[];
  image: string | null;
  url?: string;
}

export const products: Product[] = [
  {
    id: 'essential',
    category: 'The Foundation',
    name: 'Essential',
    description: 'A high-performance, single-page architecture designed for maximum impact with minimal friction. Perfect for personal brands and focused startups.',
    features: [
      'Custom Design System',
      'Single-Page Architecture',
      'Framer Motion Animations',
      'Mobile Optimization',
      'SEO Core Setup',
    ],
    price: '$899',
    tag: 'essential',
  },
  {
    id: 'advance',
    category: 'The Ecosystem',
    name: 'Advance',
    description: 'A comprehensive digital ecosystem built for growing brands. Deep architectural integrity and advanced interactive features.',
    features: [
      'Multi-Page Experience',
      'Advanced Interactive 3D',
      'CMS Integration',
      'Priority Engineering Support',
      'Full SEO Suite',
    ],
    price: '$1,999',
    tag: 'advance',
  },
  {
    id: 'custom',
    category: 'The Frontier',
    name: 'Custom',
    description: 'Bespoke architectural solutions for unique demands. We engineer the impossible from the ground up.',
    features: [
      'Unique Architectural Demands',
      'Deep System Integration',
      'Custom WebGL / 3D',
      'Dedicated Infrastructure',
      'Full Scale Strategy',
    ],
    price: 'Custom',
    tag: 'custom',
  },
];

export const portfolio: PortfolioItem[] = [
  {
    id: 'dy7',
    category: 'Football Academy',
    tag: 'nextjs',
    name: 'DY7 Academy',
    description: 'A minimalist website with monochrome aesthetics, fluid motion, and the identity of a modern football academy.',
    features: ['Next.js', 'Live Video'],
    image: null,
    url: 'https://dy7.vercel.app/',
  },
  {
    id: 'sam',
    category: 'Rubber Roller Factory',
    tag: 'nextjs',
    name: 'PT Sugih Arto Moro',
    description: 'A highly interactive dashboard for real-time data visualization and infrastructure monitoring.',
    features: ['Next.js', 'Real-time API'],
    image: null,
    url: 'https://ptsam.net/'
  },
  // {
  //   id: 'monolith-capital',
  //   category: 'Financial Service',
  //   tag: 'business',
  //   name: 'Monolith Capital',
  //   description: 'A sophisticated landing page for a boutique investment firm, emphasizing trust through architectural clarity.',
  //   features: ['Clean Typography', 'Fluid Scroll', 'Professional Aesthetic'],
  //   image: null,
  // },
  // {
  //   id: 'aether-studio',
  //   category: 'Creative Portfolio',
  //   tag: 'design',
  //   name: 'Aether Studio',
  //   description: 'An immersive portfolio experience for a global design agency, pushing the boundaries of web interactions.',
  //   features: ['Custom Shaders', 'Horizontal Scroll', 'Brand Identity'],
  //   image: null,
  // },
];
