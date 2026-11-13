import { Ionicons } from '@expo/vector-icons';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { useSession } from '../context/Session';
import { visualFor } from '../data/topicVisual';
import type { RootStackParamList, TabParamList } from '../navigation';
import { colors, hours } from '../theme';
import { stats } from '../unlock';

type HomeNav = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { displayName, progress } = useSession();
  const navigation = useNavigation<HomeNav>();
  const s = stats(progress);

  const tiles: {
    label: string;
    bg: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  }[] = [
    { label: 'Profile', bg: '#E8D9FF', icon: 'person-circle-outline', onPress: () => navigation.navigate('You') },
    { label: 'Notification', bg: '#C8F0E0', icon: 'notifications-outline', onPress: () => {} },
    { label: 'Courses', bg: '#FFD9C7', icon: 'grid-outline', onPress: () => navigation.navigate('Courses') },
    { label: 'Progress', bg: '#CDE8FF', icon: 'stats-chart-outline', onPress: () => navigation.navigate('Progress') },
    { label: 'Sprint', bg: '#F8CDE4', icon: 'flash-outline', onPress: () => navigation.navigate('Topic', { topicId: 'sprint' }) },
    { label: 'DSA', bg: '#EEE9FF', icon: 'school-outline', onPress: () => navigation.navigate('Topic', { topicId: 'interview' }) },
    { label: 'Python', bg: visualFor('python').bg, icon: 'logo-python', onPress: () => navigation.navigate('Topic', { topicId: 'python' }) },
    { label: 'Java', bg: visualFor('java').bg, icon: 'cafe-outline', onPress: () => navigation.navigate('Topic', { topicId: 'java' }) },
    { label: 'React', bg: visualFor('react').bg, icon: 'logo-react', onPress: () => navigation.navigate('Topic', { topicId: 'react' }) },
    { label: 'AI', bg: visualFor('ai').bg, icon: 'sparkles-outline', onPress: () => navigation.navigate('Topic', { topicId: 'ai' }) },
    { label: 'AWS', bg: visualFor('aws').bg, icon: 'cloud-outline', onPress: () => navigation.navigate('Topic', { topicId: 'aws' }) },
    { label: 'Settings', bg: '#D5E3B8', icon: 'settings-outline', onPress: () => navigation.navigate('You') },
  ];

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <AppHeader title="Student Dashboard" />
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcome}>Welcome, {displayName}</Text>
        <Text style={styles.level}>Level up your full-stack skills</Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Ionicons name="time-outline" size={18} color={colors.purple} />
            <Text style={styles.statVal}>{hours.weekday}</Text>
            <Text style={styles.statLab}>Weekday</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="book-outline" size={18} color={colors.purple} />
            <Text style={styles.statVal}>{s.completed}</Text>
            <Text style={styles.statLab}>Lessons done</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {tiles.map((tile) => (
            <Pressable
              key={tile.label}
              accessibilityRole="button"
              onPress={tile.onPress}
              style={[styles.tile, { backgroundColor: tile.bg }]}
            >
              <Ionicons name={tile.icon} size={30} color={colors.ink} />
              <Text style={styles.tileLabel}>{tile.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { paddingHorizontal: 16, paddingBottom: 28 },
  welcome: { fontSize: 26, fontWeight: '800', color: colors.ink, marginTop: 4 },
  level: { color: colors.muted, marginTop: 4, marginBottom: 14 },
  stats: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  stat: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 14,
  },
  statVal: { fontSize: 22, fontWeight: '800', color: colors.ink, marginTop: 8 },
  statLab: { color: colors.muted, fontSize: 12, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: {
    width: '30.5%',
    aspectRatio: 1,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tileLabel: { fontWeight: '700', color: colors.ink, fontSize: 12, textAlign: 'center' },
});
