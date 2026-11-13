import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LessonModal } from '../components/LessonModal';
import { useSession } from '../context/Session';
import { getTopic } from '../data/catalog';
import type { RootStackParamList } from '../navigation';
import { colors } from '../theme';
import type { Lesson } from '../types';
import { isLessonUnlocked, topicStats } from '../unlock';

type Props = NativeStackScreenProps<RootStackParamList, 'Topic'>;

export function TopicDetailScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { progress, setCompleted, setLearned } = useSession();
  const topic = getTopic(route.params.topicId);
  const [open, setOpen] = useState<Lesson | null>(null);

  if (!topic) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top + 12, padding: 20 }]}>
        <Text>Topic not found</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.green }}>Back</Text>
        </Pressable>
      </View>
    );
  }

  const s = topicStats(topic, progress);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.top}>
        <Pressable accessibilityRole="button" onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
        <Text style={styles.kicker}>{topic.category}</Text>
        <Text style={styles.title}>{topic.title}</Text>
        <Text style={styles.blurb}>{topic.blurb}</Text>
        <View style={styles.stats}>
          <Stat label="Lessons" value={String(topic.lessonCount)} />
          <Stat label="Items" value={String(topic.itemCount)} />
          <Stat label="Done" value={`${s.percent}%`} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.curr}>Course curriculum</Text>
        {topic.lessons.map((lesson, i) => {
          const locked = !isLessonUnlocked(topic, lesson.id, progress);
          const done = Boolean(progress[lesson.id]?.completed);
          return (
            <Pressable
              key={lesson.id}
              accessibilityRole="button"
              onPress={() => setOpen(lesson)}
              style={styles.lesson}
            >
              <View style={[styles.num, done && styles.numDone]}>
                <Text style={[styles.numText, done && { color: '#fff' }]}>{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonMeta}>
                  {lesson.items.length} points
                  {locked ? ' · Locked' : done ? ' · Completed' : ''}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      <LessonModal
        lesson={open}
        resources={topic.resources}
        visible={Boolean(open)}
        locked={open ? !isLessonUnlocked(topic, open.id, progress) : true}
        completed={open ? Boolean(progress[open.id]?.completed) : false}
        learned={open ? Boolean(progress[open.id]?.todayILearned) : false}
        onClose={() => setOpen(null)}
        onCompleted={(v) => open && setCompleted(open.id, v)}
        onLearned={(v) => open && setLearned(open.id, v)}
      />
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statVal}>{value}</Text>
      <Text style={styles.statLab}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  top: { paddingHorizontal: 20, paddingBottom: 8 },
  back: { color: colors.green, fontWeight: '700', marginBottom: 10 },
  kicker: { color: colors.green, fontWeight: '700', fontSize: 12 },
  title: { fontSize: 28, fontWeight: '700', color: colors.ink, marginTop: 4 },
  blurb: { color: colors.muted, marginTop: 8, lineHeight: 20 },
  stats: { flexDirection: 'row', gap: 8, marginTop: 14 },
  stat: {
    flex: 1,
    backgroundColor: colors.greenSoft,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  statVal: { fontWeight: '700', color: colors.green, fontSize: 16 },
  statLab: { color: colors.muted, fontSize: 11, marginTop: 2 },
  curr: { fontWeight: '700', fontSize: 18, color: colors.ink, marginBottom: 10 },
  lesson: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  num: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numDone: { backgroundColor: colors.green },
  numText: { fontWeight: '700', color: colors.green },
  lessonTitle: { fontWeight: '700', color: colors.ink },
  lessonMeta: { color: colors.muted, fontSize: 12, marginTop: 2 },
});
