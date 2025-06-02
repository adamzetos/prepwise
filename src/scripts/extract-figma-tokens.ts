/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Script: Extract Design Tokens from Figma
 * Purpose: Extract colors, typography, and styles from Figma
 * Why Needed: Single source of truth for design system
 */

import * as Figma from 'figma-js';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const TOKEN = process.env.VITE_FIGMA_ACCESS_TOKEN;
const FILE_ID = process.env.VITE_FIGMA_FILE_ID;

if (!TOKEN || !FILE_ID) {
  console.error('❌ Missing Figma credentials in .env.local');
  process.exit(1);
}

const client = Figma.Client({ personalAccessToken: TOKEN });

interface DesignTokens {
  colors: Record<string, any>;
  typography: Record<string, any>;
  effects: Record<string, any>;
}

interface ColorStyle {
  name: string;
  value: string;
  rgb: { r: number; g: number; b: number; a: number };
  category?: string;
}

interface TypographyStyle {
  name: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number | { unit: string; value: number };
  letterSpacing: number;
  textCase?: string;
}

async function extractTokens() {
  console.log('🎓 Extracting design tokens from Figma...');
  console.log('📁 File ID:', FILE_ID);
  
  try {
    // Fetch the Figma file
    const file = await client.file(FILE_ID);
    console.log('✅ Figma file loaded successfully');
    
    // Fetch styles
    const styles = await client.fileStyles(FILE_ID);
    console.log(`📊 Found ${Object.keys(styles.data.meta.styles).length} styles`);
    
    const tokens: DesignTokens = {
      colors: {},
      typography: {},
      effects: {}
    };
    
    // Process each style
    for (const [styleId, styleMeta] of Object.entries(styles.data.meta.styles)) {
      const styleNode = findNodeById(file.data.document, styleMeta.node_id);
      
      if (!styleNode) continue;
      
      switch (styleMeta.style_type) {
        case 'FILL':
          const color = extractColorFromNode(styleNode, styleMeta.name);
          if (color) {
            tokens.colors[color.name] = color;
          }
          break;
          
        case 'TEXT':
          const text = extractTextFromNode(styleNode, styleMeta.name);
          if (text) {
            tokens.typography[text.name] = text;
          }
          break;
          
        case 'EFFECT':
          const effect = extractEffectFromNode(styleNode, styleMeta.name);
          if (effect) {
            tokens.effects[styleMeta.name] = effect;
          }
          break;
      }
    }
    
    // Generate output files
    generateCSSVariables(tokens);
    generateTypeScriptTokens(tokens);
    generateTailwindConfig(tokens);
    
    console.log('✅ Design tokens extracted successfully!');
    console.log(`📈 Stats:
    - Colors: ${Object.keys(tokens.colors).length}
    - Typography: ${Object.keys(tokens.typography).length}
    - Effects: ${Object.keys(tokens.effects).length}`);
    
  } catch (error) {
    console.error('❌ Error extracting tokens:', error);
    process.exit(1);
  }
}

function findNodeById(node: any, nodeId: string): any {
  if (node.id === nodeId) return node;
  
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, nodeId);
      if (found) return found;
    }
  }
  
  return null;
}

function extractColorFromNode(node: any, styleName: string): ColorStyle | null {
  if (!node.fills || !Array.isArray(node.fills) || node.fills.length === 0) {
    return null;
  }
  
  const fill = node.fills[0];
  if (fill.type !== 'SOLID') return null;
  
  const { r, g, b, a = 1 } = fill.color;
  const hex = rgbToHex(r * 255, g * 255, b * 255);
  
  // Parse category from name (e.g., "brand2-1" -> category: "brand2")
  const nameParts = styleName.split(/[-_]/);
  const category = nameParts.length > 1 ? nameParts[0] : 'default';
  
  return {
    name: styleName,
    value: hex,
    rgb: { r: r * 255, g: g * 255, b: b * 255, a },
    category
  };
}

