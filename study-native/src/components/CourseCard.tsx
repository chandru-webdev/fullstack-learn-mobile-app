import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import type { Topic } from '../types';
import { topicStats } from '../unlock';
import type { UserProgress } from '../types';

export function CourseCard({
  topic,
  progress,
  onPress,
  wide,
}: {
  topic: Topic;
  progress: UserProgress;
  onPress: () => void;
  wide?: boolean;
}) {
  const s = topicStats(topic, progress);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, wide ? styles.wide : styles.compact]}
    >
      <View style={styles.cover}>
        <Text style={styles.coverKicker}>{topic.category}</Text>
        <Text style={styles.coverTitle} numberOfLines={2}>
          {topic.nav}
        </Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {topic.title}
      </Text>
      <Text style={styles.meta}>
        {topic.lessonCount} lessons · {topic.hoursLabel}
      </Text>
      <Text style={styles.progress}>{s.percent}% complete</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
  },
  compact: { width: 210 },
  wide: { width: '100%' },
  cover: {
    height: 96,
    backgroundColor: colors.green,
    padding: 12,
    justifyContent: 'flex-end',
  },
  coverKicker: { color: '#D7EDE2', fontSize: 11, fontWeight: '700' },
  coverTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  title: { paddingHorizontal: 12, paddingTop: 10, fontWeight: '700', color: colors.ink },
  meta: { paddingHorizontal: 12, paddingTop: 4, color: colors.muted, fontSize: 12 },
  progress: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.green,
    fontWeight: '700',
    fontSize: 12,
  },
});
