import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useUi } from '../context/Ui';
import { colors } from '../theme';

export function AppHeader({ title }: { title: string }) {
  const { openSidebar } = useUi();
  return (
    <View style={styles.row}>
      <Pressable accessibilityRole="button" onPress={openSidebar} style={styles.iconBtn}>
        <Ionicons name="menu" size={24} color={colors.ink} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable accessibilityRole="button" style={styles.iconBtn}>
        <Ionicons name="notifications-outline" size={22} color={colors.ink} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  title: { fontSize: 18, fontWeight: '700', color: colors.ink },
  iconBtn: { padding: 8 },
});
