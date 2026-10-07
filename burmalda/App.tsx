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
import FadeIn from './src/components/FadeIn';
import { BlurTargetContext } from './src/components/Glass';
import TabBar, { Tab } from './src/components/TabBar';
import Toast from './src/components/Toast';
import FavoritesScreen from './src/screens/FavoritesScreen';
import FeedScreen from './src/screens/FeedScreen';
import RandomScreen from './src/screens/RandomScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { StoreProvider } from './src/store';
import { colors } from './src/theme';

const TAB_BAR_HEIGHT = 60;

export default function App() {
  const [fontsLoaded] = useFonts({
    Unbounded_400Regular,
    Unbounded_500Medium,
    Unbounded_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.accent} size="large" />
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
  const insets = useSafeAreaInsets();
  const blurTarget = useRef<View | null>(null);

  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState<Tab>('feed');
  const [toast, setToast] = useState({ id: 0, message: '' });

  const showToast = useCallback((message: string) => setToast((t) => ({ id: t.id + 1, message })), []);

  const bottomInset = Math.max(insets.bottom, 12) + TAB_BAR_HEIGHT + 24;

  return (
    <BlurTargetContext.Provider value={blurTarget}>
      <View style={styles.root}>
        <StatusBar style="light" />
        <BlurTargetView ref={blurTarget} style={styles.fill}>
          <Background />
          {!started ? (
            <WelcomeScreen onStart={() => setStarted(true)} />
          ) : (
            <SafeAreaView style={styles.fill} edges={['top', 'left', 'right']}>
              <FadeIn key={tab} from={12} style={styles.fill}>
                {tab === 'feed' && <FeedScreen bottomInset={bottomInset} onToast={showToast} />}
                {tab === 'random' && <RandomScreen bottomInset={bottomInset} onToast={showToast} />}
                {tab === 'favorites' && (
                  <FavoritesScreen bottomInset={bottomInset} onToast={showToast} onGoToFeed={() => setTab('feed')} />
                )}
              </FadeIn>
            </SafeAreaView>
          )}
        </BlurTargetView>

        {started && <TabBar active={tab} onChange={setTab} />}
        <Toast id={toast.id} message={toast.message} />
      </View>
    </BlurTargetContext.Provider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  root: { flex: 1, backgroundColor: colors.background },
  fill: { flex: 1 },
});
