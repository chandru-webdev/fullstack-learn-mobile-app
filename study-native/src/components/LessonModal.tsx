import { Linking, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../theme';
import type { Lesson, Resource } from '../types';

type Props = {
  lesson: Lesson | null;
  resources: Resource[];
  visible: boolean;
  locked: boolean;
  completed: boolean;
  learned: boolean;
  onClose: () => void;
  onCompleted: (v: boolean) => void;
  onLearned: (v: boolean) => void;
};

export function LessonModal({
  lesson,
  resources,
  visible,
  locked,
  completed,
  learned,
  onClose,
  onCompleted,
  onLearned,
}: Props) {
  if (!lesson) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.grab} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.kicker}>{lesson.hours ?? 'Lesson'}</Text>
            <Text style={styles.title}>{lesson.title}</Text>
            {lesson.where ? <Text style={styles.where}>{lesson.where}</Text> : null}

            {locked ? (
              <View style={styles.lockBox}>
                <Text style={styles.lockText}>
                  Locked. Complete the previous lesson and check Today I learned.
                </Text>
              </View>
            ) : null}

            <Text style={styles.label}>What to study</Text>
            {lesson.items.map((item) => (
              <Text key={item} style={styles.item}>
                • {item}
              </Text>
            ))}

            {resources.length ? (
              <>
                <Text style={styles.label}>Resources & platforms</Text>
                {resources.map((r) => (
                  <Pressable
                    key={r.url}
                    accessibilityRole="link"
                    onPress={() => Linking.openURL(r.url)}
                    style={styles.linkRow}
                  >
                    <Text style={styles.linkTitle}>{r.title}</Text>
                    <Text style={styles.linkMeta}>{r.platform}</Text>
                  </Pressable>
                ))}
              </>
            ) : null}

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Mark complete</Text>
              <Switch
                value={completed}
                disabled={locked}
                onValueChange={onCompleted}
                trackColor={{ true: colors.green }}
              />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Today I learned</Text>
              <Switch
                value={learned}
                disabled={locked || !completed}
                onValueChange={onLearned}
                trackColor={{ true: colors.green }}
              />
            </View>
            <Pressable accessibilityRole="button" onPress={onClose} style={styles.done}>
              <Text style={styles.doneText}>Close</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.28)', justifyContent: 'flex-end' },
  sheet: {
    maxHeight: '88%',
    backgroundColor: colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
  },
  grab: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
    marginBottom: 14,
  },
  kicker: { color: colors.green, fontSize: 12, fontWeight: '700', letterSpacing: 0.6 },
  title: { fontSize: 24, fontWeight: '700', color: colors.ink, marginTop: 6 },
  where: { color: colors.muted, marginTop: 8, lineHeight: 20 },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '700',
    color: colors.muted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  item: { color: colors.ink, lineHeight: 22, marginBottom: 6 },
  linkRow: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  linkTitle: { color: colors.green, fontWeight: '600' },
  linkMeta: { color: colors.muted, fontSize: 12, marginTop: 2 },
  toggleRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: { fontSize: 16, color: colors.ink },
  lockBox: { backgroundColor: colors.greenSoft, borderRadius: 14, padding: 12, marginTop: 12 },
  lockText: { color: colors.greenInk, fontSize: 13, lineHeight: 18 },
  done: {
    marginTop: 22,
    backgroundColor: colors.green,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  doneText: { color: '#fff', fontWeight: '700' },
});
