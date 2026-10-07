import { useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, View } from 'react-native';
import FadeIn from '../components/FadeIn';
import MemeCard from '../components/MemeCard';
import PressableScale from '../components/PressableScale';
import ScreenHeader from '../components/ScreenHeader';
import { memes } from '../data';
import { useStore } from '../store';
import { colors, fonts } from '../theme';

type Props = { bottomInset: number; onToast: (message: string) => void; onGoToFeed: () => void };

export default function FavoritesScreen({ bottomInset, onToast, onGoToFeed }: Props) {
  const { favorites } = useStore();
  const list = favorites.map((id) => memes.find((m) => m.id === id)).filter((m) => m !== undefined);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Избранное"
        right={
          <View style={styles.counter}>
            <Text style={styles.counterText}>❤️ {list.length}</Text>
          </View>
        }
      />
      {list.length === 0 ? (
        <Empty onGoToFeed={onGoToFeed} bottomInset={bottomInset} />
      ) : (
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}>
          {list.map((m, i) => (
            <FadeIn key={m.id} delay={Math.min(i, 6) * 70}>
              <MemeCard meme={m} onToast={onToast} />
            </FadeIn>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function Empty({ onGoToFeed, bottomInset }: { onGoToFeed: () => void; bottomInset: number }) {
  const beat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(beat, { toValue: 1, duration: 300, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(beat, { toValue: 0, duration: 500, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        Animated.delay(400),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [beat]);

  return (
    <FadeIn style={[styles.empty, { paddingBottom: bottomInset }]}>
      <Animated.Text
        style={[styles.emptyEmoji, { transform: [{ scale: beat.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }] }]}
      >
        💔
      </Animated.Text>
      <Text style={styles.emptyTitle}>Пока пусто</Text>
      <Text style={styles.emptyText}>Жми 🤍 на мемах в ленте, и самые красивые бурмалды соберутся здесь.</Text>
      <PressableScale accessibilityRole="button" onPress={onGoToFeed} style={styles.button}>
        <Text style={styles.buttonText}>В ленту</Text>
      </PressableScale>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  counter: { backgroundColor: colors.inactiveTab, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 7 },
  counterText: { fontFamily: fonts.bold, fontSize: 13, color: colors.text },
  content: { paddingHorizontal: 20 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 36 },
  emptyEmoji: { fontSize: 72 },
  emptyTitle: { fontFamily: fonts.bold, fontSize: 22, color: colors.text, marginTop: 16 },
  emptyText: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 21, color: colors.muted, textAlign: 'center', marginTop: 10 },
  button: { marginTop: 24, backgroundColor: colors.accent, borderRadius: 16, paddingHorizontal: 26, paddingVertical: 14 },
  buttonText: { fontFamily: fonts.bold, fontSize: 14, color: colors.textOnAccent },
});
