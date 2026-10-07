import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';

export type Tab = 'menu' | 'settings' | 'orders';

const tabs: { key: Tab; label: string }[] = [
  { key: 'menu', label: 'Меню' },
  { key: 'settings', label: 'Настройки' },
  { key: 'orders', label: 'Мои заказы' },
];

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

export default function TabBar({ active, onChange }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onPress={() => onChange(tab.key)}
            style={[styles.tab, isActive ? styles.tabActive : styles.tabInactive]}
          >
            <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.card,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: colors.accent },
  tabInactive: { backgroundColor: colors.text },
  label: { fontFamily: fonts.medium, fontSize: 12 },
  labelActive: { color: colors.text },
  labelInactive: { color: colors.white },
});
