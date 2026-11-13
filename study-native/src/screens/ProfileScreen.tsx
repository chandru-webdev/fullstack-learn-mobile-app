import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../components/AppHeader';
import { useSession } from '../context/Session';
import { colors } from '../theme';
import { stats } from '../unlock';

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { username, displayName, progress, logout } = useSession();
  const s = stats(progress);
  const google = Boolean(username?.startsWith('google:'));

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <AppHeader title="Settings" />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.card}>
          <Text style={styles.label}>{google ? 'Google' : 'Account'}</Text>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.meta}>
            {s.completed}/{s.total} lessons · progress stays on this user only
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.body}>
            Open the menu for Search, Progress, Awards, Study Goals, Settings and Logout. Courses
            holds every topic with its icon.
          </Text>
        </View>
        <Pressable accessibilityRole="button" onPress={logout} style={styles.btn}>
          <Text style={styles.btnText}>Log out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 16,
    marginTop: 14,
  },
  label: { color: colors.muted, fontSize: 12 },
  name: { fontSize: 24, fontWeight: '800', color: colors.ink, marginTop: 4 },
  meta: { color: colors.muted, marginTop: 6 },
  body: { color: colors.ink, lineHeight: 21 },
  btn: {
    marginTop: 20,
    backgroundColor: colors.purpleDeep,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700' },
});
