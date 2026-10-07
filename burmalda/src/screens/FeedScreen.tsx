import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FadeIn from '../components/FadeIn';
import MemeCard from '../components/MemeCard';
import PressableScale from '../components/PressableScale';
import ScreenHeader from '../components/ScreenHeader';
import { categories, Category, memes } from '../data';
import { colors, fonts } from '../theme';

type Props = { bottomInset: number; onToast: (message: string) => void };

export default function FeedScreen({ bottomInset, onToast }: Props) {
  const [category, setCategory] = useState<Category>('all');
  const list = category === 'all' ? memes : memes.filter((m) => m.category === category);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Лента" />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {categories.map((c) => {
            const active = c.key === category;
            return (
              <PressableScale
                key={c.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: active }}
                onPress={() => setCategory(c.key)}
                style={[styles.chip, { backgroundColor: active ? colors.accent : colors.inactiveTab }]}
              >
                <Text style={[styles.chipText, { color: active ? colors.textOnAccent : colors.text }]}>{c.label}</Text>
              </PressableScale>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView key={category} contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}>
        {list.map((m, i) => (
          <FadeIn key={m.id} delay={Math.min(i, 6) * 70}>
            <MemeCard meme={m} onToast={onToast} />
          </FadeIn>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chips: { paddingHorizontal: 20, gap: 8, paddingBottom: 14 },
  chip: { borderRadius: 16, paddingHorizontal: 14, paddingVertical: 9 },
  chipText: { fontFamily: fonts.medium, fontSize: 12 },
  content: { paddingHorizontal: 20 },
});
