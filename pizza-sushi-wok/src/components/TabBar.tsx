import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '../store';
import { fonts } from '../theme';
import { Glass } from './Glass';

export type Tab = 'menu' | 'settings' | 'orders';

const tabs: { key: Tab; label: string }[] = [
  { key: 'menu', label: 'Меню' },
  { key: 'settings', label: 'Настройки' },
  { key: 'orders', label: 'Мои заказы' },
];

const PAD = 6;
const GAP = 6;

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

/** Floating glass tab bar; the yellow active pill slides between tabs. */
export default function TabBar({ active, onChange }: Props) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [width, setWidth] = useState(0);
  const index = tabs.findIndex((t) => t.key === active);
  const x = useRef(new Animated.Value(index)).current;

  useEffect(() => {
    Animated.spring(x, { toValue: index, useNativeDriver: true, damping: 16, stiffness: 180 }).start();
  }, [index, x]);

  const tabWidth = width > 0 ? (width - GAP * (tabs.length - 1)) / tabs.length : 0;

  return (
    <View style={[styles.wrap, { bottom: Math.max(insets.bottom, 12) }]} pointerEvents="box-none">
      <Glass radius={26} style={styles.bar}>
        <View style={styles.inner} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
          {tabs.map((tab) => (
            <View key={tab.key} style={[styles.slot, { backgroundColor: colors.inactiveTab }]} />
          ))}
          {tabWidth > 0 && (
            <Animated.View
              style={[
                styles.indicator,
                {
                  width: tabWidth,
                  backgroundColor: colors.accent,
                  transform: [
                    {
                      translateX: x.interpolate({
                        inputRange: [0, tabs.length - 1],
                        outputRange: [0, (tabWidth + GAP) * (tabs.length - 1)],
                      }),
                    },
                  ],
                },
              ]}
            />
          )}
          <View style={styles.labels}>
            {tabs.map((tab) => {
              const isActive = tab.key === active;
              return (
                <Pressable
                  key={tab.key}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  onPress={() => {
                    if (!isActive && Platform.OS !== 'web') Haptics.selectionAsync().catch(() => {});
                    onChange(tab.key);
                  }}
                  style={styles.tab}
                >
                  <Text
                    style={[styles.label, { color: isActive ? colors.textOnAccent : colors.inactiveTabText }]}
                    numberOfLines={1}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </Glass>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 14, right: 14 },
  bar: { padding: PAD },
  inner: { flexDirection: 'row', gap: GAP, height: 48 },
  slot: { flex: 1, borderRadius: 20 },
  indicator: { position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: 20 },
  labels: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row', gap: GAP },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: fonts.medium, fontSize: 12 },
});
