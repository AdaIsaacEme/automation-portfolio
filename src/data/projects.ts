export type Shot = { file: string; caption: string };

export type Project = {
  slug: string;
  number: string;
  title: string;
  tools: string[];
  built: string;
  keyFeatures?: string;
  impact: string;
  shots: Shot[];
};

export const projectsIntro =
  "Below are selected automation projects showcasing real workflows, integrations, and systems I've built. Each project demonstrates practical problem-solving and technical execution.";

export const zoomNote =
  "Images can be clicked to open a zoomed view, allowing you to see all actions and interactions clearly.";

export const flagship = {
  slug: "ai-sales-qualification-engine",
  number: "01",
  label: "Flagship AI Automation Project",
  title: "Custom AI Sales Qualification Engine",
  subtitle: "RAG + CRM Automation",
  problem:
    "Businesses using CRMs like GoHighLevel struggle with rigid chatbot logic that breaks during natural conversations, lost leads due to incomplete qualification, no persistent memory across messages, AI hallucinations without business-specific knowledge, and inability to scale intelligent conversations across WhatsApp, Instagram, and web chat. Traditional low-code automation tools hit a ceiling when it comes to sophisticated decision-making and multi-step reasoning.",
  solution:
    "I built a production-ready AI microservice that moves complex reasoning outside the CRM, enabling natural conversations with persistent memory and business-aware intelligence. Here's the technical architecture:",
  architecture: [
    { strong: "GoHighLevel", text: "serves as the front-end orchestration layer, managing user interactions and contact lifecycle" },
    { strong: "Custom webhooks", text: "send messages to an external AI service, decoupling CRM from AI logic" },
    { strong: "FastAPI (Python)", text: "backend hosted on Vercel processes: lead intent detection, qualification state, memory retrieval, and context evaluation" },
    { strong: "OpenAI API", text: "(GPT + embeddings) handles reasoning, response generation, and contextual understanding" },
    { strong: "Pinecone vector database", text: "implements RAG (Retrieval-Augmented Generation) storing vectorized FAQ, product features, and business policies for accurate, grounded responses" },
    { strong: "Redis (Upstash)", text: "stores persistent session memory across multiple days: contact name, email, phone, interests, postcode, and qualification state—enabling the AI to recall past conversation context" },
    { strong: "Automatic CRM integration", text: "triggers workflows when qualification is complete, updating pipelines and creating tasks" },
  ],
  multichannel:
    "The same AI logic powers WhatsApp, Instagram DMs, and website chat—providing consistent, intelligent responses everywhere customers engage.",
  stack: [
    { name: "GoHighLevel", role: "CRM Orchestration", logo: "ghl logo.png" },
    { name: "FastAPI", role: "Backend Service", logo: "fastapi_python_logo.png" },
    { name: "Vercel", role: "Serverless Hosting", logo: "vercel_logo.png" },
    { name: "OpenAI", role: "LLM & Embeddings", logo: "openapi_logo.png" },
    { name: "Pinecone", role: "Vector DB (RAG)", logo: "pinecone-logo.png" },
    { name: "Redis", role: "Persistent Memory", logo: "redis_logo.png" },
    { name: "Webhooks", role: "API Integrations", logo: "webhooks logo.png" },
  ],
  matters: [
    { strong: "High-code AI automation", text: "goes beyond low-code tool limitations" },
    { strong: "CRM workaround:", text: "Solves GoHighLevel's constraint by moving intelligence to external service" },
    { strong: "Persistent memory:", text: "Conversations with context, not stateless interactions" },
    { strong: "Production-ready:", text: "Designed for scale, reliability, and business logic accuracy" },
    { strong: "Multi-channel:", text: "Deploys across WhatsApp, Instagram, web—unified AI experience" },
    { strong: "RAG implementation:", text: "Grounded AI responses using real business data, reducing hallucinations" },
  ],
  video: {
    title: "Website Integration Demo (Mock Data)",
    text: "This video demonstrates how the AI qualification engine integrates with a live website form and messaging flow. All data shown is mock data used strictly for demonstration purposes.",
    disclaimer:
      "All names, phone numbers, emails, postcodes, and conversations shown in this demo are mock data created for demonstration purposes only. No real client or user data is displayed.",
    src: "/video/website-integration.mp4",
    poster: "/video/website-integration-poster.jpg",
  },
  tools: ["GoHighLevel", "FastAPI", "OpenAI", "Pinecone", "Redis"],
  shots: [
    { file: "GHL_AI FULL SETUP.png", caption: "GoHighLevel workflow orchestration triggering the AI system" },
    { file: "GHL_AI AGENT SETUP.png", caption: "Custom webhook connecting GoHighLevel to the AI microservice" },
    { file: "vercel info showing response and redis data retrieval.png", caption: "Vercel execution logs showing OpenAI responses and Redis memory writes" },
    { file: "pinecode_database with uploaded faq count.png", caption: "Pinecone vector database storing business FAQs for RAG retrieval" },
    { file: "Redis image showing contact info saved.png", caption: "Persistent conversation memory stored in Redis (contact details & qualification state)" },
    { file: "instagram conco showing smart responses and memory.png", caption: "Instagram DM conversation demonstrating memory recall and contextual responses" },
    { file: "whatsapp ai convo.png", caption: "WhatsApp AI conversation handling qualification and sales logic" },
  ] as Shot[],
};

