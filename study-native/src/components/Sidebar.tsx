import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSession } from '../context/Session';
import { useUi } from '../context/Ui';
import type { RootStackParamList } from '../navigation';
import { colors } from '../theme';

const items: { key: string; label: string; icon: keyof typeof Ionicons.glyphMap; tab?: 'Home' | 'Courses' | 'Progress' | 'You' }[] =
  [
    { key: 'search', label: 'Search', icon: 'search-outline', tab: 'Courses' },
    { key: 'notes', label: 'Notifications', icon: 'notifications-outline' },
    { key: 'progress', label: 'Progress', icon: 'stats-chart-outline', tab: 'Progress' },
    { key: 'awards', label: 'Awards', icon: 'ribbon-outline', tab: 'Progress' },
    { key: 'goals', label: 'Study Goals', icon: 'star-outline', tab: 'Home' },
    { key: 'settings', label: 'Settings', icon: 'settings-outline', tab: 'You' },
  ];

export function Sidebar() {
  const insets = useSafeAreaInsets();
  const { sidebarOpen, closeSidebar } = useUi();
  const { logout, displayName } = useSession();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function go(tab?: 'Home' | 'Courses' | 'Progress' | 'You') {
    closeSidebar();
    if (tab) navigation.navigate('Tabs', { screen: tab } as never);
  }

  return (
    <Modal visible={sidebarOpen} transparent animationType="fade" onRequestClose={closeSidebar}>
      <View style={styles.wrap}>
        <View style={[styles.panel, { paddingTop: insets.top + 18 }]}>
          <Text style={styles.hello}>Hello, {displayName}</Text>
          {items.map((item) => (
            <Pressable
              key={item.key}
              accessibilityRole="button"
              onPress={() => go(item.tab)}
              style={styles.row}
            >
              <Ionicons name={item.icon} size={22} color={colors.purple} />
              <Text style={styles.label}>{item.label}</Text>
            </Pressable>
          ))}
          <View style={styles.spacer} />
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              closeSidebar();
              logout();
            }}
            style={styles.row}
          >
            <Ionicons name="log-out-outline" size={22} color={colors.purple} />
            <Text style={styles.label}>Logout</Text>
          </Pressable>
        </View>
        <Pressable style={styles.dim} onPress={closeSidebar} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(40, 24, 90, 0.35)' },
  panel: {
    width: 268,
    backgroundColor: colors.card,
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  hello: { fontSize: 16, fontWeight: '700', color: colors.ink, marginBottom: 18, marginLeft: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 13, paddingHorizontal: 6 },
  label: { fontSize: 16, color: colors.ink, fontWeight: '600' },
  spacer: { flex: 1, minHeight: 24 },
  dim: { flex: 1 },
});
