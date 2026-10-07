import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';

const categories = [
  { emoji: '🍕', label: 'Пиццы' },
  { emoji: '🍣', label: 'Роллы' },
  { emoji: '🥡', label: 'Вок' },
];

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.logo}>
          <Text style={styles.logoEmoji}>🍕</Text>
        </View>
        <Text style={styles.title}>Пицца Суши Вок</Text>
        <Text style={styles.subtitle}>Доставка вкусной еды прямо к вашей двери</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onStart}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Начать заказ</Text>
        </Pressable>
      </View>

      <View style={styles.categories}>
        {categories.map((c) => (
          <View key={c.label} style={styles.category}>
            <View style={styles.categoryIcon}>
              <Text style={styles.categoryEmoji}>{c.emoji}</Text>
            </View>
            <Text style={styles.categoryLabel}>{c.label}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoEmoji: { fontSize: 80 },
  title: { fontFamily: fonts.bold, fontSize: 28, color: colors.text, textAlign: 'center' },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 280,
  },
  button: {
    marginTop: 40,
    backgroundColor: colors.accent,
    paddingVertical: 18,
    borderRadius: 16,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  pressed: { opacity: 0.8 },
  buttonText: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
  },
  category: { alignItems: 'center', gap: 8 },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryEmoji: { fontSize: 30 },
  categoryLabel: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
});
