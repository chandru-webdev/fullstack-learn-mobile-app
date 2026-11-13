import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { useSession } from '../context/Session';
import { topics } from '../data/catalog';
import { visualFor } from '../data/topicVisual';
import type { RootStackParamList, TabParamList } from '../navigation';
import { colors, hours } from '../theme';
import { stats, topicStats } from '../unlock';
import { Ionicons } from '@expo/vector-icons';

type ProgressNav = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Progress'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function GrowthScreen() {
  const insets = useSafeAreaInsets();
  const { progress } = useSession();
  const navigation = useNavigation<ProgressNav>();
  const s = stats(progress);
  const plan = topics.slice(0, 4);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <AppHeader title="Today’s plan" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28 }}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Focus {hours.weekday} today</Text>
          <Text style={styles.heroMeta}>
            {s.completed}/{s.total} lessons · {s.percent}% overall
          </Text>
        </View>
        {plan.map((topic) => {
          const ts = topicStats(topic, progress);
          const vis = visualFor(topic.id);
          return (
            <Pressable
              key={topic.id}
              accessibilityRole="button"
              onPress={() => navigation.navigate('Topic', { topicId: topic.id })}
              style={styles.row}
            >
              <View style={[styles.icon, { backgroundColor: vis.bg }]}>
                <Ionicons name={vis.icon} size={20} color={colors.ink} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{topic.nav}</Text>
                <Text style={styles.rowMeta}>{topic.hoursLabel}</Text>
              </View>
              <Text style={styles.pct}>{ts.percent}%</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  hero: {
    backgroundColor: colors.purple,
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
  },
  heroTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
  heroMeta: { color: '#E6E0FF', marginTop: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 12,
    marginBottom: 8,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { fontWeight: '700', color: colors.ink },
  rowMeta: { color: colors.muted, fontSize: 12, marginTop: 2 },
  pct: { fontWeight: '800', color: colors.purple },
});
