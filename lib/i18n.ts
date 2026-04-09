export type Lang = 'en' | 'zh';

export const translations: Record<Lang, {
  // Hero
  nowBooking: string;
  heroSubtitle: string;
  startProject: string;
  viewWork: string;
  scrollCue: string;
  // Marquee
  marqueeItems: string[];
  // About
  aboutHeadline: string;
  aboutSubHeadline: string;
  aboutBody: string;
  // Services
  servicesLabel: string;
  servicesHeading: string;
  // Work
  workLabel: string;
  workHeading: string;
  viewProject: string;
  // Stats
  stats: { num: string; label: string }[];
  // Pricing
  pricingLabel: string;
  pricingHeading: string;
  mostPopular: string;
  startingAt: string;
  getStarted: string;
  choosePackage: string;
  requestQuote: string;
  // Contact
  contactSection: string;
  contactHeading: string;
  contactSubtitle: string;
  contactEmail: string;
  contactLocation: string;
  // Form
  labelName: string;
  labelEmail: string;
  labelCompany: string;
  labelPhone: string;
  labelPackage: string;
  labelBrief: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderCompany: string;
  placeholderPhone: string;
  placeholderPackage: string;
  placeholderBrief: string;
  sending: string;
  sendMessage: string;
  errorMessage: string;
  successMessage: string;
  // Footer
  footerTagline: string;
  // Lang toggle label
  langToggle: string;
}> = {
  en: {
    nowBooking: 'Now Booking Projects',
    heroSubtitle: 'We design simple, modern websites that help businesses, creators, and brands present themselves clearly and professionally online.',
    startProject: 'Start Your Project',
    viewWork: 'View Work',
    scrollCue: 'Scroll',

    marqueeItems: [
      'Business Websites', '✦', 'Portfolio Websites', '✦',
      'Landing Pages', '✦', 'E-Commerce Websites', '✦',
      'Restaurant Websites', '✦', 'Personal Brand Websites', '✦',
    ],

    aboutHeadline: 'Simple websites, built with purpose.',
    aboutSubHeadline: 'Clear design that helps people understand and trust your brand.',
    aboutBody: "Corpus Project creates clean, modern websites that are easy to use, visually strong, and focused on what matters most — helping your business look professional online.",

    servicesLabel: 'Services',
    servicesHeading: 'What We Build',

    workLabel: 'Portfolio',
    workHeading: 'Recent Projects',
    viewProject: 'View Project',

    stats: [
      { num: '12+',  label: 'Websites Delivered' },
      { num: '100%', label: 'On-Time Delivery' },
      { num: '3',    label: 'Years Active' },
      { num: '3 Mo', label: 'Up to 3 Months of Retainer' },
    ],

    pricingLabel: 'Pricing',
    pricingHeading: 'Website Packages',
    mostPopular: 'Most Popular',
    startingAt: 'Starting At',
    getStarted: 'Get Started',
    choosePackage: 'Choose This Package',
    requestQuote: 'Request a Quote',

    contactSection: '04 / Contact',
    contactHeading: "LET'S TALK.",
    contactSubtitle: "Tell us what you need, and we'll get back to you with a clear plan, timeline, and package recommendation.",
    contactEmail: 'Email',
    contactLocation: 'Location',

    labelName: 'Name',
    labelEmail: 'Email',
    labelCompany: 'Company / Brand',
    labelPhone: 'Phone / WhatsApp',
    labelPackage: 'Package Type',
    labelBrief: 'Project Brief',
    placeholderName: 'Your Name',
    placeholderEmail: 'Email Address',
    placeholderCompany: 'Business or Brand Name',
    placeholderPhone: 'Contact Number',
    placeholderPackage: 'Essential, Advance, or Custom',
    placeholderBrief: 'Tell us about your website or business...',
    sending: 'Sending...',
    sendMessage: 'Send Message',
    errorMessage: 'Unable to send your request right now.',
    successMessage: 'Your request has been sent to Corpus Project.',

    footerTagline: 'All Systems Nominal.',
    langToggle: '廣東話',
  },

  zh: {
    nowBooking: '而家接受新項目',
    heroSubtitle: '我哋幫企業、創作者同品牌，設計簡潔、現代嘅網站，喺網上展現清晰、專業嘅形象。',
    startProject: '開始你嘅項目',
    viewWork: '睇睇作品',
    scrollCue: '向下',

    marqueeItems: [
      '商業網站', '✦', '作品集網站', '✦',
      '落地頁', '✦', '電商網站', '✦',
      '餐廳網站', '✦', '個人品牌網站', '✦',
    ],

    aboutHeadline: '實用嘅網站，用心去做。',
    aboutSubHeadline: '清晰嘅設計，令人更了解同信任你嘅品牌。',
    aboutBody: 'Corpus Project 製作整潔、現代嘅網站，易用、視覺有力，專注最重要嘅一件事 — 幫你嘅生意喺網上展現專業形象。',

    servicesLabel: '服務',
    servicesHeading: '我哋做咩',

    workLabel: '作品集',
    workHeading: '近期項目',
    viewProject: '睇項目',

    stats: [
      { num: '12+',  label: '已交付網站' },
      { num: '100%', label: '準時交付率' },
      { num: '3',    label: '營運年數' },
      { num: '3個月', label: '最多3個月維護服務' },
    ],

    pricingLabel: '定價',
    pricingHeading: '網站套餐',
    mostPopular: '最多人選',
    startingAt: '起價',
    getStarted: '立即開始',
    choosePackage: '選擇呢個套餐',
    requestQuote: '索取報價',

    contactSection: '04 / 聯絡我哋',
    contactHeading: '傾下計。',
    contactSubtitle: '告訴我哋你需要咩，我哋會盡快回覆你，附上清晰計劃、時間表同套餐建議。',
    contactEmail: '電郵',
    contactLocation: '地點',

    labelName: '姓名',
    labelEmail: '電郵',
    labelCompany: '公司 / 品牌',
    labelPhone: '電話 / WhatsApp',
    labelPackage: '套餐類型',
    labelBrief: '項目簡介',
    placeholderName: '你嘅姓名',
    placeholderEmail: '電郵地址',
    placeholderCompany: '業務或品牌名稱',
    placeholderPhone: '聯絡號碼',
    placeholderPackage: 'Essential、Advance 或 Custom',
    placeholderBrief: '告訴我哋你嘅網站或業務需求...',
    sending: '傳送中...',
    sendMessage: '傳送訊息',
    errorMessage: '暫時無法傳送你嘅請求。',
    successMessage: '你嘅請求已傳送至 Corpus Project。',

    footerTagline: '一切正常運作。',
    langToggle: 'EN',
  },
};

