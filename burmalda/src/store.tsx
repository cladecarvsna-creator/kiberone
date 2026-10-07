import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { colors, Colors } from './theme';

const STORAGE_KEY = 'burmalda/state/v1';

type Store = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => boolean;
  likes: Record<string, number>;
  like: (id: string) => void;
  spins: number;
  addSpin: () => void;
  colors: Colors;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [spins, setSpins] = useState(0);
  const loaded = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw) as Partial<{ favorites: string[]; likes: Record<string, number>; spins: number }>;
        if (saved.favorites) setFavorites(saved.favorites);
        if (saved.likes) setLikes(saved.likes);
        if (saved.spins) setSpins(saved.spins);
      })
      .catch(() => {})
      .finally(() => {
        loaded.current = true;
      });
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ favorites, likes, spins })).catch(() => {});
  }, [favorites, likes, spins]);

  const store = useMemo<Store>(
    () => ({
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite: (id) => {
        const adding = !favorites.includes(id);
        setFavorites((list) => (list.includes(id) ? list.filter((f) => f !== id) : [id, ...list]));
        return adding;
      },
      likes,
      like: (id) => setLikes((l) => ({ ...l, [id]: (l[id] ?? 0) + 1 })),
      spins,
      addSpin: () => setSpins((n) => n + 1),
      colors,
    }),
    [favorites, likes, spins],
  );

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore must be used inside StoreProvider');
  return store;
}

export function useColors() {
  return useStore().colors;
}
