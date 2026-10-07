export const accent = '#FFC700';

export type Colors = {
  [K in Exclude<keyof typeof light, 'backgroundGradient' | 'blurTint' | 'statusBar'>]: string;
} & {
  backgroundGradient: readonly [string, string, ...string[]];
  blurTint: 'light' | 'dark';
  statusBar: 'light' | 'dark';
};

const light = {
  accent,
  text: '#000000',
  textOnAccent: '#000000',
  card: '#F5F5F5',
  background: '#FFFFFF',
  backgroundGradient: ['#FFFFFF', '#FFF7D6', '#F5F5F5'] as const,
  blobA: 'rgba(255, 199, 0, 0.35)',
  blobB: 'rgba(255, 138, 0, 0.18)',
  glass: 'rgba(255, 255, 255, 0.55)',
  glassStrong: 'rgba(255, 255, 255, 0.72)',
  glassBorder: 'rgba(255, 255, 255, 0.9)',
  glassShadow: 'rgba(0, 0, 0, 0.08)',
  glassHighlight: 'rgba(255, 255, 255, 0.4)',
  divider: 'rgba(0, 0, 0, 0.06)',
  price: '#FF8A00',
  muted: '#7A7A7A',
  green: '#2EAD4B',
  gray: '#9E9E9E',
  white: '#FFFFFF',
  inactiveTab: '#000000',
  inactiveTabText: '#FFFFFF',
  input: 'rgba(255, 255, 255, 0.85)',
  backdrop: 'rgba(0, 0, 0, 0.25)',
  blurTint: 'light' as 'light' | 'dark',
  statusBar: 'dark' as const,
};

export const lightColors: Colors = light;

export const darkColors: Colors = {
  ...light,
  text: '#FFFFFF',
  card: '#1C1C1E',
  background: '#0B0B0C',
  backgroundGradient: ['#0B0B0C', '#1A1606', '#111113'] as const,
  blobA: 'rgba(255, 199, 0, 0.22)',
  blobB: 'rgba(255, 138, 0, 0.14)',
  glass: 'rgba(40, 40, 44, 0.55)',
  glassStrong: 'rgba(30, 30, 34, 0.78)',
  glassBorder: 'rgba(255, 255, 255, 0.14)',
  glassShadow: 'rgba(0, 0, 0, 0.4)',
  glassHighlight: 'rgba(255, 255, 255, 0.07)',
  divider: 'rgba(255, 255, 255, 0.08)',
  muted: '#A0A0A6',
  inactiveTab: 'rgba(255, 255, 255, 0.12)',
  inactiveTabText: '#FFFFFF',
  input: 'rgba(255, 255, 255, 0.08)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  blurTint: 'dark' as 'light' | 'dark',
  statusBar: 'light' as const,
};

export const fonts = {
  regular: 'Unbounded_400Regular',
  medium: 'Unbounded_500Medium',
  bold: 'Unbounded_700Bold',
};
