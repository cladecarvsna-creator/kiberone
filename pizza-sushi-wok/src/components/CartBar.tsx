import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors, useStore } from '../store';
import { fonts } from '../theme';
import { Glass } from './Glass';
import PressableScale from './PressableScale';

export const TAB_BAR_HEIGHT = 62;

/** Floating glass bar above the tab bar with the cart total; slides in when the cart has items. */
export default function CartBar({ visible, onPress }: { visible: boolean; onPress: () => void }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { cartCount, cartTotal } = useStore();
  const show = visible && cartCount > 0;
  const v = useRef(new Animated.Value(show ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(v, { toValue: show ? 1 : 0, useNativeDriver: true, damping: 16, stiffness: 180 }).start();
  }, [show, v]);

  return (
    <Animated.View
      pointerEvents={show ? 'box-none' : 'none'}
      style={[
        styles.wrap,
        {
          bottom: Math.max(insets.bottom, 12) + TAB_BAR_HEIGHT + 10,
          opacity: v,
          transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
        },
      ]}
    >
      <PressableScale onPress={onPress} accessibilityRole="button" accessibilityLabel="Открыть корзину" scaleTo={0.97}>
        <Glass radius={22} style={styles.bar}>
          <View style={[styles.count, { backgroundColor: colors.accent }]}>
            <Text style={styles.countText}>{cartCount}</Text>
          </View>
          <Text style={[styles.label, { color: colors.text }]}>Корзина</Text>
          <Text style={[styles.total, { color: colors.text }]}>{cartTotal}₽</Text>
          <Text style={[styles.arrow, { color: colors.text }]}>›</Text>
        </Glass>
      </PressableScale>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 14, right: 14 },
  bar: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 12 },
  count: { minWidth: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 },
  countText: { fontFamily: fonts.bold, fontSize: 13, color: '#000000' },
  label: { fontFamily: fonts.medium, fontSize: 14, flex: 1 },
  total: { fontFamily: fonts.bold, fontSize: 16 },
  arrow: { fontFamily: fonts.medium, fontSize: 22, lineHeight: 24 },
});
