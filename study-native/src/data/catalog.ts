import { tasks } from './plan';
import syllabus from './syllabus.json';
import type { Topic } from '../types';

const sprint: Topic = {
  id: 'sprint',
  title: '30-day Python + DSA + Resume',
  nav: 'Sprint',
  category: 'Career',
  blurb: 'Job-switch sprint from your 30-day plan. 12 tasks, ~70 hours.',
  hoursLabel: '~70h',
  lessonCount: tasks.length,
  itemCount: tasks.length,
  featured: true,
  resources: [
    { title: 'NeetCode roadmap', url: 'https://neetcode.io/roadmap', platform: 'NeetCode' },
    { title: 'FastAPI tutorial', url: 'https://fastapi.tiangolo.com/tutorial/', platform: 'FastAPI' },
    { title: 'Instahyre', url: 'https://www.instahyre.com/', platform: 'Instahyre' },
  ],
  lessons: tasks.map((t) => ({
    id: t.id,
    title: t.title,
    hours: t.hours,
    where: t.where,
    items: [t.what, `Where: ${t.where}`, `Hours: ${t.hours}`, `Platforms: ${t.platforms.join(', ')}`],
  })),
};

export const topics: Topic[] = [sprint, ...(syllabus.topics as Topic[])];

export const navTopics = topics;

export function getTopic(id: string) {
  return topics.find((t) => t.id === id);
}

export const popularIds = ['html', 'css', 'javascript', 'react', 'python', 'java', 'ai', 'aws'];
