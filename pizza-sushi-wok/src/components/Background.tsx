import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useColors } from '../store';

/** Soft gradient with slowly drifting colour blobs, so the glass has something to refract. */
export default function Background() {
  const colors = useColors();
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, { toValue: 1, duration: 9000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(drift, { toValue: 0, duration: 9000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [drift]);

  const moveA = {
    transform: [
      { translateX: drift.interpolate({ inputRange: [0, 1], outputRange: [-40, 60] }) },
      { translateY: drift.interpolate({ inputRange: [0, 1], outputRange: [0, 80] }) },
    ],
  };
  const moveB = {
    transform: [
      { translateX: drift.interpolate({ inputRange: [0, 1], outputRange: [40, -50] }) },
      { translateY: drift.interpolate({ inputRange: [0, 1], outputRange: [0, -90] }) },
    ],
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient colors={colors.backgroundGradient} style={StyleSheet.absoluteFill} />
      <Animated.View style={[styles.blobA, moveA]}>
        <SoftBlob size={360} color={colors.blobA} />
      </Animated.View>
      <Animated.View style={[styles.blobB, moveB]}>
        <SoftBlob size={400} color={colors.blobB} />
      </Animated.View>
    </View>
  );
}

const LAYERS = 16;

/** Concentric translucent circles: denser in the middle, fading to a soft edge. */
function SoftBlob({ size, color }: { size: number; color: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: LAYERS }, (_, i) => {
        const d = size * (1 - i / LAYERS);
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: d,
              height: d,
              borderRadius: d / 2,
              backgroundColor: color,
              opacity: 0.13,
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  blobA: { position: 'absolute', top: -90, right: -150 },
  blobB: { position: 'absolute', bottom: 40, left: -190 },
});
