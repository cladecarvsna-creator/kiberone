import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '../store';
import { fonts } from '../theme';
import { Glass } from './Glass';
import PressableScale from './PressableScale';

type Props = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/** Bottom sheet made of glass that springs up over a dimmed backdrop. */
export default function Sheet({ visible, title, onClose, children }: Props) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.spring(progress, { toValue: 1, useNativeDriver: true, damping: 18, stiffness: 180, mass: 0.9 }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => finished && setMounted(false));
    }
  }, [visible, progress]);

  useEffect(() => {
    if (!visible) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [visible, onClose]);

  if (!mounted) return null;

  const height = Dimensions.get('window').height;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={visible ? 'auto' : 'none'}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.backdrop, opacity: progress }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Закрыть" />
      </Animated.View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrap}
        pointerEvents="box-none"
      >
        <Animated.View
          style={{
            transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }) }],
          }}
        >
          <Glass strong radius={30} style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
            <View style={[styles.grabber, { backgroundColor: colors.muted }]} />
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
              <PressableScale
                onPress={onClose}
                style={[styles.close, { backgroundColor: colors.inactiveTab }]}
                accessibilityLabel="Закрыть"
              >
                <Text style={styles.closeText}>✕</Text>
              </PressableScale>
            </View>
            {children}
          </Glass>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    maxHeight: Dimensions.get('window').height * 0.85,
  },
  grabber: { alignSelf: 'center', width: 40, height: 5, borderRadius: 3, opacity: 0.5, marginBottom: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  title: { fontFamily: fonts.bold, fontSize: 20 },
  close: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  closeText: { color: '#FFFFFF', fontSize: 14, fontFamily: fonts.bold },
});
