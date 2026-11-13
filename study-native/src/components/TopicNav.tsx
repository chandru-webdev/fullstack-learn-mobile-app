import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { navTopics } from '../data/catalog';
import { colors } from '../theme';

export function TopicNav({
  selectedId,
  onSelect,
}: {
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {navTopics.map((topic) => {
        const on = selectedId === topic.id;
        return (
          <Pressable
            key={topic.id}
            accessibilityRole="button"
            onPress={() => onSelect(topic.id)}
            style={[styles.chip, on && styles.chipOn]}
          >
            <Text style={[styles.text, on && styles.textOn]}>{topic.nav}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: 20, gap: 8, paddingVertical: 4 },
  chip: {
    backgroundColor: colors.greenSoft,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipOn: { backgroundColor: colors.green },
  text: { color: colors.green, fontWeight: '600', fontSize: 13 },
  textOn: { color: '#fff' },
});
