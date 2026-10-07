import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { createContext, ReactNode, RefObject, useContext } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useColors } from '../store';

export const BlurTargetContext = createContext<RefObject<View | null> | null>(null);

type Props = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  radius?: number;
  strong?: boolean;
  intensity?: number;
};

/**
 * Liquid-glass surface: a real blur of the app content behind it, a tinted
 * translucent fill, a bright rim and a soft top highlight. Only use it outside
 * the BlurTargetView (tab bar, sheets, toasts), since it blurs that view.
 */
export function Glass({ children, style, radius = 24, strong, intensity = 60 }: Props) {
  const colors = useColors();
  const target = useContext(BlurTargetContext);

  return (
    <View style={[styles.base, { borderRadius: radius, borderColor: colors.glassBorder }, style]}>
      <BlurView
        style={StyleSheet.absoluteFill}
        tint={colors.blurTint}
        intensity={intensity}
        blurMethod="dimezisBlurViewSdk31Plus"
        blurTarget={target ?? undefined}
      />
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: strong ? colors.glassStrong : colors.glass }]}
      />
      <LinearGradient
        colors={[colors.glassHighlight, 'rgba(255,255,255,0)']}
        style={styles.highlight}
        pointerEvents="none"
      />
      {children}
    </View>
  );
}

/**
 * Frosted card for content that scrolls inside the blur target: translucent
 * fill, rim and highlight, without a nested blur.
 */
export function FrostCard({ children, style, radius = 22 }: Omit<Props, 'strong' | 'intensity'>) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.base,
        styles.shadow,
        {
          borderRadius: radius,
          borderColor: colors.glassBorder,
          backgroundColor: colors.glass,
          shadowColor: colors.glassShadow,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={[colors.glassHighlight, 'rgba(255,255,255,0)']}
        style={[styles.highlight, { borderTopLeftRadius: radius, borderTopRightRadius: radius }]}
        pointerEvents="none"
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { overflow: 'hidden', borderWidth: 1 },
  shadow: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 0,
  },
  highlight: { position: 'absolute', left: 0, right: 0, top: 0, height: '50%' },
});
