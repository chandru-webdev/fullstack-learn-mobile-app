import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

export const topicVisual: Record<string, { icon: IconName; bg: string }> = {
  sprint: { icon: 'flash', bg: colors.lilac },
  web: { icon: 'globe-outline', bg: colors.blue },
  html: { icon: 'logo-html5', bg: '#FFD9C7' },
  css: { icon: 'logo-css3', bg: '#CDE8FF' },
  javascript: { icon: 'logo-javascript', bg: '#FFF3B0' },
  typescript: { icon: 'code-slash-outline', bg: '#D6E4FF' },
  react: { icon: 'logo-react', bg: '#C8F4FF' },
  node: { icon: 'server-outline', bg: '#C8F0E0' },
  python: { icon: 'logo-python', bg: '#D5E3B8' },
  java: { icon: 'cafe-outline', bg: '#FFD9C7' },
  spring: { icon: 'leaf-outline', bg: '#C8F0E0' },
  api: { icon: 'git-network-outline', bg: '#EEE9FF' },
  sql: { icon: 'grid-outline', bg: '#CDE8FF' },
  mongodb: { icon: 'leaf', bg: '#D5E3B8' },
  ai: { icon: 'sparkles-outline', bg: '#F8CDE4' },
  aws: { icon: 'cloud-outline', bg: '#FFD9C7' },
  devops: { icon: 'cube-outline', bg: '#EEE9FF' },
  quality: { icon: 'shield-checkmark-outline', bg: '#C8F0E0' },
  architecture: { icon: 'git-branch-outline', bg: '#D6E4FF' },
  shopify: { icon: 'bag-handle-outline', bg: '#C8F0E0' },
  interview: { icon: 'school-outline', bg: '#EEE9FF' },
  projects: { icon: 'construct-outline', bg: '#FFD9C7' },
  checklist: { icon: 'checkbox-outline', bg: '#CDE8FF' },
};

export function visualFor(id: string) {
  return topicVisual[id] ?? { icon: 'book-outline' as IconName, bg: colors.lilac };
}
