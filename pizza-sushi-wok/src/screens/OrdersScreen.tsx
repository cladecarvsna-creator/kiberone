import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { Order, OrderStatus, orders } from '../data';
import { colors, fonts } from '../theme';

const statusInfo: Record<OrderStatus, { label: string; color: string }> = {
  cooking: { label: 'Готовится', color: colors.price },
  onTheWay: { label: 'В пути', color: colors.green },
  delivered: { label: 'Доставлен', color: colors.gray },
};

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Header title="Мои заказы" />
      <ScrollView contentContainerStyle={styles.content}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ScrollView>
    </View>
  );
}

function OrderCard({ order }: { order: Order }) {
  const status = statusInfo[order.status];
  const delivered = order.status === 'delivered';

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.number}>Заказ {order.number}</Text>
        <View style={[styles.badge, { backgroundColor: status.color }]}>
          <Text style={styles.badgeText}>{status.label}</Text>
        </View>
      </View>

      <View style={styles.items}>
        {order.items.map((item) => (
          <Text key={item} style={styles.item}>
            {item}
          </Text>
        ))}
      </View>

      <View style={styles.meta}>
        <Text style={styles.time}>{order.time}</Text>
        <Text style={styles.total}>{order.total}₽</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.button,
          delivered ? styles.repeatButton : styles.trackButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.buttonText, delivered ? styles.repeatText : styles.trackText]}>
          {delivered ? 'Повторить заказ' : 'Отследить'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  number: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  badge: { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  badgeText: { fontFamily: fonts.medium, fontSize: 11, color: colors.white },
  items: { marginTop: 12, gap: 4 },
  item: { fontFamily: fonts.regular, fontSize: 13, color: colors.text },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  time: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  total: { fontFamily: fonts.bold, fontSize: 18, color: colors.text },
  button: { marginTop: 14, borderRadius: 12, paddingVertical: 13, alignItems: 'center' },
  trackButton: { backgroundColor: colors.text },
  repeatButton: { backgroundColor: colors.accent },
  pressed: { opacity: 0.8 },
  buttonText: { fontFamily: fonts.medium, fontSize: 14 },
  trackText: { color: colors.white },
  repeatText: { color: colors.text },
});
