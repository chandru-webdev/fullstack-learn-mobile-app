import { topics } from './data/catalog';
import type { Topic, UserProgress } from './types';

export function isLessonUnlocked(topic: Topic, lessonId: string, progress: UserProgress) {
  const index = topic.lessons.findIndex((l) => l.id === lessonId);
  if (index <= 0) return true;
  const prev = topic.lessons[index - 1];
  const state = progress[prev.id];
  return Boolean(state?.completed && state?.todayILearned);
}

export function topicStats(topic: Topic, progress: UserProgress) {
  const completed = topic.lessons.filter((l) => progress[l.id]?.completed).length;
  const total = topic.lessons.length || 1;
  return { completed, total, percent: Math.round((completed / total) * 100) };
}

export function stats(progress: UserProgress) {
  const all = topics.flatMap((t) => t.lessons);
  const completed = all.filter((l) => progress[l.id]?.completed).length;
  const total = all.length || 1;
  return { completed, total, percent: Math.round((completed / total) * 100) };
}
