import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { colors, fonts } from '../theme';

type Row = { label: string; value: string };

const sections: { title: string; rows: Row[] }[] = [
  {
    title: 'Профиль',
    rows: [
      { label: 'Имя', value: 'Иван' },
      { label: 'Телефон', value: '+7 900 123-45-67' },
      { label: 'Email', value: 'ivan@mail.ru' },
    ],
  },
  {
    title: 'Доставка',
    rows: [
      { label: 'Адрес', value: 'ул. Ленина, 10' },
      { label: 'Способ', value: 'Курьер' },
      { label: 'Время', value: 'Как можно скорее' },
    ],
  },
  {
    title: 'Оплата',
    rows: [
      { label: 'Способ', value: 'Картой' },
      { label: 'Карта', value: '•••• 4242' },
    ],
  },
  {
    title: 'Приложение',
    rows: [
      { label: 'Уведомления', value: 'Вкл' },
      { label: 'Тёмная тема', value: 'Выкл' },
      { label: 'Язык', value: 'Русский' },
    ],
  },
];

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Header title="Настройки" />
      <ScrollView contentContainerStyle={styles.content}>
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.rows.map((row) => (
              <Pressable
                key={row.label}
                accessibilityRole="button"
                style={({ pressed }) => [styles.row, pressed && styles.pressed]}
              >
                <Text style={styles.label}>{row.label}</Text>
                <View style={styles.right}>
                  <Text style={styles.value} numberOfLines={1}>
                    {row.value}
                  </Text>
                  <Text style={styles.arrow}>›</Text>
                </View>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
  },
  pressed: { opacity: 0.7 },
  label: { fontFamily: fonts.medium, fontSize: 14, color: colors.text },
  right: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1, marginLeft: 12 },
  value: { fontFamily: fonts.regular, fontSize: 13, color: colors.muted, flexShrink: 1 },
  arrow: { fontFamily: fonts.medium, fontSize: 22, color: colors.text, lineHeight: 24 },
});
