import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import FadeIn from '../components/FadeIn';
import { FrostCard } from '../components/Glass';
import PressableScale from '../components/PressableScale';
import ScreenHeader from '../components/ScreenHeader';
import { displayValue, SettingField, settingSections } from '../data';
import { useColors, useStore } from '../store';
import { fonts } from '../theme';

type Props = {
  onEdit: (field: SettingField) => void;
  bottomInset: number;
};

export default function SettingsScreen({ onEdit, bottomInset }: Props) {
  const colors = useColors();
  const { settings, updateSetting } = useStore();
  let row = 0;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Настройки" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}>
        {settingSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <FadeIn delay={row * 40}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            </FadeIn>
            {section.fields.map((field) => {
              const delay = ++row * 40;
              const isToggle = field.kind === 'toggle';
              const toggleValue = isToggle && Boolean(settings[field.key]);
              return (
                <FadeIn key={field.key} delay={delay}>
                  <PressableScale
                    accessibilityRole={isToggle ? 'switch' : 'button'}
                    scaleTo={0.97}
                    onPress={() => (isToggle ? updateSetting(field.key, !toggleValue) : onEdit(field))}
                  >
                    <FrostCard radius={16} style={styles.row}>
                      <Text style={[styles.label, { color: colors.text }]}>{field.label}</Text>
                      <View style={styles.right}>
                        {isToggle ? (
                          <Switch
                            value={toggleValue}
                            onValueChange={(v) => updateSetting(field.key, v)}
                            trackColor={{ false: colors.gray, true: colors.accent }}
                            thumbColor="#FFFFFF"
                          />
                        ) : (
                          <>
                            <Text style={[styles.value, { color: colors.muted }]} numberOfLines={1}>
                              {displayValue(field.key, settings)}
                            </Text>
                            <Text style={[styles.arrow, { color: colors.text }]}>›</Text>
                          </>
                        )}
                      </View>
                    </FrostCard>
                  </PressableScale>
                </FadeIn>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 16, marginBottom: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    minHeight: 56,
    paddingVertical: 10,
    marginBottom: 8,
  },
  label: { fontFamily: fonts.medium, fontSize: 14 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1, marginLeft: 12 },
  value: { fontFamily: fonts.regular, fontSize: 13, flexShrink: 1 },
  arrow: { fontFamily: fonts.medium, fontSize: 22, lineHeight: 24 },
});
