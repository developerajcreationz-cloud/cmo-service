/**
 * Single source of truth for every word and number on the site.
 *
 * Everything marked PLACEHOLDER is stand-in copy so the layout and animations
 * can be reviewed. Replace it with real, verifiable content before launch
 * (real client names, real quotes with permission, real figures).
 */

export const site = {
  url: "https://www.example.com", // PLACEHOLDER: set to the production domain
  name: "Ahmad Jan",
  firstName: "Ahmad",
  role: "Founder of Ajcreationz",
  description:
    "I build and grow digital businesses. A team of specialists delivering premium design, high-performance development, and data-driven growth marketing for ambitious founders and brands.",
  cta: {
    label: "Get in touch",
    shortLabel: "Contact",
    href: "mailto:hello@example.com", // PLACEHOLDER: set to the real contact link
    external: true,
  },
  // Detail pages (/work/[slug], /case-studies/[slug]) are not built yet.
  // Flip to true once they exist and cards will link to them.
  detailPagesLive: false,
};

export const marquee = [
  "SEO",
  "PPC",
  "GEO",
  "Shopify Development",
  "WordPress Development",
  "Go To Market",
  "Premium Design",
  "Growth Marketing",
];

export type Project = {
  slug: string;
  title: string;
  kind: string;
  mat: string; // CSS colour for the card backdrop
  image: string;
};

// Real projects, taken from ajcreationz.co/portfolio
export const projects: Project[] = [
  { slug: "call-time", title: "Call Time", kind: "Brand Identity & Marketing", mat: "#111", image: "/img/work-call-time.webp" },
  { slug: "framily-adventures", title: "Framily Adventures", kind: "Branding & UI/UX Design", mat: "#14231a", image: "/img/work-framily-adventures.webp" },
  { slug: "social-media-creatives", title: "Social Media Creatives", kind: "Marketing & Advertising Creatives", mat: "#111", image: "/img/work-social-media-creatives.webp" },
  { slug: "nayasource", title: "NayaSource", kind: "Branding, UI/UX & Web Development", mat: "#231f20", image: "/img/work-nayasource.webp" },
];

export type Review = {
  text: string;
  name: string;
  role: string;
  slug?: string;
};

// PLACEHOLDER reviews
export const reviews: Review[] = [
  { text: "Placeholder review. Replace with a real client quote about working together on a website build.", name: "Client Name", role: "Founder | Project One", slug: "project-one" },
  { text: "Placeholder review. Replace with a real client quote about speed and quality of delivery.", name: "Client Name", role: "Head of Product | Project Two", slug: "project-two" },
  { text: "Placeholder review. Replace with a real client quote about communication and craft.", name: "Client Name", role: "Founder | Project Three", slug: "project-three" },
  { text: "Placeholder review. Replace with a real client quote about the overall experience.", name: "Client Name", role: "Owner | Project Four", slug: "project-four" },
  { text: "Placeholder review. Replace with a real client quote about a fast launch.", name: "Client Name", role: "Founder | Project Five", slug: "project-five" },
  { text: "Placeholder review. Replace with a real client quote about responsiveness to feedback.", name: "Client Name", role: "Founder | Project Six", slug: "project-six" },
];

// PLACEHOLDER figures
export const stats = [
  { value: 100, suffix: "+", label: "projects completed", tone: "purple" },
  { value: 50, suffix: "+", label: "happy clients", tone: "yellow" },
  { value: 10, suffix: "+", label: "years of experience", tone: "green" },
] as const;

export type CaseStudy = {
  slug: string;
  name: string;
  tag: string;
  stats?: string[];
  challenge?: string;
  image: string;
};

// PLACEHOLDER case studies
export const caseStudies: CaseStudy[] = [
  {
    slug: "case-one",
    name: "Case Study One",
    tag: "Industry | B2B SEO Growth",
    stats: ["Headline result goes here.", "Second supporting result goes here."],
    image: "/img/case-1.svg",
  },
  {
    slug: "case-two",
    name: "Case Study Two",
    tag: "Industry | Newsletter Growth",
    stats: ["Headline result goes here.", "Second supporting result goes here."],
    image: "/img/case-2.svg",
  },
  {
    slug: "case-three",
    name: "Case Study Three",
    tag: "Industry | Shopify E-commerce",
    challenge: "Placeholder challenge statement. Describe the client's problem in one or two sentences.",
    image: "/img/case-3.svg",
  },
  {
    slug: "case-four",
    name: "Case Study Four",
    tag: "B2B SaaS | Google Ads & Lead Generation",
    challenge: "Placeholder challenge statement. Describe the client's problem in one or two sentences.",
    image: "/img/case-4.svg",
  },
];

export const advantage = {
  title: "The Operator’s Advantage",
  note: "I combine an operator’s perspective with hands-on execution to drive measurable growth and long-term value.",
  cols: [
    { dot: "var(--purple)", title: ["Built From", "Experience"], body: "I’ve built businesses, led teams, and managed growth from the operator’s seat, not the sidelines." },
    { dot: "var(--yellow)", title: ["Strategy Through", "Execution"], body: "I connect the bigger picture to the details required to turn ideas into measurable results." },
    { dot: "var(--green)", title: ["Focused On", "Business Outcomes"], body: "Every decision is grounded in revenue, profitability, efficiency, and long-term value." },
  ],
};

export const closing = {
  statement:
    "I value long-term partnerships built on trust, execution, and measurable results. If you believe we’re a good fit, I look forward to discussing how we can build something exceptional together.",
};

