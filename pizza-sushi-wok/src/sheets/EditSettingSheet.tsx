import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import PressableScale from '../components/PressableScale';
import Sheet from '../components/Sheet';
import { SettingField } from '../data';
import { useColors, useStore } from '../store';
import { fonts } from '../theme';

type Props = {
  field: SettingField | null;
  visible: boolean;
  onClose: () => void;
  onSaved: (label: string) => void;
};

function validate(field: SettingField, raw: string): string | null {
  const value = raw.trim();
  if (!value) return 'Поле не может быть пустым';
  if (field.key === 'email' && !/^\S+@\S+\.\S+$/.test(value)) return 'Похоже, в email ошибка';
  if (field.key === 'phone' && value.replace(/\D/g, '').length < 10) return 'Нужно минимум 10 цифр';
  if (field.key === 'card' && value.replace(/\D/g, '').length < 4) return 'Введите номер карты';
  return null;
}

export default function EditSettingSheet({ field, visible, onClose, onSaved }: Props) {
  const colors = useColors();
  const { settings, updateSetting } = useStore();
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!field || !visible) return;
    setDraft(field.key === 'card' ? '' : String(settings[field.key]));
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, visible]);

  if (!field) return null;

  const save = (value: string) => {
    if (field.kind === 'text') {
      const problem = validate(field, value);
      if (problem) {
        setError(problem);
        return;
      }
      const stored = field.key === 'card' ? value.replace(/\D/g, '').slice(-4) : value.trim();
      updateSetting(field.key, stored);
    } else {
      updateSetting(field.key, value);
    }
    onSaved(field.label);
    onClose();
  };

  return (
    <Sheet visible={visible} onClose={onClose} title={field.label}>
      {field.kind === 'text' && (
        <View>
          <TextInput
            value={draft}
            onChangeText={(t) => {
              setDraft(t);
              setError(null);
            }}
            placeholder={field.key === 'card' ? 'Номер новой карты' : field.placeholder}
            placeholderTextColor={colors.muted}
            keyboardType={field.keyboard ?? 'default'}
            autoCapitalize={field.key === 'email' ? 'none' : 'sentences'}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={() => save(draft)}
            style={[
              styles.input,
              { color: colors.text, backgroundColor: colors.input, borderColor: error ? '#FF3B30' : colors.glassBorder },
            ]}
          />
          {field.key === 'card' && !error && (
            <Text style={[styles.hint, { color: colors.muted }]}>Сохраним только последние 4 цифры</Text>
          )}
          {error && <Text style={styles.error}>{error}</Text>}
          <PressableScale onPress={() => save(draft)} style={[styles.primary, { backgroundColor: colors.accent }]}>
            <Text style={styles.primaryText}>Сохранить</Text>
          </PressableScale>
        </View>
      )}

      {field.kind === 'choice' && (
        <View style={styles.options}>
          {field.options.map((option) => {
            const selected = settings[field.key] === option;
            return (
              <PressableScale
                key={option}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                onPress={() => save(option)}
                scaleTo={0.97}
                style={[
                  styles.option,
                  {
                    backgroundColor: selected ? colors.accent : colors.input,
                    borderColor: selected ? colors.accent : colors.glassBorder,
                  },
                ]}
              >
                <Text style={[styles.optionText, { color: selected ? '#000000' : colors.text }]}>{option}</Text>
                <View style={[styles.radio, { borderColor: selected ? '#000000' : colors.muted }]}>
                  {selected && <View style={styles.radioDot} />}
                </View>
              </PressableScale>
            );
          })}
        </View>
      )}
    </Sheet>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: fonts.regular,
    fontSize: 16,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  hint: { fontFamily: fonts.regular, fontSize: 12, marginTop: 8 },
  error: { fontFamily: fonts.medium, fontSize: 12, marginTop: 8, color: '#FF3B30' },
  primary: { borderRadius: 18, paddingVertical: 17, alignItems: 'center', marginTop: 18 },
  primaryText: { fontFamily: fonts.bold, fontSize: 16, color: '#000000' },
  options: { gap: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  optionText: { fontFamily: fonts.medium, fontSize: 14 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#000000' },
});
