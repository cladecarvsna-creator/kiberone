import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import FadeIn from '../components/FadeIn';
import { FrostCard } from '../components/Glass';
import PressableScale from '../components/PressableScale';
import ScreenHeader from '../components/ScreenHeader';
import { findProduct, Order, OrderStatus } from '../data';
import { useColors, useStore } from '../store';
import { Colors, fonts } from '../theme';

export function statusInfo(colors: Colors): Record<OrderStatus, { label: string; color: string }> {
  return {
    cooking: { label: 'Готовится', color: colors.price },
    onTheWay: { label: 'В пути', color: colors.green },
    delivered: { label: 'Доставлен', color: colors.gray },
  };
}

type Props = {
  onTrack: (order: Order) => void;
  onRepeat: (order: Order) => void;
  bottomInset: number;
};

export default function OrdersScreen({ onTrack, onRepeat, bottomInset }: Props) {
  const { orders } = useStore();
  return (
    <View style={styles.container}>
      <ScreenHeader title="Мои заказы" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}>
        {orders.map((order, i) => (
          <FadeIn key={order.id} delay={i * 80}>
            <OrderCard order={order} onTrack={onTrack} onRepeat={onRepeat} />
          </FadeIn>
        ))}
      </ScrollView>
    </View>
  );
}

function PulseDot() {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.timing(v, { toValue: 1, duration: 1200, useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [v]);
  return (
    <View style={styles.dotWrap}>
      <Animated.View
        style={[
          styles.dotPulse,
          {
            opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.8, 0] }),
            transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 2.6] }) }],
          },
        ]}
      />
      <View style={styles.dot} />
    </View>
  );
}

function OrderCard({ order, onTrack, onRepeat }: { order: Order } & Omit<Props, 'bottomInset'>) {
  const colors = useColors();
  const status = statusInfo(colors)[order.status];
  const delivered = order.status === 'delivered';

  return (
    <FrostCard style={styles.card}>
      <View style={styles.top}>
        <Text style={[styles.number, { color: colors.text }]}>Заказ {order.number}</Text>
        <View style={[styles.badge, { backgroundColor: status.color }]}>
          {!delivered && <PulseDot />}
          <Text style={styles.badgeText}>{status.label}</Text>
        </View>
      </View>

      <View style={styles.items}>
        {order.lines.map((line) => {
          const p = findProduct(line.productId);
          return (
            <Text key={line.productId} style={[styles.item, { color: colors.text }]}>
              {p?.name ?? line.productId} × {line.qty}
            </Text>
          );
        })}
      </View>

      <View style={styles.meta}>
        <Text style={[styles.time, { color: colors.muted }]}>{order.time}</Text>
        <Text style={[styles.total, { color: colors.text }]}>{order.total}₽</Text>
      </View>

      <PressableScale
        accessibilityRole="button"
        onPress={() => (delivered ? onRepeat(order) : onTrack(order))}
        style={[styles.button, { backgroundColor: delivered ? colors.accent : '#000000' }]}
      >
        <Text style={[styles.buttonText, { color: delivered ? '#000000' : '#FFFFFF' }]}>
          {delivered ? 'Повторить заказ' : 'Отследить'}
        </Text>
      </PressableScale>
    </FrostCard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  card: { padding: 16, marginBottom: 12 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  number: { fontFamily: fonts.bold, fontSize: 16 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  badgeText: { fontFamily: fonts.medium, fontSize: 11, color: '#FFFFFF' },
  dotWrap: { width: 8, height: 8, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFFFFF' },
  dotPulse: { position: 'absolute', width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFFFFF' },
  items: { marginTop: 12, gap: 4 },
  item: { fontFamily: fonts.regular, fontSize: 13 },
  meta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  time: { fontFamily: fonts.regular, fontSize: 12 },
  total: { fontFamily: fonts.bold, fontSize: 18 },
  button: { marginTop: 14, borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
  buttonText: { fontFamily: fonts.medium, fontSize: 14 },
});