function extractTextFromNode(node: any, styleName: string): TypographyStyle | null {
  if (!node.style) return null;
  
  const style = node.style;
  
  return {
    name: styleName,
    fontFamily: style.fontFamily || 'Inter',
    fontSize: style.fontSize || 16,
    fontWeight: style.fontWeight || 400,
    lineHeight: style.lineHeightPx || style.lineHeightPercentFontSize || 1.5,
    letterSpacing: style.letterSpacing || 0,
    textCase: style.textCase
  };
}

function extractEffectFromNode(node: any, styleName: string): any {
  if (!node.effects || !Array.isArray(node.effects)) return null;
  
  return node.effects.map((effect: any) => ({
    type: effect.type,
    radius: effect.radius,
    color: effect.color,
    offset: effect.offset,
    spread: effect.spread
  }));
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generateCSSVariables(tokens: DesignTokens) {
  const cssLines: string[] = [
    '/* Auto-generated from Figma - Do not edit manually */',
    `/* Generated: ${new Date().toISOString()} */`,
    '',
    ':root {'
  ];
  
  // Colors
  cssLines.push('  /* Colors */');
  Object.values(tokens.colors).forEach((color: ColorStyle) => {
    const varName = color.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    cssLines.push(`  --color-${varName}: ${color.value};`);
  });
  
  // Typography
  cssLines.push('');
  cssLines.push('  /* Typography */');
  Object.values(tokens.typography).forEach((text: TypographyStyle) => {
    const varName = text.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    cssLines.push(`  --font-${varName}-family: "${text.fontFamily}";`);
    cssLines.push(`  --font-${varName}-size: ${text.fontSize}px;`);
    cssLines.push(`  --font-${varName}-weight: ${text.fontWeight};`);
    cssLines.push(`  --font-${varName}-line-height: ${
      typeof text.lineHeight === 'number' ? text.lineHeight : `${text.lineHeight.value}${text.lineHeight.unit}`
    };`);
    cssLines.push(`  --font-${varName}-letter-spacing: ${text.letterSpacing}px;`);
  });
  
  cssLines.push('}');
  
  const outputPath = path.join(process.cwd(), 'src/design-system/tokens/variables.css');
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, cssLines.join('\n'));
  console.log('📝 Generated:', outputPath);
}

function generateTypeScriptTokens(tokens: DesignTokens) {
  const ts = `// Auto-generated from Figma - Do not edit manually
// Generated: ${new Date().toISOString()}

export const designTokens = {
  colors: ${JSON.stringify(tokens.colors, null, 2)},
  typography: ${JSON.stringify(tokens.typography, null, 2)},
  effects: ${JSON.stringify(tokens.effects, null, 2)}
} as const;

export type ColorToken = keyof typeof designTokens.colors;
export type TypographyToken = keyof typeof designTokens.typography;

// Utility function to get CSS variable
export function getToken(type: 'color' | 'font', name: string): string {
  const varName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return \`var(--\${type}-\${varName})\`;
}
`;
  
  const outputPath = path.join(process.cwd(), 'src/design-system/tokens/index.ts');
  writeFileSync(outputPath, ts);
  console.log('📝 Generated:', outputPath);
}

function generateTailwindConfig(tokens: DesignTokens) {
  // Group colors by category
  const colorGroups: Record<string, Record<string, string>> = {};
  
  Object.values(tokens.colors).forEach((color: ColorStyle) => {
    const category = color.category || 'default';
    if (!colorGroups[category]) {
      colorGroups[category] = {};
    }
    
    // Extract variant number if exists (e.g., "brand2-1" -> "1")
    const match = color.name.match(/(\d+)$/);
    const variant = match ? match[1] : 'DEFAULT';
    
    colorGroups[category][variant] = color.value;
  });
  
  const config = `// Auto-generated Tailwind color config
export const figmaColors = ${JSON.stringify(colorGroups, null, 2)};
`;
  
  const outputPath = path.join(process.cwd(), 'src/design-system/tokens/tailwind-colors.js');
  writeFileSync(outputPath, config);
  console.log('📝 Generated:', outputPath);
}

// Run the extraction
extractTokens().catch(console.error);