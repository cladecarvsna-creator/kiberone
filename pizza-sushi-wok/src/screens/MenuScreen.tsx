import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { pizzas, Product, rolls } from '../data';
import { colors, fonts } from '../theme';

type Props = {
  cartCount: number;
  onAdd: (product: Product) => void;
};

export default function MenuScreen({ cartCount, onAdd }: Props) {
  return (
    <View style={styles.container}>
      <Header
        title="Меню"
        right={
          <View style={styles.cart}>
            <Text style={styles.cartText}>🛒 {cartCount}</Text>
          </View>
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Section title="🍕 Пиццы" products={pizzas} onAdd={onAdd} />
        <Section title="🍣 Роллы" products={rolls} onAdd={onAdd} />
      </ScrollView>
    </View>
  );
}

function Section({
  title,
  products,
  onAdd,
}: {
  title: string;
  products: Product[];
  onAdd: (product: Product) => void;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {products.map((p) => (
        <View key={p.id} style={styles.card}>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.description}>{p.description}</Text>
          <View style={styles.row}>
            <Text style={styles.price}>{p.price}₽</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => onAdd(p)}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            >
              <Text style={styles.buttonText}>В корзину</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  cart: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cartText: { fontFamily: fonts.medium, fontSize: 14, color: colors.text },
  section: { marginBottom: 12 },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
    marginTop: 8,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  name: { fontFamily: fonts.bold, fontSize: 17, color: colors.text },
  description: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  price: { fontFamily: fonts.bold, fontSize: 18, color: colors.price },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  pressed: { opacity: 0.8 },
  buttonText: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
});