export const fcmo = {
  eyebrow: "Fractional CMO & Growth Marketing Partner",
  title: "Senior-level marketing leadership without the full-time executive overhead",
  paras: [
    "I partner directly with founders to build, manage, and improve the systems responsible for generating growth. That means connecting positioning, paid acquisition, content, conversion strategy, technology, and analytics into one coordinated growth function, not handing you another strategy deck and leaving your team to execute it.",
    "As the founder of Ajcreationz, I help startups, ecommerce companies, service businesses, and established organizations turn marketing challenges into structured growth plans. My background combines performance marketing with conversion-focused web development, giving me the ability to evaluate the entire customer journey, from the first impression through the final conversion.",
  ],
  emphasis:
    "I work best with founders who have built something valuable but need an experienced partner to bring direction, accountability, and execution to their marketing.",
  // PLACEHOLDER figures
  stats: [
    { value: "10+", label: "Years experience" },
    { value: "100+", label: "Websites built" },
    { value: "$1M+", label: "Ad spend managed" },
  ],
  highlightsTitle: "Career Highlights",
  // PLACEHOLDER: rewrite with real, verifiable highlights
  highlights: [
    "Years of digital marketing and growth experience",
    "Founder of Ajcreationz, a full-service digital growth agency",
    "Managed advertising accounts across Google, Meta, LinkedIn, YouTube, and Bing",
    "Built and launched Shopify and WordPress websites for growing brands",
    "Developed go-to-market strategies for startups",
    "Built and managed a multidisciplinary team spanning paid media, SEO, design, development, content, analytics, and conversion optimization",
    "Worked across Shopify, WordPress, Webflow, Klaviyo, GA4, GTM, CRM platforms, and marketing automation systems",
    "Supported ecommerce brands, professional services firms, home-service companies, technology businesses, and consumer brands",
  ],
  achievementsTitle: "Selected Achievements",
  // PLACEHOLDER: replace with real, verifiable achievements
  achievements: [
    "Achievement one: add a real, measurable result here",
    "Achievement two: add a real, measurable result here",
    "Achievement three: add a real, measurable result here",
    "Achievement four: add a real, measurable result here",
    "Worked with brands and organizations including:",
  ],
  // PLACEHOLDER logos
  logos: ["Client Logo 1", "Client Logo 2", "Client Logo 3", "Client Logo 4", "Client Logo 5", "Client Logo 6", "Client Logo 7", "Client Logo 8"],
  ownTitle: "What I Own",
  own: [
    { icon: "growth", name: "Growth Strategy", body: "I translate the founder’s objectives into a focused marketing roadmap with clear priorities, channel strategy, budgets, timelines, and performance targets." },
    { icon: "acquisition", name: "Customer Acquisition", body: "I oversee paid acquisition across Google, Meta, Bing, LinkedIn, and YouTube with a focus on customer acquisition cost, lead quality, conversion rate, and return on ad spend." },
    { icon: "outcomes", name: "Funnel and Conversion Strategy", body: "I identify where prospects are dropping off and improve the landing pages, offers, messaging, calls to action, and follow-up systems influencing conversion." },
    { icon: "team", name: "Marketing Team Leadership", body: "I provide direction and accountability across internal employees, freelancers, agencies, and creative partners so the entire marketing function works toward the same objectives." },
    { icon: "analytics", name: "Analytics and Attribution", body: "I establish meaningful reporting around acquisition costs, conversion rates, pipeline value, revenue, and channel performance so decisions are based on business outcomes, not vanity metrics." },
    { icon: "infra", name: "Marketing Infrastructure", body: "I help select and connect the platforms required to support growth, including websites, ecommerce systems, analytics, CRM workflows, email and SMS, automation, and lead tracking." },
  ],
  howTitle: "How I Work",
  how: [
    "I operate as an extension of the leadership team, combining strategic oversight with hands-on execution. Depending on the company’s needs, I can lead the existing marketing team, coordinate outside partners, build the required growth infrastructure, or bring in specialists from my team at Ajcreationz.",
    "The objective is straightforward: create a focused, accountable marketing function that generates measurable progress without requiring the cost or commitment of a full-time CMO.",
  ],
  fitEyebrow: "Best Fit",
  fitTitle: "This partnership is designed for founders who",
  fit: [
    "Have a proven product or service but lack a unified growth strategy",
    "Are investing in marketing without clear accountability or visibility",
    "Need someone capable of managing both strategy and execution",
    "Have multiple agencies, freelancers, or employees working without strong coordination",
    "Want senior marketing leadership before making a full-time executive hire",
    "Value a direct, commercially minded partner who understands the realities of building a business",
  ],
  diffTitle: "The Difference",
  diff: [
    "Most marketing consultants specialize in one channel. My experience spans the full growth system: acquisition, messaging, websites, funnels, conversion optimization, analytics, automation, and team management.",
    "You do not need another vendor completing isolated marketing tasks. You need one person responsible for seeing the entire picture, establishing the right priorities, and moving the work forward.",
  ],
  close: "If you are looking for a growth partner who can bring structure to your marketing, lead execution, and take meaningful ownership of results, let’s talk.",
};

export const pages = {
  work: {
    eyebrow: "Featured Projects",
    title: "Four projects, one operator\u2019s standard",
    note: "Brand identity, UI/UX, web development and marketing creatives for founders and brands.",
  },
  cases: {
    eyebrow: "Case studies",
    title: "What the work actually moved",
    note: "Real projects, real results. The strategy, execution and outcomes behind SEO, PPC, e-commerce and lead generation engagements.",
  },
};