export const serviceTranslations: Record<Lang, { name: string; desc: string }[]> = {
  en: [
    { name: 'Business Websites',         desc: 'Professional websites for businesses that want to build trust, explain their services clearly, and attract more customers online.' },
    { name: 'Portfolio Websites',         desc: 'Clean and modern websites to showcase your work, projects, services, or personal brand in a simple and credible way.' },
    { name: 'Landing Pages',              desc: 'Focused one-page websites designed to present an offer clearly and encourage visitors to get in touch or take action.' },
    { name: 'Custom Website Solutions',   desc: 'Tailored websites built around your business needs, goals, and content without forcing you into a one-size-fits-all template.' },
    { name: 'Responsive Website Design',  desc: 'Websites that look good and work smoothly on desktop, tablet, and mobile so every visitor gets a better experience.' },
    { name: 'Website Support & Updates',  desc: 'Ongoing help with edits, improvements, and maintenance after launch so your website stays current and reliable.' },
  ],
  zh: [
    { name: '商業網站',       desc: '為想建立信任、清晰介紹服務、吸引更多客戶上網搵你嘅企業而設嘅專業網站。' },
    { name: '作品集網站',     desc: '簡潔現代嘅網站，以清晰可信嘅方式展示你嘅作品、項目、服務或個人品牌。' },
    { name: '落地頁',         desc: '專注單頁網站，清晰呈現優惠，鼓勵訪客聯絡或採取行動。' },
    { name: '客製化網站方案', desc: '圍繞你嘅業務需求、目標同內容而建，唔會迫你用一刀切嘅模板。' },
    { name: '響應式網站設計', desc: '喺桌面、平板同手機都好睇、流暢運作，讓每位訪客都有更好嘅體驗。' },
    { name: '網站維護同更新', desc: '上線後持續提供修改、改善同維護，確保你嘅網站保持最新狀態，穩定可靠。' },
  ],
};

