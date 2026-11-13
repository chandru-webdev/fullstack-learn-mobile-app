import type { Resource } from '../types';

export type SprintTask = {
  id: string;
  week: number;
  order: number;
  track: 'dsa' | 'python' | 'apply';
  dayRange: string;
  title: string;
  hours: string;
  what: string;
  where: string;
  platforms: string[];
  resources: Resource[];
};

export const tasks: SprintTask[] = [
  {
    id: 'w1-dsa',
    week: 1,
    order: 1,
    track: 'dsa',
    dayRange: 'Days 1–7',
    title: 'DSA: hashing + two pointers',
    hours: 'Weekday 40 min · Weekend 2h',
    what: 'Two Sum, Contains Duplicate, Valid Anagram, 3Sum, Container With Most Water, Longest Substring Without Repeating, Valid Parentheses. Python blank file, timer on. Peek approach only after 8 minutes, rewrite next day.',
    where: 'LeetCode in a blank .py file. No IDE autocomplete. Notes in dsa-patterns.md (4 lines per problem).',
    platforms: ['LeetCode', 'NeetCode patterns'],
    resources: [
      { title: 'NeetCode roadmap', url: 'https://neetcode.io/roadmap', platform: 'NeetCode' },
      { title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', platform: 'LeetCode' },
      { title: '3Sum', url: 'https://leetcode.com/problems/3sum/', platform: 'LeetCode' },
    ],
  },
  {
    id: 'w1-python',
    week: 1,
    order: 2,
    track: 'python',
    dayRange: 'Days 1–7',
    title: 'Python: FastAPI + RateBrain ingest',
    hours: 'Weekday 40 min · Weekend 2.5h',
    what: 'Create ratebrain repo. FastAPI GET /health on Railway. JWT + Pydantic + Postgres. POST /ingest chunks. Embeddings table. Ugly Next.js chat. Citations. One pytest. FastAPI only — no Django/Flask.',
    where: 'VS Code / Cursor + Railway + Vercel. Official FastAPI and OpenAI SDK docs while you hit errors, not a full course.',
    platforms: ['FastAPI', 'Railway', 'Vercel', 'OpenAI API'],
    resources: [
      { title: 'FastAPI first steps', url: 'https://fastapi.tiangolo.com/tutorial/first-steps/', platform: 'FastAPI' },
      { title: 'OpenAI embeddings', url: 'https://platform.openai.com/docs/guides/embeddings', platform: 'OpenAI' },
      { title: 'Railway docs', url: 'https://docs.railway.app/', platform: 'Railway' },
    ],
  },
  {
    id: 'w1-apply',
    week: 1,
    order: 3,
    track: 'apply',
    dayRange: 'Days 1–7',
    title: 'Apply: resume v1 + 8 apps/day',
    hours: 'Weekday 10 min · Weekend 30 min',
    what: 'Resume headline: React/Next shipper building LLM apps. Remove ATMR-Bot fantasy. Live URLs first. LinkedIn = same headline. 8–12 targeted apps weekdays, 10–15 weekends. Opalline STAR story out loud. Shopify is a story only — do not study Liquid.',
    where: 'Instahyre, LinkedIn, Wellfound. JDs that say FastAPI / Next / Python / RAG.',
    platforms: ['Instahyre', 'LinkedIn', 'Wellfound'],
    resources: [
      { title: 'Instahyre', url: 'https://www.instahyre.com/', platform: 'Instahyre' },
      { title: 'Wellfound', url: 'https://wellfound.com/', platform: 'Wellfound' },
    ],
  },
  {
    id: 'w2-dsa',
    week: 2,
    order: 4,
    track: 'dsa',
    dayRange: 'Days 8–17',
    title: 'DSA: lists, trees, islands',
    hours: 'Weekday 40 min · Weekend 2h',
    what: 'Binary search rotated array, reverse/merge/cycle lists, invert/depth/BFS/Validate BST, Number of Islands, Rotting Oranges, Course Schedule, Climbing Stairs, House Robber. Redo 3Sum from memory.',
    where: 'LeetCode. Same timer rules. Weekend = 4–6 problems, not a new playlist.',
    platforms: ['LeetCode'],
    resources: [
      { title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', platform: 'LeetCode' },
      { title: 'Invert Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree/', platform: 'LeetCode' },
      { title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', platform: 'LeetCode' },
    ],
  },
  {
    id: 'w2-python',
    week: 2,
    order: 5,
    track: 'python',
    dayRange: 'Days 8–17',
    title: 'Python: live RateBrain demo',
    hours: 'Weekday 40 min · Weekend 2.5h',
    what: 'pgvector or Supabase search. 20 golden questions in evals.json. Feature freeze Day 14. Demo: ingest → question → citation → “I don’t know”. You must explain every file. No new features after freeze.',
    where: 'Your ratebrain repo + live Railway/Vercel URL. README is the interview script.',
    platforms: ['Supabase', 'Postgres', 'GitHub'],
    resources: [
      { title: 'pgvector', url: 'https://github.com/pgvector/pgvector', platform: 'GitHub' },
      { title: 'Supabase vectors', url: 'https://supabase.com/docs/guides/ai/semantic-search', platform: 'Supabase' },
    ],
  },
  {
    id: 'w2-apply',
    week: 2,
    order: 6,
    track: 'apply',
    dayRange: 'Days 8–17',
    title: 'Apply: resume v2 + AI roles',
    hours: 'Weekday 10 min · Weekend 1h (Sat mock)',
    what: 'Resume v2 with live RateBrain. Apply to AI / LLM / Python fullstack. 8 apps/day. One mock. Shopify answers only from STAR sheet.',
    where: 'Same boards. Title filter: AI fullstack, FastAPI, LLM apps.',
    platforms: ['Instahyre', 'LinkedIn', 'Pramp'],
    resources: [
      { title: 'Pramp mocks', url: 'https://www.pramp.com/', platform: 'Pramp' },
    ],
  },
  {
    id: 'w3-dsa',
    week: 3,
    order: 7,
    track: 'dsa',
    dayRange: 'Days 18–24',
    title: 'DSA: medium patterns + timed OA',
    hours: 'Weekday 40 min · Weekend 2–2.5h',
    what: 'Coin Change, palindrome expand, heaps, sliding window. Saturday: 1 Easy + 2 Medium in 90 min then review. Sunday: weakest pattern only. Skip tries, segment trees, 2D DP.',
    where: 'LeetCode timed mode. Paper/whiteboard once on Saturday.',
    platforms: ['LeetCode'],
    resources: [
      { title: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', platform: 'LeetCode' },
      { title: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', platform: 'LeetCode' },
    ],
  },
  {
    id: 'w3-python',
    week: 3,
    order: 8,
    track: 'python',
    dayRange: 'Days 18–24',
    title: 'Python: stop building, defend it',
    hours: 'Weekday 40 min · Weekend 2h mock',
    what: 'Write INTERVIEW.md: decisions, tradeoffs, what you’d do with one more week. Patch only gaps interviewers ask. Full mock: Opalline + RateBrain + 1 DSA.',
    where: 'Your repo INTERVIEW.md. Record yourself 20 minutes.',
    platforms: ['GitHub', 'Voice notes'],
    resources: [
      { title: 'FastAPI testing', url: 'https://fastapi.tiangolo.com/tutorial/testing/', platform: 'FastAPI' },
    ],
  },
  {
    id: 'w3-apply',
    week: 3,
    order: 9,
    track: 'apply',
    dayRange: 'Days 18–24',
    title: 'Apply: follow-ups + recruiter note',
    hours: 'Weekday 10 min · Weekend 30 min',
    what: '8 apps/day. Follow up Day-1 applications with RateBrain link. 5-line recruiter note with live URLs. Stories: Kattadam enquiry funnel.',
    where: 'Email/LinkedIn follow-up on earlier apps. Do not open a new stack.',
    platforms: ['LinkedIn', 'Email'],
    resources: [
      { title: 'LinkedIn jobs', url: 'https://www.linkedin.com/jobs/', platform: 'LinkedIn' },
    ],
  },
  {
    id: 'w4-dsa',
    week: 4,
    order: 10,
    track: 'dsa',
    dayRange: 'Days 25–30',
    title: 'DSA: speed run + mock OA',
    hours: 'Weekday 40 min · Day 30: 90 min OA',
    what: 'Generate Parentheses once. Trees speed run. Course Schedule from memory. House Robber + Climbing Stairs. Day 30 mock OA. Easy < 20 min is the bar — not Amazon Hard.',
    where: 'LeetCode + one sitting as if it were an OA.',
    platforms: ['LeetCode'],
    resources: [
      { title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', platform: 'LeetCode' },
    ],
  },
  {
    id: 'w4-python',
    week: 4,
    order: 11,
    track: 'python',
    dayRange: 'Days 25–30',
    title: 'Python: demo + failure modes',
    hours: 'Weekday 40 min · Day 30: 60 min',
    what: 'RateBrain demo until boring. Explain hallucination, cost, chunking. 20-min product talk: RateBrain + Opalline. No PyTorch. No new framework.',
    where: 'Live URL. Talk out loud, timer on.',
    platforms: ['Railway', 'Vercel'],
    resources: [
      { title: 'Vercel deploy', url: 'https://vercel.com/docs', platform: 'Vercel' },
    ],
  },
  {
    id: 'w4-apply',
    week: 4,
    order: 12,
    track: 'apply',
    dayRange: 'Days 25–30',
    title: 'Apply: resume v3 + salary script',
    hours: 'Weekday 10 min · Day 30: 90 min apps',
    what: 'Follow up 10 old apps. Salary ask 8–12 LPA. Day 30: resume v3 from what you actually shipped + 20 applications. 150–200 apps across the month is the volume bar.',
    where: 'Same boards. Close loops, do not start month-2 DSA 150 yet.',
    platforms: ['Instahyre', 'LinkedIn', 'Wellfound'],
    resources: [
      { title: 'Instahyre', url: 'https://www.instahyre.com/', platform: 'Instahyre' },
    ],
  },
];

export const orderedTasks = [...tasks].sort((a, b) => a.order - b.order);

export const tracks: {
  id: SprintTask['track'];
  label: string;
  weekday: string;
  weekend: string;
  weekHours: string;
  tint: 'mint' | 'yellow' | 'green';
  spark: number[];
}[] = [
  {
    id: 'dsa',
    label: 'DSA',
    weekday: '40 min',
    weekend: '2h',
    weekHours: '~7.5h',
    tint: 'mint',
    spark: [0.3, 0.4, 0.35, 0.5, 0.45, 0.8, 0.85],
  },
  {
    id: 'python',
    label: 'Python FS',
    weekday: '40 min',
    weekend: '2.5h',
    weekHours: '~8.5h',
    tint: 'yellow',
    spark: [0.25, 0.45, 0.5, 0.55, 0.6, 0.9, 0.88],
  },
  {
    id: 'apply',
    label: 'Apply',
    weekday: '10 min',
    weekend: '30 min',
    weekHours: '~1.5h',
    tint: 'green',
    spark: [0.5, 0.55, 0.4, 0.6, 0.58, 0.7, 0.65],
  },
];
