import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, hours } from '../theme';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function HoursScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8 }]}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <View style={styles.head}>
          <Text style={styles.title}>Hours</Text>
          <View style={styles.pill}>
            <Text style={styles.pillText}>From your plan</Text>
          </View>
        </View>
        <Text style={styles.lead}>
          Still employed: weekdays {hours.weekdayRange}, weekends {hours.weekendRange}. Do not
          double a missed day.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Best time to study</Text>
          <View style={styles.days}>
            {days.map((d, i) => (
              <View key={`${d}-${i}`} style={[styles.day, i < 5 ? styles.dayOn : styles.dayOff]}>
                <Text style={[styles.dayText, i < 5 && { color: '#fff' }]}>{d}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.slot}>Weekday slot · 90 min after work</Text>
          <View style={styles.wave}>
            <View style={styles.waveFill} />
          </View>
          <Text style={styles.caption}>
            DSA {hours.weekdaySplit.dsa} · Python {hours.weekdaySplit.python} · Apply{' '}
            {hours.weekdaySplit.apply}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekend block · {hours.weekend}</Text>
          <Row label="DSA" value={hours.weekendSplit.dsa} />
          <Row label="Python / RateBrain" value={hours.weekendSplit.python} />
          <Row label="Apply + stories" value={hours.weekendSplit.apply} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>If you only have 60 min</Text>
          <Text style={styles.body}>
            DSA 30 + RateBrain 30. Send 8 applications at lunch. Saturday catches a miss — not 2×
            volume.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '700', color: colors.ink },
  pill: {
    backgroundColor: colors.card,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillText: { fontWeight: '600', color: colors.ink },
  lead: { color: colors.muted, marginTop: 10, lineHeight: 20 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 16,
    marginTop: 14,
  },
  cardTitle: { fontWeight: '700', color: colors.ink, marginBottom: 12 },
  days: { flexDirection: 'row', justifyContent: 'space-between' },
  day: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayOn: { backgroundColor: colors.ink },
  dayOff: { backgroundColor: colors.bg },
  dayText: { fontWeight: '700', color: colors.muted },
  slot: { marginTop: 14, color: colors.muted },
  wave: {
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.mint,
    marginTop: 10,
    overflow: 'hidden',
  },
  waveFill: {
    position: 'absolute',
    left: '55%',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.yellow,
    opacity: 0.7,
  },
  caption: { color: colors.muted, marginTop: 10, fontSize: 13 },
  body: { color: colors.muted, lineHeight: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  rowLabel: { color: colors.ink },
  rowValue: { fontWeight: '700', color: colors.ink },
});
