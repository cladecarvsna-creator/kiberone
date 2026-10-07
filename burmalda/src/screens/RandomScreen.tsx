import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View } from 'react-native';
import MemeCard from '../components/MemeCard';
import PressableScale from '../components/PressableScale';
import ScreenHeader from '../components/ScreenHeader';
import { memes, randomReactions } from '../data';
import { useStore } from '../store';
import { colors, fonts } from '../theme';

type Props = { bottomInset: number; onToast: (message: string) => void };

const CONFETTI = ['🎉', '✨', '💸', '🕺', '👑', '🔥', '🪩', '⭐'];

function pickOther(currentId: string) {
  const others = memes.filter((m) => m.id !== currentId);
  return others[Math.floor(Math.random() * others.length)];
}

export default function RandomScreen({ bottomInset, onToast }: Props) {
  const { spins, addSpin } = useStore();
  const [meme, setMeme] = useState(() => memes[Math.floor(Math.random() * memes.length)]);
  const [reaction, setReaction] = useState(randomReactions[0]);
  const flip = useRef(new Animated.Value(0)).current;
  const burst = useRef(new Animated.Value(1)).current;
  const busy = useRef(false);

  const spin = () => {
    if (busy.current) return;
    busy.current = true;
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    Animated.timing(flip, { toValue: 1, duration: 220, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(() => {
      setMeme((m) => pickOther(m.id));
      setReaction(randomReactions[Math.floor(Math.random() * randomReactions.length)]);
      addSpin();
      flip.setValue(-1);
      Animated.spring(flip, { toValue: 0, useNativeDriver: true, damping: 9, stiffness: 140 }).start(() => {
        busy.current = false;
      });
      burst.setValue(0);
      Animated.timing(burst, { toValue: 1, duration: 900, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
    });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Рандом"
        right={
          <View style={styles.counter}>
            <Text style={styles.counterText}>🎲 {spins}</Text>
          </View>
        }
      />
      <View style={[styles.content, { paddingBottom: bottomInset }]}>
        <Text style={styles.reaction}>{reaction}</Text>
        <View style={styles.stage}>
          {CONFETTI.map((e, i) => {
            const angle = (i / CONFETTI.length) * Math.PI * 2;
            return (
              <Animated.Text
                key={e}
                pointerEvents="none"
                style={[
                  styles.confetti,
                  {
                    opacity: burst.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 1, 0] }),
                    transform: [
                      { translateX: burst.interpolate({ inputRange: [0, 1], outputRange: [0, Math.cos(angle) * 170] }) },
                      { translateY: burst.interpolate({ inputRange: [0, 1], outputRange: [0, Math.sin(angle) * 220] }) },
                      { scale: burst.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1.3] }) },
                    ],
                  },
                ]}
              >
                {e}
              </Animated.Text>
            );
          })}
          <Animated.View
            style={{
              transform: [
                { perspective: 900 },
                { rotateY: flip.interpolate({ inputRange: [-1, 0, 1], outputRange: ['-90deg', '0deg', '90deg'] }) },
                { scale: flip.interpolate({ inputRange: [-1, 0, 1], outputRange: [0.9, 1, 0.9] }) },
              ],
            }}
          >
            <MemeCard meme={meme} onToast={onToast} big />
          </Animated.View>
        </View>
        <PressableScale accessibilityRole="button" onPress={spin} style={styles.buttonWrap}>
          <LinearGradient
            colors={[colors.pink, colors.violet]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>🎲 Крутить бурмалду</Text>
          </LinearGradient>
        </PressableScale>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  counter: { backgroundColor: colors.inactiveTab, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 7 },
  counterText: { fontFamily: fonts.bold, fontSize: 13, color: colors.text },
  content: { flex: 1, paddingHorizontal: 20, justifyContent: 'center' },
  reaction: { fontFamily: fonts.bold, fontSize: 22, color: colors.accent, textAlign: 'center', marginBottom: 18 },
  stage: { justifyContent: 'center' },
  confetti: { position: 'absolute', alignSelf: 'center', fontSize: 28, zIndex: 2 },
  buttonWrap: { marginTop: 26 },
  button: { paddingVertical: 18, borderRadius: 18, alignItems: 'center' },
  buttonText: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
});
