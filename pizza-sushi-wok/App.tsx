import { Unbounded_400Regular } from '@expo-google-fonts/unbounded/400Regular';
import { Unbounded_500Medium } from '@expo-google-fonts/unbounded/500Medium';
import { Unbounded_700Bold } from '@expo-google-fonts/unbounded/700Bold';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TabBar, { Tab } from './src/components/TabBar';
import { Product } from './src/data';
import MenuScreen from './src/screens/MenuScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { colors } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Unbounded_400Regular,
    Unbounded_500Medium,
    Unbounded_700Bold,
  });
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState<Tab>('menu');
  const [cart, setCart] = useState<Product[]>([]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {!started ? (
        <WelcomeScreen onStart={() => setStarted(true)} />
      ) : (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <View style={styles.screen}>
            {tab === 'menu' && (
              <MenuScreen
                cartCount={cart.length}
                onAdd={(product) => setCart((items) => [...items, product])}
              />
            )}
            {tab === 'settings' && <SettingsScreen />}
            {tab === 'orders' && <OrdersScreen />}
          </View>
          <TabBar active={tab} onChange={setTab} />
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  container: { flex: 1, backgroundColor: colors.background },
  screen: { flex: 1 },
});
