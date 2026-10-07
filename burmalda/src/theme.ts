export const accent = '#FFD23F';

export const colors = {
  accent,
  accentDeep: '#FF9F1C',
  pink: '#FF4FD8',
  violet: '#7B2FF7',
  text: '#FFFFFF',
  textOnAccent: '#140A24',
  muted: '#B8AECF',
  background: '#0E0619',
  backgroundGradient: ['#0E0619', '#21093D', '#120722'] as const,
  blobA: 'rgba(255, 79, 216, 0.30)',
  blobB: 'rgba(255, 210, 63, 0.20)',
  glass: 'rgba(48, 26, 78, 0.55)',
  glassStrong: 'rgba(32, 16, 54, 0.82)',
  glassBorder: 'rgba(255, 255, 255, 0.14)',
  glassShadow: 'rgba(0, 0, 0, 0.45)',
  glassHighlight: 'rgba(255, 255, 255, 0.08)',
  divider: 'rgba(255, 255, 255, 0.08)',
  inactiveTab: 'rgba(255, 255, 255, 0.10)',
  inactiveTabText: '#FFFFFF',
  heart: '#FF3B6B',
  blurTint: 'dark' as const,
};

export type Colors = typeof colors;

export const fonts = {
  regular: 'Unbounded_400Regular',
  medium: 'Unbounded_500Medium',
  bold: 'Unbounded_700Bold',
};
