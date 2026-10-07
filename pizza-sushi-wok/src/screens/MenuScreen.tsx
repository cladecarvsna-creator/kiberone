import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import FadeIn from '../components/FadeIn';
import { FrostCard } from '../components/Glass';
import PressableScale from '../components/PressableScale';
import ScreenHeader from '../components/ScreenHeader';
import { pizzas, Product, rolls } from '../data';
import { useColors, useStore } from '../store';
import { fonts } from '../theme';

type Props = {
  onOpenCart: () => void;
  onAdded: (product: Product) => void;
  bottomInset: number;
};

export default function MenuScreen({ onOpenCart, onAdded, bottomInset }: Props) {
  const colors = useColors();
  const { cartCount } = useStore();
  const bump = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (cartCount === 0) return;
    bump.setValue(1.35);
    Animated.spring(bump, { toValue: 1, useNativeDriver: true, damping: 6, stiffness: 220 }).start();
  }, [cartCount, bump]);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Меню"
        right={
          <PressableScale onPress={onOpenCart} accessibilityRole="button" accessibilityLabel="Открыть корзину">
            <FrostCard radius={16} style={styles.cart}>
              <Text style={[styles.cartText, { color: colors.text }]}>🛒</Text>
              <Animated.View style={[styles.cartBadge, { backgroundColor: colors.accent, transform: [{ scale: bump }] }]}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </Animated.View>
            </FrostCard>
          </PressableScale>
        }
      />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}>
        <Section title="🍕 Пиццы" products={pizzas} onAdded={onAdded} startDelay={0} />
        <Section title="🍣 Роллы" products={rolls} onAdded={onAdded} startDelay={280} />
      </ScrollView>
    </View>
  );
}

function Section({
  title,
  products,
  onAdded,
  startDelay,
}: {
  title: string;
  products: Product[];
  onAdded: (product: Product) => void;
  startDelay: number;
}) {
  const colors = useColors();
  const { cart, addToCart } = useStore();

  return (
    <View style={styles.section}>
      <FadeIn delay={startDelay}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      </FadeIn>
      {products.map((p, i) => {
        const inCart = cart.find((l) => l.productId === p.id)?.qty ?? 0;
        return (
          <FadeIn key={p.id} delay={startDelay + 60 + i * 70}>
            <FrostCard style={styles.card}>
              <View style={styles.titleRow}>
                <Text style={[styles.name, { color: colors.text }]}>{p.name}</Text>
                {inCart > 0 && (
                  <View style={[styles.inCart, { backgroundColor: colors.inactiveTab }]}>
                    <Text style={styles.inCartText}>в корзине: {inCart}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.description, { color: colors.muted }]}>{p.description}</Text>
              <View style={styles.row}>
                <Text style={[styles.price, { color: colors.price }]}>{p.price}₽</Text>
                <PressableScale
                  accessibilityRole="button"
                  onPress={() => {
                    addToCart(p.id);
                    onAdded(p);
                  }}
                  style={[styles.button, { backgroundColor: colors.accent }]}
                >
                  <Text style={styles.buttonText}>В корзину</Text>
                </PressableScale>
              </View>
            </FrostCard>
          </FadeIn>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  cart: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 8 },
  cartText: { fontSize: 18 },
  cartBadge: { minWidth: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  cartBadgeText: { fontFamily: fonts.bold, fontSize: 12, color: '#000000' },
  section: { marginBottom: 12 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 20, marginTop: 8, marginBottom: 12 },
  card: { padding: 16, marginBottom: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  name: { fontFamily: fonts.bold, fontSize: 17, flexShrink: 1 },
  inCart: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
  inCartText: { fontFamily: fonts.medium, fontSize: 10, color: '#FFFFFF' },
  description: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 19, marginTop: 6 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 },
  price: { fontFamily: fonts.bold, fontSize: 18 },
  button: { borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10 },
  buttonText: { fontFamily: fonts.medium, fontSize: 13, color: '#000000' },
});
