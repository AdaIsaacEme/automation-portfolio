// Answer-engine (AEO) and generative-engine (GEO) content: plain, factual
// answers and structured data that search engines and AI assistants can quote.
import { person } from "./site";

export const SITE_URL = "https://emechukwu-nkechi-automation-portfolio.vercel.app";
export const VA_SITE_URL = "https://emexhukwu-nkechi-isaac-portfolio.vercel.app";
export const LINKEDIN = "https://www.linkedin.com/in/nkechi-e-387004328/";

/** One sentence that answers "who is this and what do they do?" */
export const summary =
  "Nkechi Emechukwu is an Automation & Workflow Systems Specialist based in Ghana who builds Zapier, Make.com, n8n and GoHighLevel automations, API integrations, CRM pipelines and AI-powered workflows for small businesses, agencies, consultants and fast-growing teams, working remotely with clients worldwide.";

export const faq = [
  {
    q: "What does Nkechi Emechukwu do?",
    a: "Nkechi Emechukwu is an Automation & Workflow Systems Specialist. She builds automated workflows, API integrations, data pipelines, CRM automations and end-to-end operational systems that remove manual work for small businesses, agencies, consultants and fast-growing teams.",
  },
  {
    q: "Which automation tools does she work with?",
    a: "Zapier, Make.com, n8n, Google Apps Script, webhooks and ChatGPT/OpenAI automations; Postman, JavaScript, Python, JSON mapping, FastAPI, Vercel, Pinecone and Redis for APIs and development; and GoHighLevel, HubSpot, Airtable, Notion, Trello, Slack, Gmail, Google Sheets, Google Calendar, Typeform, WordPress and SiteGround on the CRM and operations side.",
  },
  {
    q: "Can she automate GoHighLevel (GHL)?",
    a: "Yes. She builds GoHighLevel workflows, tagging logic, smart lists and segmentation, appointment automation, internal notifications, lead scoring, calendar-to-pipeline updates and WhatsApp keyword replies, and connects GHL to external tools through webhooks and APIs.",
  },
  {
    q: "Can she build an AI chatbot or AI assistant connected to a CRM?",
    a: "Yes. Her flagship project is a custom AI sales qualification engine: GoHighLevel sends messages by webhook to a FastAPI service on Vercel that uses OpenAI for reasoning, Pinecone for retrieval-augmented generation (RAG) and Redis for memory, then updates the CRM pipeline. It works across WhatsApp, Instagram DMs and website chat.",
  },
  {
    q: "How much time can workflow automation save?",
    a: "Her automations typically cut 50–80% of the time spent on routine admin tasks such as manual data entry, follow-ups, reminders and pipeline updates.",
  },
  {
    q: "Does she work with clients outside Ghana?",
    a: "Yes. All work is done remotely, so she works with clients in any location. She is also available on Upwork.",
  },
  {
    q: "How do I hire Nkechi for an automation project?",
    a: `Email ${person.email} or message her on Upwork with a short description of the process you want to automate. She also offers virtual assistant and operations support at ${VA_SITE_URL}.`,
  },
];

export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: person.name,
  jobTitle: person.title,
  description: summary,
  url: SITE_URL,
  email: `mailto:${person.email}`,
  telephone: person.phone,
  address: { "@type": "PostalAddress", addressCountry: "GH" },
  sameAs: [LINKEDIN, person.upwork.split("?")[0], VA_SITE_URL],
  knowsAbout: [
    "Workflow automation",
    "Zapier",
    "Make.com",
    "n8n",
    "GoHighLevel",
    "CRM automation",
    "API integration",
    "Webhooks",
    "Google Apps Script",
    "Airtable",
    "HubSpot",
    "AI automation",
    "Retrieval-augmented generation (RAG)",
    "OpenAI API",
    "FastAPI",
  ],
};

export const siteSchemas = [
  personSchema,
  {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${person.name} — Automation Portfolio`,
    description: summary,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
  },
  {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: `${person.name} — Automation & Workflow Systems`,
    url: SITE_URL,
    description: summary,
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: "Worldwide",
    serviceType: [
      "Automation & Workflow Development",
      "API Integrations",
      "CRM & Pipeline Automation",
      "Data Processing & Operational Systems",
    ],
  },
];

export const faqSchema = {
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
