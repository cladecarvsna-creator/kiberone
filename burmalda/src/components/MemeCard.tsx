import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import { Animated, Platform, Share, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Meme, SLOGAN } from '../data';
import { useStore } from '../store';
import { colors, fonts } from '../theme';
import PressableScale from './PressableScale';

type Props = {
  meme: Meme;
  onToast?: (message: string) => void;
  big?: boolean;
};

/** Gradient meme card with a like counter, a favourite heart and a share button. */
export default function MemeCard({ meme, onToast, big }: Props) {
  const { isFavorite, toggleFavorite, likes, like } = useStore();
  const fav = isFavorite(meme.id);
  const heart = useRef(new Animated.Value(1)).current;
  const fire = useRef(new Animated.Value(0)).current;

  const pop = (v: Animated.Value) => {
    v.setValue(1.5);
    Animated.spring(v, { toValue: 1, useNativeDriver: true, damping: 5, stiffness: 220 }).start();
  };

  const onLike = () => {
    like(meme.id);
    fire.setValue(0);
    Animated.timing(fire, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  };

  const onFav = () => {
    pop(heart);
    const added = toggleFavorite(meme.id);
    if (added && Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    onToast?.(added ? `❤️ «${meme.title}» в избранном` : `💔 «${meme.title}» убран из избранного`);
  };

  const onShare = () => {
    Share.share({ message: `${meme.emoji} ${meme.text}\n\n— Бурмалда. ${SLOGAN}` }).catch(() => {});
  };

  return (
    <LinearGradient
      colors={meme.colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, big && styles.cardBig]}
    >
      <View style={styles.shine} />
      <View style={styles.top}>
        <Text style={[styles.emoji, big && styles.emojiBig]}>{meme.emoji}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {meme.title}
        </Text>
      </View>
      <Text style={[styles.text, big && styles.textBig]}>{meme.text}</Text>

      <View style={styles.actions}>
        <PressableScale accessibilityRole="button" accessibilityLabel="Огонь" onPress={onLike} style={styles.action}>
          <Text style={styles.actionText}>🔥 {likes[meme.id] ?? 0}</Text>
          <Animated.Text
            pointerEvents="none"
            style={[
              styles.flyUp,
              {
                opacity: fire.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 1, 0] }),
                transform: [
                  { translateY: fire.interpolate({ inputRange: [0, 1], outputRange: [0, -46] }) },
                  { scale: fire.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1.4] }) },
                ],
              },
            ]}
          >
            🔥
          </Animated.Text>
        </PressableScale>
        <View style={styles.spacer} />
        <PressableScale accessibilityRole="button" accessibilityLabel="Поделиться" onPress={onShare} style={styles.action}>
          <Text style={styles.actionText}>📤</Text>
        </PressableScale>
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={fav ? 'Убрать из избранного' : 'В избранное'}
          onPress={onFav}
          style={styles.action}
        >
          <Animated.Text style={[styles.actionText, { transform: [{ scale: heart }] }]}>{fav ? '❤️' : '🤍'}</Animated.Text>
        </PressableScale>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 26,
    padding: 18,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  cardBig: { padding: 24, borderRadius: 32, marginBottom: 0 },
  shine: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  emoji: { fontSize: 34 },
  emojiBig: { fontSize: 54 },
  title: { fontFamily: fonts.bold, fontSize: 15, color: colors.textOnAccent, flexShrink: 1 },
  text: { fontFamily: fonts.medium, fontSize: 17, lineHeight: 25, color: colors.textOnAccent, marginTop: 12 },
  textBig: { fontSize: 21, lineHeight: 31, marginTop: 18 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16 },
  action: {
    backgroundColor: 'rgba(255,255,255,0.32)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { fontFamily: fonts.bold, fontSize: 15, color: colors.textOnAccent },
  flyUp: { position: 'absolute', fontSize: 22, top: 4 },
  spacer: { flex: 1 },
});
