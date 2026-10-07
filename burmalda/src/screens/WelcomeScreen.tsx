import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FadeIn from '../components/FadeIn';
import { FrostCard } from '../components/Glass';
import PressableScale from '../components/PressableScale';
import { memes, SLOGAN } from '../data';
import { colors, fonts } from '../theme';

const badges = [
  { emoji: '🔥', label: `${memes.length} мемов` },
  { emoji: '🎲', label: 'Рандом' },
  { emoji: '❤️', label: 'Избранное' },
];

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  const appear = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(appear, { toValue: 1, useNativeDriver: true, damping: 8, stiffness: 120 }).start();
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    const rotate = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 8000, easing: Easing.linear, useNativeDriver: true }),
    );
    loop.start();
    rotate.start();
    return () => {
      loop.stop();
      rotate.stop();
    };
  }, [appear, float, spin]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Animated.View
          style={[
            styles.logoWrap,
            {
              transform: [
                { scale: appear },
                { translateY: float.interpolate({ inputRange: [0, 1], outputRange: [0, -12] }) },
              ],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.ring,
              { transform: [{ rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] },
            ]}
          >
            <LinearGradient colors={[colors.pink, colors.accent, colors.violet]} style={StyleSheet.absoluteFill} />
          </Animated.View>
          <View style={styles.logo}>
            <Animated.Text
              style={[
                styles.logoEmoji,
                { transform: [{ rotate: float.interpolate({ inputRange: [0, 1], outputRange: ['-10deg', '10deg'] }) }] },
              ]}
            >
              🕺
            </Animated.Text>
          </View>
        </Animated.View>

        <FadeIn delay={250}>
          <Text style={styles.title}>БУРМАЛДА</Text>
        </FadeIn>
        <FadeIn delay={380}>
          <Text style={styles.subtitle}>мемы про Меллстроя и красивую бурмалду</Text>
        </FadeIn>
        <FadeIn delay={500}>
          <FrostCard style={styles.slogan}>
            <Text style={styles.sloganText}>«{SLOGAN}»</Text>
          </FrostCard>
        </FadeIn>
        <FadeIn delay={640} style={styles.buttonWrap}>
          <PressableScale accessibilityRole="button" onPress={onStart}>
            <LinearGradient
              colors={[colors.accent, colors.accentDeep]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Начать бурмалдить</Text>
            </LinearGradient>
          </PressableScale>
        </FadeIn>
      </View>

      <View style={styles.badges}>
        {badges.map((b, i) => (
          <FadeIn key={b.label} delay={800 + i * 120} from={30} style={styles.badge}>
            <FrostCard radius={22} style={styles.badgeIcon}>
              <Text style={styles.badgeEmoji}>{b.emoji}</Text>
            </FrostCard>
            <Text style={styles.badgeLabel}>{b.label}</Text>
          </FadeIn>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoWrap: { width: 170, height: 170, alignItems: 'center', justifyContent: 'center', marginBottom: 28 },
  ring: { position: 'absolute', width: 170, height: 170, borderRadius: 85, overflow: 'hidden' },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: { fontSize: 78 },
  title: { fontFamily: fonts.bold, fontSize: 36, color: colors.accent, textAlign: 'center', letterSpacing: 2 },
  subtitle: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 10, color: colors.muted },
  slogan: { marginTop: 22, paddingHorizontal: 18, paddingVertical: 14 },
  sloganText: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 21, textAlign: 'center', color: colors.text },
  buttonWrap: { alignSelf: 'stretch', marginTop: 30 },
  button: { paddingVertical: 18, borderRadius: 18, alignItems: 'center' },
  buttonText: { fontFamily: fonts.bold, fontSize: 16, color: colors.textOnAccent },
  badges: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 24 },
  badge: { alignItems: 'center', gap: 8 },
  badgeIcon: { width: 66, height: 66, alignItems: 'center', justifyContent: 'center' },
  badgeEmoji: { fontSize: 30 },
  badgeLabel: { fontFamily: fonts.medium, fontSize: 12, color: colors.text },
});
