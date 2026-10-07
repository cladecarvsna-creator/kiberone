import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FadeIn from '../components/FadeIn';
import { FrostCard } from '../components/Glass';
import PressableScale from '../components/PressableScale';
import { useColors } from '../store';
import { fonts } from '../theme';

const categories = [
  { emoji: '🍕', label: 'Пиццы' },
  { emoji: '🍣', label: 'Роллы' },
  { emoji: '🥡', label: 'Вок' },
];

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const colors = useColors();
  const appear = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(appear, { toValue: 1, useNativeDriver: true, damping: 9, stiffness: 120 }).start();
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [appear, float]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Animated.View
          style={[
            styles.logo,
            {
              backgroundColor: colors.accent,
              transform: [
                { scale: appear },
                { translateY: float.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) },
              ],
            },
          ]}
        >
          <View style={styles.logoShine} />
          <Animated.Text
            style={[
              styles.logoEmoji,
              {
                transform: [
                  { rotate: float.interpolate({ inputRange: [0, 1], outputRange: ['-8deg', '8deg'] }) },
                ],
              },
            ]}
          >
            🍕
          </Animated.Text>
        </Animated.View>

        <FadeIn delay={250}>
          <Text style={[styles.title, { color: colors.text }]}>Пицца Суши Вок</Text>
        </FadeIn>
        <FadeIn delay={380}>
          <Text style={[styles.subtitle, { color: colors.muted }]}>Доставка вкусной еды прямо к вашей двери</Text>
        </FadeIn>
        <FadeIn delay={520} style={styles.buttonWrap}>
          <PressableScale
            accessibilityRole="button"
            onPress={onStart}
            style={[styles.button, { backgroundColor: colors.accent }]}
          >
            <Text style={styles.buttonText}>Начать заказ</Text>
          </PressableScale>
        </FadeIn>
      </View>

      <View style={styles.categories}>
        {categories.map((c, i) => (
          <FadeIn key={c.label} delay={700 + i * 120} from={30} style={styles.category}>
            <FrostCard radius={22} style={styles.categoryIcon}>
              <Text style={styles.categoryEmoji}>{c.emoji}</Text>
            </FrostCard>
            <Text style={[styles.categoryLabel, { color: colors.text }]}>{c.label}</Text>
          </FadeIn>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    overflow: 'hidden',
    shadowColor: '#FFC700',
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  logoShine: {
    position: 'absolute',
    top: 10,
    left: 22,
    width: 70,
    height: 36,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.35)',
    transform: [{ rotate: '-25deg' }],
  },
  logoEmoji: { fontSize: 80 },
  title: { fontFamily: fonts.bold, fontSize: 28, textAlign: 'center' },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 280,
  },
  buttonWrap: { alignSelf: 'stretch', marginTop: 40 },
  button: { paddingVertical: 18, borderRadius: 18, alignItems: 'center' },
  buttonText: { fontFamily: fonts.bold, fontSize: 16, color: '#000000' },
  categories: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 24 },
  category: { alignItems: 'center', gap: 8 },
  categoryIcon: { width: 66, height: 66, alignItems: 'center', justifyContent: 'center' },
  categoryEmoji: { fontSize: 30 },
  categoryLabel: { fontFamily: fonts.medium, fontSize: 13 },
});
