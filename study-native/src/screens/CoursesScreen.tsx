import { Ionicons } from '@expo/vector-icons';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { useSession } from '../context/Session';
import { topics } from '../data/catalog';
import { visualFor } from '../data/topicVisual';
import type { RootStackParamList, TabParamList } from '../navigation';
import { colors } from '../theme';
import { topicStats } from '../unlock';

type CoursesNav = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Courses'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function CoursesScreen() {
  const insets = useSafeAreaInsets();
  const { progress } = useSession();
  const navigation = useNavigation<CoursesNav>();
  const [query, setQuery] = useState('');

  const list = topics.filter((t) => {
    const q = query.trim().toLowerCase();
    return !q || `${t.title} ${t.nav} ${t.category}`.toLowerCase().includes(q);
  });

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <AppHeader title="Courses" />
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search HTML, React, AWS…"
          placeholderTextColor={colors.muted}
          style={styles.search}
        />
      </View>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.count}>{list.length} topics</Text>
        <View style={styles.grid}>
          {list.map((topic) => {
            const vis = visualFor(topic.id);
            const s = topicStats(topic, progress);
            return (
              <Pressable
                key={topic.id}
                accessibilityRole="button"
                onPress={() => navigation.navigate('Topic', { topicId: topic.id })}
                style={[styles.tile, { backgroundColor: vis.bg }]}
              >
                <Ionicons name={vis.icon} size={28} color={colors.ink} />
                <Text style={styles.nav} numberOfLines={1}>
                  {topic.nav}
                </Text>
                <Text style={styles.meta}>
                  {s.percent}% · {topic.lessonCount} lessons
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  searchWrap: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: colors.card,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  search: { flex: 1, paddingVertical: 12, color: colors.ink },
  body: { paddingHorizontal: 16, paddingBottom: 28 },
  count: { color: colors.muted, marginBottom: 10, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: {
    width: '30.5%',
    minHeight: 118,
    borderRadius: 22,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  nav: { fontWeight: '800', color: colors.ink, fontSize: 12, textAlign: 'center' },
  meta: { color: colors.muted, fontSize: 10, textAlign: 'center' },
});
