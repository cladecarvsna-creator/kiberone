import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '../store';
import { fonts } from '../theme';
import { Glass } from './Glass';

/** Glass pill that drops in from the top for a moment. Change `id` to show it again. */
export default function Toast({ message, id }: { message: string; id: number }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const v = useRef(new Animated.Value(0)).current;
  const [text, setText] = useState(message);

  useEffect(() => {
    if (!id) return;
    setText(message);
    v.stopAnimation();
    Animated.sequence([
      Animated.spring(v, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 200 }),
      Animated.delay(1400),
      Animated.timing(v, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.wrap,
        {
          top: insets.top + 8,
          opacity: v,
          transform: [
            { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [-30, 0] }) },
            { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
          ],
        },
      ]}
    >
      <Glass strong radius={20} style={styles.toast}>
        <Text style={[styles.text, { color: colors.text }]} numberOfLines={2}>
          {text}
        </Text>
      </Glass>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 24, right: 24, alignItems: 'center' },
  toast: { paddingHorizontal: 18, paddingVertical: 12 },
  text: { fontFamily: fonts.medium, fontSize: 13, textAlign: 'center' },
});
