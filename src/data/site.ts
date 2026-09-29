export const person = {
  name: "Nkechi Emechukwu",
  first: "Nkechi",
  last: "Emechukwu",
  title: "Automation & Workflow Systems Specialist",
  role: "Automation Expert",
  tagline:
    "Helping businesses automate processes, eliminate manual tasks, and scale with clean, efficient systems",
  location: "Ghana",
  phone: "+233536510628",
  email: "nkechieme.ada@gmail.com",
  upwork:
    "https://www.upwork.com/freelancers/~01df782906fa3c5051?s=1110580764771602432",
  vaSite: "https://emexhukwu-nkechi-isaac-portfolio.vercel.app/",
};

export const mailto = `mailto:${person.email}`;

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Tools & Stack", href: "/#tools" },
  { label: "Projects", href: "/#projects" },
  { label: "Why Choose Me", href: "/#why-choose" },
  { label: "Contact", href: "/#contact" },
];

export const about = {
  intro:
    "Most businesses lose valuable time and revenue because their processes depend on manual updates, scattered tools, and inconsistent follow-ups. I fix that by building automated systems that run reliably in the background—keeping operations organized, responsive, and scalable without extra effort.",
  paragraphs: [
    "I'm Nkechi Emechukwu, an Automation & Systems Specialist with hands-on experience creating workflows, API integrations, data pipelines, CRM automations, and end-to-end operational systems for small businesses, agencies, consultants, and fast-growing teams.",
    "With a background in computer engineering and real-world technical operations, I help businesses eliminate manual data entry, streamline communication, improve pipeline visibility, close operational gaps, prevent revenue leakage, and reduce administrative workload by 50–80%.",
  ],
  results: [
    "Less admin workload",
    "Faster response times",
    "Clearer pipelines",
    "Consistent client communication",
    "50–80% time saved on routine tasks",
  ],
  approachLead: "My approach is simple:",
  approachStrong: "automation that is stable, practical, and business-focused",
  approachTail: "—never over-complicated or fragile. Just processes that work and keep working.",
};

export const services = [
  {
    title: "Automation & Workflow Development",
    items: [
      "Zapier, Make.com, n8n automations",
      "Custom workflow architecture",
      "Multi-step data transformations",
      "Google Apps Script for Sheets/Calendar",
      "Lead routing & follow-up automation",
      "AI-triggered workflows (ChatGPT in GHL)",
    ],
  },
  {
    title: "API Integrations",
    items: [
      "Postman testing",
      "Webhook setup & mapping",
      "Custom JS formatting scripts",
      "GHL, WordPress, SiteGround, CRM APIs",
      "External platform → CRM syncing",
    ],
  },
  {
    title: "CRM & Pipeline Automation",
    items: [
      "GoHighLevel workflow builds",
      "Tagging logic",
      "Smart Lists & segmentation",
      "Appointment automation",
      "Internal notifications",
      "Lead scoring",
      "Triggers based on AI-generated replies",
    ],
  },
  {
    title: "Data Processing & Operational Systems",
    items: [
      "Data extraction",
      "Data cleaning & formatting",
      "Google Sheets automation",
      "Automated reminders",
      "Calendar → Task systems",
      "Dashboard-ready data pipelines",
    ],
  },
];

export const toolsIntro =
  "I work with industry-leading automation platforms, APIs, and CRM tools to build reliable, scalable systems.";

export const toolGroups = [
  {
    title: "Automation Platforms",
    tools: [
      { name: "Zapier", logo: "zapier logo.png" },
      { name: "Make.com", logo: "make logo.jpg" },
      { name: "n8n", logo: "n8n logo.png" },
      { name: "Google Apps Script", logo: "google apps script logo.png" },
      { name: "ChatGPT Automations", logo: "chatgpt automations logo.png" },
      { name: "Webhooks", logo: "webhooks logo.png" },
    ],
  },
  {
    title: "APIs & Development",
    tools: [
      { name: "Postman", logo: "postman logo.png" },
      { name: "JavaScript", logo: "javascript logo.png" },
      { name: "Python", logo: "python logo.jpg" },
      { name: "JSON Mapping", logo: "json logo.png" },
      { name: "FastAPI", logo: "fastapi_python_logo.png" },
      { name: "Vercel", logo: "vercel_logo.png" },
      { name: "OpenAI API", logo: "openapi_logo.png" },
      { name: "Pinecone", logo: "pinecone-logo.png" },
      { name: "Redis", logo: "redis_logo.png" },
    ],
  },
  {
    title: "CRM / Ops Tools",
    tools: [
      { name: "GoHighLevel", logo: "ghl logo.png" },
      { name: "WordPress", logo: "wordpress logo.png" },
      { name: "SiteGround", logo: "siteground logo.png" },
      { name: "Trello", logo: "trello logo.png" },
      { name: "Slack", logo: "slack logo.png" },
      { name: "Gmail", logo: "gmail logo.png" },
      { name: "Typeform", logo: "typeform logo.png" },
      { name: "Notion", logo: "notion logo.png" },
      { name: "Google Sheets", logo: "google sheets logo.png" },
      { name: "Google Calendar", logo: "google calendar logo.png" },
      { name: "Airtable", logo: "airtable logo.png" },
      { name: "HubSpot", logo: "hubspot logo.png" },
    ],
  },
];

export const toolCount = toolGroups.reduce((n, g) => n + g.tools.length, 0);

export const whyMe = [
  {
    title: "Reliable, Structured Systems",
    text: "I build automations that actually work—no breaking, no confusion, just clean processes you can depend on.",
  },
  {
    title: "Clear Communication",
    text: "You always know what has been done, what's next, and what is automated. No guesswork.",
  },
  {
    title: "Technical & Business Understanding",
    text: "I combine engineering logic with operational simplicity—building systems that make business sense.",
  },
  {
    title: "Zero-Micromanagement Needed",
    text: "Once I understand the process, I own it fully. You get updates, not constant questions.",
  },
  {
    title: "Real-World Experience",
    text: "I've built systems for real businesses with real data, real clients, and real results.",
  },
  {
    title: "Focus on Impact",
    text: "Every automation I build is designed to save time, reduce errors, and improve operations—not just to look impressive.",
  },
];

export const contact = {
  text: "Ready to automate your business processes? Let's connect and discuss how I can help you scale with automation.",
};
