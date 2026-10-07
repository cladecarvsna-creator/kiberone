import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '../store';
import { fonts } from '../theme';

export default function ScreenHeader({ title, right }: { title: string; right?: ReactNode }) {
  const colors = useColors();
  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: { fontFamily: fonts.bold, fontSize: 26 },
});
