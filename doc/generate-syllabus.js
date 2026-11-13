const fs = require("fs");
const path = require("path");

const txt = fs.readFileSync(
  path.join(__dirname, "Full_Stack_Developer_Complete_Topic_Checklist.txt"),
  "utf8",
);

const SKIP = /^(Purpose:|How to use|Mark each|For every|Prioritize|Treat advanced|Reference note)/i;
const resourcesById = {
  web: [
    { title: "MDN Web docs", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", platform: "MDN" },
    { title: "HTTP overview", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", platform: "MDN" },
  ],
  html: [
    { title: "HTML elements", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", platform: "MDN" },
    { title: "Learn HTML", url: "https://web.dev/learn/html", platform: "web.dev" },
  ],
  css: [
    { title: "Learn CSS", url: "https://web.dev/learn/css", platform: "web.dev" },
    { title: "Flexbox guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", platform: "CSS Tricks" },
  ],
  javascript: [
    { title: "javascript.info", url: "https://javascript.info/", platform: "javascript.info" },
    { title: "MDN JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", platform: "MDN" },
  ],
  typescript: [
    { title: "TypeScript handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html", platform: "TypeScript" },
  ],
  react: [
    { title: "React docs", url: "https://react.dev/learn", platform: "React" },
    { title: "React Router", url: "https://reactrouter.com/home", platform: "React Router" },
  ],
  node: [
    { title: "Node.js docs", url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", platform: "Node.js" },
    { title: "Express guide", url: "https://expressjs.com/en/starter/installing.html", platform: "Express" },
  ],
  python: [
    { title: "Python tutorial", url: "https://docs.python.org/3/tutorial/", platform: "Python.org" },
    { title: "FastAPI", url: "https://fastapi.tiangolo.com/tutorial/", platform: "FastAPI" },
  ],
  java: [
    { title: "Oracle Java tutorials", url: "https://docs.oracle.com/javase/tutorial/", platform: "Oracle" },
  ],
  spring: [
    { title: "Spring Boot", url: "https://spring.io/projects/spring-boot", platform: "Spring" },
    { title: "Spring guides", url: "https://spring.io/guides", platform: "Spring" },
  ],
  api: [
    { title: "MDN REST", url: "https://developer.mozilla.org/en-US/docs/Glossary/REST", platform: "MDN" },
    { title: "OpenAPI", url: "https://swagger.io/specification/", platform: "Swagger" },
  ],
  sql: [
    { title: "PostgreSQL tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html", platform: "PostgreSQL" },
    { title: "MySQL docs", url: "https://dev.mysql.com/doc/", platform: "MySQL" },
  ],
  mongodb: [
    { title: "MongoDB University", url: "https://learn.mongodb.com/", platform: "MongoDB" },
  ],
  ai: [
    { title: "OpenAI docs", url: "https://platform.openai.com/docs", platform: "OpenAI" },
    { title: "Prompt engineering", url: "https://platform.openai.com/docs/guides/prompt-engineering", platform: "OpenAI" },
  ],
  aws: [
    { title: "AWS getting started", url: "https://aws.amazon.com/getting-started/", platform: "AWS" },
  ],
  devops: [
    { title: "Docker docs", url: "https://docs.docker.com/get-started/", platform: "Docker" },
    { title: "GitHub Actions", url: "https://docs.github.com/en/actions", platform: "GitHub" },
  ],
  quality: [
    { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", platform: "OWASP" },
  ],
  architecture: [
    { title: "System design primer", url: "https://github.com/donnemartin/system-design-primer", platform: "GitHub" },
  ],
  shopify: [
    { title: "Shopify Liquid", url: "https://shopify.dev/docs/api/liquid", platform: "Shopify" },
  ],
  interview: [
    { title: "NeetCode roadmap", url: "https://neetcode.io/roadmap", platform: "NeetCode" },
  ],
  projects: [
    { title: "Your GitHub", url: "https://github.com/", platform: "GitHub" },
  ],
  checklist: [
    { title: "MDN Learn", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", platform: "MDN" },
  ],
};

const idFromTitle = {
  "Web and Internet Fundamentals": "web",
  HTML5: "html",
  "CSS3 and Responsive UI": "css",
  "JavaScript (Modern ES6+)": "javascript",
  TypeScript: "typescript",
  React: "react",
  "Node.js and Express.js": "node",
  Python: "python",
  Java: "java",
  "Spring and Spring Boot": "spring",
  "REST APIs and API Engineering": "api",
  "Databases: SQL, MySQL and PostgreSQL": "sql",
  "MongoDB and NoSQL": "mongodb",
  "AI, Generative AI and AI Tools": "ai",
  "Cloud, AWS and Deployment": "aws",
  "Docker, Linux and DevOps": "devops",
  "Testing, Security and Software Quality": "quality",
  "Architecture and System Design": "architecture",
  "Shopify and E-commerce Development": "shopify",
  "Professional Skills and Interview Preparation": "interview",
  "Suggested Project Ladder": "projects",
  "Final Skills Checklist": "checklist",
};

const categories = {
  web: "Fundamentals",
  html: "Frontend",
  css: "Frontend",
  javascript: "Frontend",
  typescript: "Frontend",
  react: "Frontend",
  node: "Backend",
  python: "Backend",
  java: "Backend",
  spring: "Backend",
  api: "Backend",
  sql: "Database",
  mongodb: "Database",
  ai: "AI",
  aws: "Cloud",
  devops: "Cloud",
  quality: "Quality",
  architecture: "Quality",
  shopify: "Commerce",
  interview: "Career",
  projects: "Career",
  checklist: "Career",
};

const navLabel = {
  web: "Web",
  html: "HTML",
  css: "CSS",
  javascript: "JS",
  typescript: "TS",
  react: "React",
  node: "Node",
  python: "Python",
  java: "Java",
  spring: "Spring",
  api: "REST API",
  sql: "SQL",
  mongodb: "MongoDB",
  ai: "AI",
  aws: "AWS",
  devops: "DevOps",
  quality: "Testing",
  architecture: "Architecture",
  shopify: "Shopify",
  interview: "DSA / Interview",
  projects: "Projects",
  checklist: "Final",
};

const topics = [];
let current = null;
let sub = null;

function slug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

for (const raw of txt.split(/\r?\n/)) {
  const line = raw.trim();
  if (!line || SKIP.test(line)) continue;
  const heading = line.match(/^(\d+)\.\s+(.+)$/);
  if (heading) {
    if (current) {
      if (sub) current.lessons.push(sub);
      topics.push(current);
    }
    const title = heading[2].trim();
    const id = idFromTitle[title] || slug(title);
    current = {
      id,
      number: Number(heading[1]),
      title,
      nav: navLabel[id] || title,
      category: categories[id] || "Core",
      blurb: "",
      resources: resourcesById[id] || [],
      lessons: [],
    };
    sub = null;
    continue;
  }
  if (!current) continue;
  if (line.startsWith("☐")) {
    if (!sub) {
      sub = {
        id: `${current.id}-start`,
        title: current.title,
        items: [],
      };
    }
    sub.items.push(line.replace(/^☐\s*/, "").trim());
    continue;
  }
  if (sub) current.lessons.push(sub);
  sub = { id: `${current.id}-${slug(line)}`, title: line, items: [] };
}
if (current) {
  if (sub) current.lessons.push(sub);
  topics.push(current);
}

for (const t of topics) {
  if (t.id === "projects") {
    t.lessons = [
      {
        id: "projects-ladder",
        title: "Suggested project ladder",
        items: t.lessons.flatMap((l) => [l.title, ...l.items]).filter(Boolean),
      },
    ];
  }
  t.lessons = t.lessons.filter((l) => l.items.length);
  const n = t.lessons.reduce((a, l) => a + l.items.length, 0);
  t.itemCount = n;
  t.lessonCount = t.lessons.length;
  t.hoursLabel = `${Math.max(4, t.lessonCount * 2)}h`;
  t.blurb = `${t.lessonCount} lessons · ${n} checklist items`;
}

const out = path.join(__dirname, "..", "study-native", "src", "data", "syllabus.json");
fs.writeFileSync(out, JSON.stringify({ topics }, null, 2));
console.log(
  topics.map((t) => `${t.id} ${t.lessonCount}L ${t.itemCount}i`).join("\n"),
);
console.log("wrote", out);
