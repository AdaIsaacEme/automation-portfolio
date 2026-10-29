// /llms.txt — a plain-text map of the site for AI assistants (llmstxt.org).
// Generated from the same data as the pages, so it never drifts.
import type { APIRoute } from "astro";
import { person, services, toolGroups } from "../data/site";
import { flagship, projects } from "../data/projects";
import { faq, summary, SITE_URL, VA_SITE_URL, LINKEDIN } from "../data/seo";

export const GET: APIRoute = () => {
  const lines = [
    `# ${person.name} — ${person.title}`,
    "",
    `> ${summary}`,
    "",
    "## Contact",
    `- Email: ${person.email}`,
    `- Upwork: ${person.upwork.split("?")[0]}`,
    `- LinkedIn: ${LINKEDIN}`,
    `- Location: ${person.location} (works remotely with clients worldwide)`,
    `- Virtual assistant & operations portfolio: ${VA_SITE_URL}`,
    "",
    "## Services",
    ...services.map((s) => `- ${s.title}: ${s.items.join("; ")}`),
    "",
    "## Tools",
    ...toolGroups.map((g) => `- ${g.title}: ${g.tools.map((t) => t.name).join(", ")}`),
    "",
    "## Case studies",
    `- [${flagship.title} (${flagship.subtitle})](${SITE_URL}/projects/${flagship.slug}): ${flagship.solution}`,
    ...projects.map((p) => `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.built} Impact: ${p.impact}`),
    "",
    "## FAQ",
    ...faq.flatMap((f) => [`### ${f.q}`, f.a, ""]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
