// Auto-generated from Figma - Do not edit manually
// Generated: 2025-06-02T08:12:10.736Z

export const designTokens = {
  colors: {},
  typography: {},
  effects: {}
} as const;

export type ColorToken = keyof typeof designTokens.colors;
export type TypographyToken = keyof typeof designTokens.typography;

// Utility function to get CSS variable
export function getToken(type: 'color' | 'font', name: string): string {
  const varName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `var(--${type}-${varName})`;
}
