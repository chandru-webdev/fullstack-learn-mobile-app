import { View } from 'react-native';

export function Sparkline({
  values,
  color,
}: {
  values: number[];
  color: string;
}) {
  return (
    <View style={{ height: 28, flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
      {values.map((v, i) => (
        <View
          key={i}
          style={{
            width: 4,
            height: Math.max(4, v * 28),
            borderRadius: 2,
            backgroundColor: color,
            opacity: 0.35 + v * 0.65,
          }}
        />
      ))}
    </View>
  );
}