export const projects: Project[] = [
  {
    slug: "apps-script-task-reminders",
    number: "02",
    title: "Google Apps Script Task Reminder System",
    tools: ["Google Apps Script", "Google Sheets", "Gmail"],
    built:
      "Built a custom Google Apps Script automation that reads task deadlines from Google Sheets, checks upcoming due dates, and sends automatic reminder emails daily. Eliminated manual follow-ups and improved task tracking across the team.",
    impact: "Zero manual reminder work, improved deadline adherence, automated daily execution.",
    shots: [
      { file: "sheets automation .png", caption: "Google Sheet with Tasks" },
      { file: "appscript execution completed.png", caption: "Apps Script Editor with Execution Log" },
      { file: "email reminder apps script .png", caption: "Reminder Emails Sent" },
    ],
  },
  {
    slug: "ghl-lead-tracking",
    number: "03",
    title: "GoHighLevel Lead Tracking System (Form Data → CRM Pipeline)",
    tools: ["GoHighLevel", "Webhooks"],
    built:
      "Designed a complete lead tracking pipeline using GoHighLevel. Automatically formats incoming raw form data, adds tags, creates CRM contacts, updates pipelines, and triggers internal notifications. Reduced manual processing to zero.",
    impact:
      "Eliminated manual data entry, instant CRM updates, 100% lead capture accuracy, real-time team notifications.",
    shots: [
      { file: "ghl 1 .png", caption: "GHL Workflow with Tags and Notifications" },
      { file: "GHL 4.png", caption: "GHL Enrollment Path" },
    ],
  },
  {
    slug: "calendar-to-pipeline",
    number: "04",
    title: "Calendar Appointment → Automated Pipeline Updates (GoHighLevel)",
    tools: ["GoHighLevel", "Calendar"],
    built:
      "Created an automation that instantly updates GHL pipelines when a client books a calendar appointment. The workflow triggers pipeline movement, sends personalized emails, and alerts internal teams—ensuring no missed bookings or follow-ups.",
    impact: "Instant appointment processing, automated client communication, zero missed follow-ups.",
    shots: [
      { file: "ghl 2.png", caption: "GHL Workflow Triggered by Calendar Booking" },
      { file: "ghl 3.png", caption: "GHL Client Enrollment Path" },
    ],
  },
  {
    slug: "typeform-zapier-automation",
    number: "05",
    title: "Typeform Submission Automation (Multi-Step Data Processing)",
    tools: ["Zapier", "Typeform", "Google Sheets", "Slack"],
    built:
      "Created a multi-step Zapier automation that captures Typeform submissions, formats them, logs them into Google Sheets, and sends real-time Slack notifications for team visibility.",
    impact: "Instant form processing, automated data logging, real-time team alerts.",
    shots: [
      { file: "zapier 1.jpg", caption: "Full Zap Graph" },
      { file: "zapier 2.jpg", caption: "Typeform Trigger Setup" },
      { file: "zapier 3.png", caption: "Slack Message Configuration" },
    ],
  },
  {
    slug: "airtable-crm",
    number: "06",
    title: "Airtable CRM With Automated Lead Routing, Notifications & Kanban Pipeline",
    tools: ["Airtable", "Slack", "Email"],
    built:
      "Built a fully functional CRM in Airtable to manage leads, opportunities, contacts, and staff. Includes automated lead routing based on source, real-time notifications via Slack, email alerts, and dynamic Kanban and filtered views to monitor sales stages. Demonstrates full-cycle CRM automation, team assignment, and workflow optimization.",
    keyFeatures:
      "Automated lead assignment based on source (Referral → Jason, Instagram → Mielle, Website → Mark, LinkedIn → Adrian), Hot Leads automation triggering Slack and email notifications, Kanban view displaying leads by stage (New, Contacted, Qualified, Hot), dynamic filtered views for pipeline management.",
    impact:
      "Streamlined lead management, automatic assignment and notifications, reduced manual tracking, improved sales team efficiency.",
    shots: [
      { file: "airtable leads table.png", caption: "Airtable Leads Table" },
      { file: "airtable kanban view.png", caption: "Airtable Kanban View" },
      { file: "airtable automation_enters_new_view.png", caption: "Airtable Hot Leads Automation" },
      { file: "airtable automation assign new leads.png", caption: "Airtable Lead Assignment Automation" },
    ],
  },
  {
    slug: "make-calendar-router",
    number: "07",
    title: "Google Calendar Event Router with Conditional Logic (Make.com)",
    tools: ["Make.com", "Google Calendar", "Gmail"],
    built:
      "Created a Make.com workflow that listens for new Google Calendar events, routes them using filtered logic, and sends automated email notifications. Demonstrates multi-branch logic and real-time event handling.",
    impact: "Smart event filtering, automated routing, reduced notification noise by 75%.",
    shots: [
      { file: "Make automation.jpg", caption: "Full Make Scenario" },
      { file: "make google calendar.png", caption: "Google Calendar Trigger Settings" },
      { file: "make meeting filter.jpg", caption: "Router Filter Condition" },
    ],
  },
  {
    slug: "n8n-webhook-notion",
    number: "08",
    title: "n8n Webhook → Notion Database (API Integration Pipeline)",
    tools: ["n8n", "Notion", "Postman"],
    built:
      "Built an advanced n8n automation that receives incoming data via webhook, processes and maps it, and creates new structured entries inside Notion. Includes additional manual API tests using Postman to validate structure and inputs.",
    impact: "Automated Notion database population, clean data structuring, zero manual entry.",
    shots: [
      { file: "n8n nodes connected.jpg", caption: "Full n8n Workflow" },
      { file: "n8n notion.jpg", caption: "n8n Mapping for Notion Fields" },
      { file: "n8n notion mapping.jpg", caption: "n8n Notion Field Mapping" },
      { file: "n8n method post.jpg", caption: "Method POST Configuration" },
      { file: "n8n fields.jpg", caption: "Webhook Configuration" },
      { file: "n8n postman request.jpg", caption: "Manual Postman POST Request" },
    ],
  },
  {
    slug: "postman-api-testing",
    number: "09",
    title: "API Integration Testing with Postman (GET/POST Requests)",
    tools: ["Postman", "REST", "JSON"],
    built:
      "Demonstration of API integration capability using Postman. Includes GET/POST requests, webhook triggers, header configuration, and CRM sync validation. Shows ability to work with REST APIs, JSON, and webhook automation.",
    impact: "Validated API endpoints, tested CRM integrations, ensured data accuracy before deployment.",
    shots: [
      { file: "postman get request.png", caption: "Postman GET Call to GHL" },
      { file: "postman post request.png", caption: "Postman POST Request with JSON" },
      { file: "n8n postman request.jpg", caption: "n8n/Postman Mapping" },
    ],
  },
  {
    slug: "website-lead-automation",
    number: "10",
    title: "Complete Website Lead Automation (Frontend → Webhook → CRM)",
    tools: ["Zapier", "JavaScript", "GoHighLevel"],
    built:
      "Automated the entire website lead acquisition process. Data submitted from the website is captured via webhook, formatted using code, synced to GHL, and pushed into the correct pipeline stages. Achieved zero manual lead entry.",
    impact:
      "100% lead capture rate, instant CRM sync, eliminated data entry errors, automated pipeline routing.",
    shots: [
      { file: "lead capture 1.png", caption: "Frontend Form" },
      { file: "leadcapture 2.png", caption: "Zapier Webhook Capture" },
      { file: "lead capture 3.png", caption: "Data Formatting Step (JS Code)" },
      { file: "lead capture 4.png", caption: "Enrollment History in GHL" },
      { file: "lead capture 5.png", caption: "GHL Contact and Opportunity Created" },
    ],
  },
  {
    slug: "whatsapp-smart-reply",
    number: "11",
    title: "WhatsApp Smart Reply System with Keyword Detection (GHL)",
    tools: ["GoHighLevel", "WhatsApp"],
    built:
      "Designed a conditional WhatsApp automation allowing instant replies, keyword detection (e.g., 'price'), and internal alerting. Helps teams respond faster and track important client messages.",
    impact: "90% faster response time, automatic keyword tracking, zero missed inquiries.",
    shots: [{ file: "whatsapp automation ghl.png", caption: "WhatsApp Workflow with GHL" }],
  },
  {
    slug: "wordpress-siteground-zapier",
    number: "12",
    title: "WordPress Backend Integration (SiteGround + Zapier Webhooks)",
    tools: ["WordPress", "SiteGround", "Zapier"],
    built:
      "Configured backend automation between WordPress, SiteGround hosting, and Zapier. Includes webhook endpoints, DNS/hosting configuration, and backend integration setup for automated lead routing.",
    impact:
      "Seamless backend integration, stable webhook connections, automated data flow from website to CRM.",
    shots: [
      { file: "zapier_siteground.png", caption: "Site Tools → JS Code Showing Zapier Webhook URLs" },
      { file: "wordpress_siteground.png", caption: "WordPress Pages Backend" },
    ],
  },
  {
    slug: "calendar-to-trello",
    number: "13",
    title: "Calendar Event → Trello Card Creation (Zapier)",
    tools: ["Zapier", "Google Calendar", "Trello"],
    built:
      "Setup automation that converts Google Calendar events into Trello tasks automatically, eliminating manual task creation and ensuring no deadline is missed.",
    impact: "Automated task creation, improved team coordination, zero missed deadlines.",
    shots: [
      { file: "google calendar.png", caption: "Google Calendar Event" },
      { file: "google calendar trello zap.png", caption: "Zapier: Google Calendar Trigger" },
      { file: "trello add google calendar.png", caption: "Trello Card Successfully Added" },
    ],
  },
];

export const allCaseStudies = [
  { slug: flagship.slug, number: flagship.number, title: `${flagship.title} (${flagship.subtitle})` },
  ...projects.map((p) => ({ slug: p.slug, number: p.number, title: p.title })),
];
