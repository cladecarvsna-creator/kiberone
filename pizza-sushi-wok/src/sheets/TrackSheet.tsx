import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Sheet from '../components/Sheet';
import { Order } from '../data';
import { useColors, useStore } from '../store';
import { fonts } from '../theme';

const steps = [
  { title: 'Заказ принят', emoji: '✅' },
  { title: 'Готовится', emoji: '👨‍🍳' },
  { title: 'В пути', emoji: '🛵' },
  { title: 'Доставлен', emoji: '🏠' },
];

const stepIndex = { cooking: 1, onTheWay: 2, delivered: 3 } as const;

export default function TrackSheet({ order, visible, onClose }: { order: Order | null; visible: boolean; onClose: () => void }) {
  const colors = useColors();
  const { settings } = useStore();
  const progress = useRef(new Animated.Value(0)).current;
  const current = order ? stepIndex[order.status] : 0;

  useEffect(() => {
    if (!visible) return;
    progress.setValue(0);
    Animated.timing(progress, { toValue: current / (steps.length - 1), duration: 900, delay: 250, useNativeDriver: false }).start();
  }, [visible, current, progress]);

  if (!order) return null;

  return (
    <Sheet visible={visible} onClose={onClose} title={`Заказ ${order.number}`}>
      <View style={styles.timeline}>
        <View style={[styles.track, { backgroundColor: colors.divider }]}>
          <Animated.View
            style={[
              styles.fill,
              {
                backgroundColor: colors.accent,
                height: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
              },
            ]}
          />
        </View>
        {steps.map((step, i) => {
          const done = i <= current;
          return (
            <View key={step.title} style={styles.step}>
              <View
                style={[
                  styles.circle,
                  { backgroundColor: done ? colors.accent : colors.input, borderColor: done ? colors.accent : colors.glassBorder },
                ]}
              >
                <Text style={styles.circleEmoji}>{step.emoji}</Text>
              </View>
              <View>
                <Text style={[styles.stepTitle, { color: done ? colors.text : colors.muted }]}>{step.title}</Text>
                {i === current && <Text style={[styles.now, { color: colors.price }]}>Сейчас</Text>}
              </View>
            </View>
          );
        })}
      </View>
      <Text style={[styles.address, { color: colors.muted }]}>📍 {settings.address}</Text>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  timeline: { gap: 18, paddingVertical: 4 },
  track: { position: 'absolute', left: 21, top: 24, bottom: 24, width: 4, borderRadius: 2, overflow: 'hidden' },
  fill: { width: '100%', borderRadius: 2 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  circle: { width: 46, height: 46, borderRadius: 23, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  circleEmoji: { fontSize: 20 },
  stepTitle: { fontFamily: fonts.medium, fontSize: 15 },
  now: { fontFamily: fonts.medium, fontSize: 11, marginTop: 2 },
  address: { fontFamily: fonts.regular, fontSize: 13, marginTop: 18 },
});
