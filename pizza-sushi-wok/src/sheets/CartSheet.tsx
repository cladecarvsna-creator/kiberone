import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FadeIn from '../components/FadeIn';
import PressableScale from '../components/PressableScale';
import Sheet from '../components/Sheet';
import { findProduct } from '../data';
import { useColors, useStore } from '../store';
import { fonts } from '../theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  onCheckout: () => void;
  onGoToMenu: () => void;
};

function itemsWord(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'товар';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'товара';
  return 'товаров';
}

export default function CartSheet({ visible, onClose, onCheckout, onGoToMenu }: Props) {
  const colors = useColors();
  const { cart, cartCount, cartTotal, changeQty, clearCart, settings } = useStore();

  return (
    <Sheet visible={visible} onClose={onClose} title="Корзина">
      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Корзина пуста</Text>
          <Text style={[styles.emptyText, { color: colors.muted }]}>Добавьте пиццу или роллы из меню</Text>
          <PressableScale onPress={onGoToMenu} style={[styles.primary, { backgroundColor: colors.accent }]}>
            <Text style={styles.primaryText}>Перейти в меню</Text>
          </PressableScale>
        </View>
      ) : (
        <>
          <ScrollView style={styles.list} contentContainerStyle={{ gap: 10 }}>
            {cart.map((line, i) => {
              const p = findProduct(line.productId);
              if (!p) return null;
              return (
                <FadeIn key={line.productId} delay={i * 50}>
                  <View style={[styles.line, { backgroundColor: colors.input, borderColor: colors.glassBorder }]}>
                    <View style={[styles.emoji, { backgroundColor: colors.accent }]}>
                      <Text style={styles.emojiText}>{p.emoji}</Text>
                    </View>
                    <View style={styles.info}>
                      <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
                        {p.name}
                      </Text>
                      <Text style={[styles.price, { color: colors.price }]}>{p.price * line.qty}₽</Text>
                    </View>
                    <View style={styles.stepper}>
                      <PressableScale
                        accessibilityLabel={`Убрать ${p.name}`}
                        onPress={() => changeQty(p.id, -1)}
                        style={[styles.stepBtn, { backgroundColor: colors.inactiveTab }]}
                      >
                        <Text style={styles.stepText}>−</Text>
                      </PressableScale>
                      <Text style={[styles.qty, { color: colors.text }]}>{line.qty}</Text>
                      <PressableScale
                        accessibilityLabel={`Добавить ${p.name}`}
                        onPress={() => changeQty(p.id, 1)}
                        style={[styles.stepBtn, { backgroundColor: colors.accent }]}
                      >
                        <Text style={[styles.stepText, { color: '#000000' }]}>+</Text>
                      </PressableScale>
                    </View>
                  </View>
                </FadeIn>
              );
            })}
          </ScrollView>

          <View style={[styles.delivery, { borderColor: colors.divider }]}>
            <Text style={[styles.deliveryText, { color: colors.muted }]} numberOfLines={1}>
              📍 {settings.deliveryMethod === 'Самовывоз' ? 'Самовывоз' : settings.address}
            </Text>
            <Text style={[styles.deliveryText, { color: colors.muted }]} numberOfLines={1}>
              🕒 {settings.deliveryTime} · 💳 {settings.paymentMethod}
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.muted }]}>
              {cartCount} {itemsWord(cartCount)}
            </Text>
            <Text style={[styles.total, { color: colors.text }]}>{cartTotal}₽</Text>
          </View>

          <PressableScale onPress={onCheckout} style={[styles.primary, { backgroundColor: colors.accent }]}>
            <Text style={styles.primaryText}>Оформить заказ</Text>
          </PressableScale>
          <PressableScale onPress={clearCart} style={styles.secondary} haptic={false}>
            <Text style={[styles.secondaryText, { color: colors.muted }]}>Очистить корзину</Text>
          </PressableScale>
        </>
      )}
    </Sheet>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', paddingVertical: 12 },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontFamily: fonts.bold, fontSize: 18, marginTop: 12 },
  emptyText: { fontFamily: fonts.regular, fontSize: 13, marginTop: 6, marginBottom: 20 },
  list: { flexGrow: 0, maxHeight: 340 },
  line: { flexDirection: 'row', alignItems: 'center', borderRadius: 18, borderWidth: 1, padding: 10, gap: 12 },
  emoji: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  emojiText: { fontSize: 24 },
  info: { flex: 1 },
  name: { fontFamily: fonts.medium, fontSize: 14 },
  price: { fontFamily: fonts.bold, fontSize: 14, marginTop: 4 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stepBtn: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  stepText: { fontFamily: fonts.bold, fontSize: 18, color: '#FFFFFF', lineHeight: 22 },
  qty: { fontFamily: fonts.bold, fontSize: 15, minWidth: 18, textAlign: 'center' },
  delivery: { borderTopWidth: 1, marginTop: 14, paddingTop: 12, gap: 4 },
  deliveryText: { fontFamily: fonts.regular, fontSize: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 14 },
  totalLabel: { fontFamily: fonts.regular, fontSize: 14 },
  total: { fontFamily: fonts.bold, fontSize: 24 },
  primary: { alignSelf: 'stretch', borderRadius: 18, paddingVertical: 17, alignItems: 'center' },
  primaryText: { fontFamily: fonts.bold, fontSize: 16, color: '#000000' },
  secondary: { alignItems: 'center', paddingVertical: 12 },
  secondaryText: { fontFamily: fonts.medium, fontSize: 13 },
});
