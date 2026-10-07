import { Unbounded_400Regular } from '@expo-google-fonts/unbounded/400Regular';
import { Unbounded_500Medium } from '@expo-google-fonts/unbounded/500Medium';
import { Unbounded_700Bold } from '@expo-google-fonts/unbounded/700Bold';
import { BlurTargetView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Background from './src/components/Background';
import CartBar, { TAB_BAR_HEIGHT } from './src/components/CartBar';
import FadeIn from './src/components/FadeIn';
import { BlurTargetContext } from './src/components/Glass';
import TabBar, { Tab } from './src/components/TabBar';
import Toast from './src/components/Toast';
import { Order, SettingField } from './src/data';
import MenuScreen from './src/screens/MenuScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import CartSheet from './src/sheets/CartSheet';
import EditSettingSheet from './src/sheets/EditSettingSheet';
import TrackSheet from './src/sheets/TrackSheet';
import { StoreProvider, useColors, useStore } from './src/store';
import { accent } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Unbounded_400Regular,
    Unbounded_500Medium,
    Unbounded_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={accent} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StoreProvider>
        <Main />
      </StoreProvider>
    </SafeAreaProvider>
  );
}

function Main() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { addToCart, checkout } = useStore();
  const blurTarget = useRef<View | null>(null);

  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState<Tab>('menu');
  const [toast, setToast] = useState({ id: 0, message: '' });

  const [cartOpen, setCartOpen] = useState(false);
  const [editField, setEditField] = useState<SettingField | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [trackOrder, setTrackOrder] = useState<Order | null>(null);
  const [trackOpen, setTrackOpen] = useState(false);

  const showToast = useCallback((message: string) => setToast((t) => ({ id: t.id + 1, message })), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const closeEdit = useCallback(() => setEditOpen(false), []);
  const closeTrack = useCallback(() => setTrackOpen(false), []);

  const bottomInset = Math.max(insets.bottom, 12) + TAB_BAR_HEIGHT + 90;

  return (
    <BlurTargetContext.Provider value={blurTarget}>
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <StatusBar style={colors.statusBar} />
        <BlurTargetView ref={blurTarget} style={styles.root}>
          <Background />
          {!started ? (
            <WelcomeScreen onStart={() => setStarted(true)} />
          ) : (
            <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
              <FadeIn key={tab} from={12} style={styles.root}>
                {tab === 'menu' && (
                  <MenuScreen
                    bottomInset={bottomInset}
                    onOpenCart={() => setCartOpen(true)}
                    onAdded={(p) => showToast(`${p.emoji} ${p.name} в корзине`)}
                  />
                )}
                {tab === 'settings' && (
                  <SettingsScreen
                    bottomInset={bottomInset}
                    onEdit={(field) => {
                      setEditField(field);
                      setEditOpen(true);
                    }}
                  />
                )}
                {tab === 'orders' && (
                  <OrdersScreen
                    bottomInset={bottomInset}
                    onTrack={(order) => {
                      setTrackOrder(order);
                      setTrackOpen(true);
                    }}
                    onRepeat={(order) => {
                      order.lines.forEach((l) => addToCart(l.productId, l.qty));
                      setCartOpen(true);
                    }}
                  />
                )}
              </FadeIn>
            </SafeAreaView>
          )}
        </BlurTargetView>

        {started && (
          <>
            <CartBar visible={tab === 'menu'} onPress={() => setCartOpen(true)} />
            <TabBar active={tab} onChange={setTab} />
          </>
        )}

        <CartSheet
          visible={cartOpen}
          onClose={closeCart}
          onGoToMenu={() => {
            setCartOpen(false);
            setTab('menu');
          }}
          onCheckout={() => {
            const order = checkout();
            setCartOpen(false);
            if (order) {
              setTab('orders');
              showToast(`🎉 Заказ ${order.number} оформлен`);
            }
          }}
        />
        <EditSettingSheet
          field={editField}
          visible={editOpen}
          onClose={closeEdit}
          onSaved={(label) => showToast(`✓ ${label}: сохранено`)}
        />
        <TrackSheet order={trackOrder} visible={trackOpen} onClose={closeTrack} />
        <Toast id={toast.id} message={toast.message} />
      </View>
    </BlurTargetContext.Provider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  root: { flex: 1 },
});