export const productTranslations: Record<Lang, Record<string, {
  category: string;
  description: string;
  features: string[];
}>> = {
  en: {
    essential: {
      category: 'The Foundation',
      description: 'A high-performance, single-page architecture designed for maximum impact with minimal friction. Perfect for personal brands and focused startups.',
      features: ['Custom Design System', 'Single-Page Architecture', 'Framer Motion Animations', 'Mobile Optimization', 'SEO Core Setup'],
    },
    advance: {
      category: 'The Ecosystem',
      description: 'A comprehensive digital ecosystem built for growing brands. Deep architectural integrity and advanced interactive features.',
      features: ['Multi-Page Experience', 'Advanced Interactive 3D', 'CMS Integration', 'Priority Engineering Support', 'Full SEO Suite'],
    },
    custom: {
      category: 'The Frontier',
      description: 'Bespoke architectural solutions for unique demands. We engineer the impossible from the ground up.',
      features: ['Unique Architectural Demands', 'Deep System Integration', 'Custom WebGL / 3D', 'Dedicated Infrastructure', 'Full Scale Strategy'],
    },
  },
  zh: {
    essential: {
      category: '基礎版',
      description: '高效能單頁架構，以最少阻力帶來最大衝擊。適合個人品牌同專注型初創企業。',
      features: ['客製化設計系統', '單頁架構', 'Framer Motion 動畫', '手機優化', 'SEO 基礎設定'],
    },
    advance: {
      category: '生態系統版',
      description: '為成長中嘅品牌而建嘅完整數碼生態系統，具備深度架構完整性同高級互動功能。',
      features: ['多頁面體驗', '高級互動 3D', 'CMS 整合', '優先工程支援', '完整 SEO 套件'],
    },
    custom: {
      category: '前沿版',
      description: '針對獨特需求嘅訂製架構解決方案，我哋由零開始打造不可能嘅事。',
      features: ['獨特架構需求', '深度系統整合', '客製化 WebGL / 3D', '專屬基礎設施', '全面規模策略'],
    },
  },
};

export const portfolioTranslations: Record<Lang, Record<string, { description: string }>> = {
  en: {
    'corpus-v1':        { description: 'The initial prototype for our own digital presence, exploring monochrome aesthetics and fluid motion.' },
    'nexus-labs':       { description: 'A highly interactive dashboard for real-time data visualization and infrastructure monitoring.' },
    'monolith-capital': { description: 'A sophisticated landing page for a boutique investment firm, emphasizing trust through architectural clarity.' },
    'aether-studio':    { description: 'An immersive portfolio experience for a global design agency, pushing the boundaries of web interactions.' },
  },
  zh: {
    'corpus-v1':        { description: '我哋自家數碼存在嘅初期原型，探索黑白美學與流動動態。' },
    'nexus-labs':       { description: '用於即時數據可視化同基礎設施監控嘅高互動儀表板。' },
    'monolith-capital': { description: '為精品投資公司設計嘅精緻落地頁，透過建築感清晰度強調信任。' },
    'aether-studio':    { description: '為環球設計機構打造嘅沉浸式作品集體驗，突破網頁互動嘅界限。' },
  },
};
