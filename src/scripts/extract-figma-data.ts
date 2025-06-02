/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Script: Extract Design Data from Figma Frames
 * Purpose: Extract colors, fonts, and frame information
 * Why Needed: Alternative extraction when styles aren't published
 */

import * as Figma from 'figma-js';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const TOKEN = process.env.VITE_FIGMA_ACCESS_TOKEN;
const FILE_ID = process.env.VITE_FIGMA_FILE_ID;

if (!TOKEN || !FILE_ID) {
  console.error('❌ Missing Figma credentials');
  process.exit(1);
}

const client = Figma.Client({ personalAccessToken: TOKEN });

// Target frames to analyze
const TARGET_FRAMES = [
  'Page_0_logo',
  'Page_1_Landing_Page_not_log_in',
  'Page_2.1_Login-Not_entered',
  'Page_2.2_Login-Input_completed',
  'Page_2.3_Landing_Page_Logged_in',
  'Page_2.4_Register',
  'Page_2.5_Register_Input_completed',
  'Page_3.1_Job_role_selection_Default',
  'Page_3.2_Job_role_selection_Floating_prompt',
  'Page_3.3_Job_role_selection_Selected',
  'Page_4.1_Document_Upload_Default',
  'Page_4.2_Document_Upload_Pass_on',
  'Page_4.3_Document_Upload_Upload_list',
  'Page_4.4_Document_Quality_Review_Cover_letter_review',
  'Page_4.5_Document_Quality_Review_CV_review',
  'Page_5.1_Interview_Interface_Default',
  'Page_5.2_Interview_Interface_Completed',
  'Page_6.1_Interview_Complete_Screen',
  'Page_6.2_Score_Breakdown',
  'Page_6.3_Detailed_Suggestions',
  'Page_6.4_Detailed_Suggestions_Expand',
  'Page_7.1_Admin_dashboard',
  'Page_7.2_Student_Management'
];

interface ExtractedData {
  frames: Record<string, any>;
  colors: Record<string, any>;
  typography: Record<string, any>;
  components: Record<string, any>;
}

async function extractData() {
  console.log('🎓 Extracting design data from Figma...');
  
  try {
    const file = await client.file(FILE_ID);
    console.log('✅ Figma file loaded');
    
    // Find Website page
    const websitePage = file.data.document.children.find(
      (page: any) => page.name === 'Website'
    );
    
    if (!websitePage) {
      console.error('❌ "Website" page not found');
      process.exit(1);
    }
    
    console.log(`📄 Found "Website" page with ${websitePage.children.length} frames`);
    
    const data: ExtractedData = {
      frames: {},
      colors: {},
      typography: {},
      components: {}
    };
    
    // Extract data from target frames
    for (const frameName of TARGET_FRAMES) {
      const frame = websitePage.children.find((child: any) => child.name === frameName);
      
      if (frame) {
        console.log(`📐 Processing: ${frameName}`);
        data.frames[frameName] = {
          id: frame.id,
          width: frame.absoluteBoundingBox?.width || 1440,
          height: frame.absoluteBoundingBox?.height || 900,
          backgroundColor: extractBackgroundColor(frame)
        };
        
        // Extract colors and fonts from this frame
        extractColorsFromNode(frame, data.colors);
        extractTypographyFromNode(frame, data.typography);
      } else {
        console.warn(`⚠️  Frame not found: ${frameName}`);
      }
    }
    
    // Check Symbols page for components
    const symbolsPage = file.data.document.children.find(
      (page: any) => page.name === 'Symbols'
    );
    
    if (symbolsPage) {
      console.log(`🧩 Found "Symbols" page`);
      extractColorsFromSymbols(symbolsPage, data.colors);
    }
    
    // Generate output files
    generateFrameMap(data.frames);
    generateColorSystem(data.colors);
    generateTypographySystem(data.typography);
    
    console.log('✅ Extraction complete!');
    console.log(`📊 Stats:
    - Frames: ${Object.keys(data.frames).length}
    - Unique colors: ${Object.keys(data.colors).length}
    - Unique fonts: ${Object.keys(data.typography).length}`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

function extractBackgroundColor(node: any): string {
  if (node.backgroundColor) {
    const { r, g, b, a = 1 } = node.backgroundColor;
    return rgbToHex(r * 255, g * 255, b * 255);
  }
  
  if (node.fills && Array.isArray(node.fills) && node.fills.length > 0) {
    const fill = node.fills[0];
    if (fill.type === 'SOLID' && fill.color) {
      const { r, g, b } = fill.color;
      return rgbToHex(r * 255, g * 255, b * 255);
    }
  }
  
  return '#FFFFFF';
}

function extractColorsFromNode(node: any, colorMap: Record<string, any>) {
  // Extract fill colors
  if (node.fills && Array.isArray(node.fills)) {
    node.fills.forEach((fill: any) => {
      if (fill.type === 'SOLID' && fill.color) {
        const hex = rgbToHex(fill.color.r * 255, fill.color.g * 255, fill.color.b * 255);
        const key = hex.toLowerCase();
        
        if (!colorMap[key]) {
          colorMap[key] = {
            hex,
            rgb: {
              r: Math.round(fill.color.r * 255),
              g: Math.round(fill.color.g * 255),
              b: Math.round(fill.color.b * 255),
              a: fill.opacity || 1
            },
            count: 0,
            usage: []
          };
        }
        
        colorMap[key].count++;
        if (node.name && !colorMap[key].usage.includes(node.name)) {
          colorMap[key].usage.push(node.name);
        }
      }
    });
  }
  
  // Extract stroke colors
  if (node.strokes && Array.isArray(node.strokes)) {
    node.strokes.forEach((stroke: any) => {
      if (stroke.type === 'SOLID' && stroke.color) {
        const hex = rgbToHex(stroke.color.r * 255, stroke.color.g * 255, stroke.color.b * 255);
        const key = hex.toLowerCase();
        
        if (!colorMap[key]) {
          colorMap[key] = {
            hex,
            rgb: {
              r: Math.round(stroke.color.r * 255),
              g: Math.round(stroke.color.g * 255),
              b: Math.round(stroke.color.b * 255),
              a: stroke.opacity || 1
            },
            count: 0,
            usage: []
          };
        }
        
        colorMap[key].count++;
      }
    });
  }
  
  // Recurse through children
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((child: any) => {
      extractColorsFromNode(child, colorMap);
    });
  }
}

function extractTypographyFromNode(node: any, fontMap: Record<string, any>) {
  if (node.type === 'TEXT' && node.style) {
    const style = node.style;
    const key = `${style.fontFamily}_${style.fontSize}_${style.fontWeight}`;
    
    if (!fontMap[key]) {
      fontMap[key] = {
        fontFamily: style.fontFamily || 'Inter',
        fontSize: style.fontSize || 16,
        fontWeight: style.fontWeight || 400,
        lineHeight: style.lineHeightPx || style.lineHeightPercentFontSize || 'normal',
        letterSpacing: style.letterSpacing || 0,
        textCase: style.textCase || 'ORIGINAL',
        count: 0,
        examples: []
      };
    }
    
    fontMap[key].count++;
    if (node.characters && fontMap[key].examples.length < 3) {
      fontMap[key].examples.push(node.characters.substring(0, 50));
    }
  }
  
  // Recurse through children
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((child: any) => {
      extractTypographyFromNode(child, fontMap);
    });
  }
}

function extractColorsFromSymbols(symbolsPage: any, colorMap: Record<string, any>) {
  // Look for the colors layer
  const colorsLayer = symbolsPage.children.find((child: any) => 
    child.name.toLowerCase() === 'colors'
  );
  
  if (colorsLayer && colorsLayer.children) {
    console.log(`🎨 Found ${colorsLayer.children.length} color symbols`);
    
    colorsLayer.children.forEach((colorNode: any) => {
      if (colorNode.fills && Array.isArray(colorNode.fills)) {
        colorNode.fills.forEach((fill: any) => {
          if (fill.type === 'SOLID' && fill.color) {
            const hex = rgbToHex(fill.color.r * 255, fill.color.g * 255, fill.color.b * 255);
            const key = hex.toLowerCase();
            
            if (!colorMap[key]) {
              colorMap[key] = {
                hex,
                rgb: {
                  r: Math.round(fill.color.r * 255),
                  g: Math.round(fill.color.g * 255),
                  b: Math.round(fill.color.b * 255),
                  a: fill.opacity || 1
                },
                count: 0,
                usage: [],
                symbolName: colorNode.name
              };
            } else if (!colorMap[key].symbolName) {
              colorMap[key].symbolName = colorNode.name;
            }
          }
        });
      }
    });
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function generateFrameMap(frames: Record<string, any>) {
  const content = `// Auto-generated frame mapping
export const figmaFrames = ${JSON.stringify(frames, null, 2)};

export const frameOrder = [
${TARGET_FRAMES.map(name => `  '${name}'`).join(',\n')}
];
`;
  
  const outputPath = path.join(process.cwd(), 'src/design-system/tokens/frame-map.ts');
  writeFileSync(outputPath, content);
  console.log('📝 Generated frame map');
}

function generateColorSystem(colors: Record<string, any>) {
  // Sort colors by usage frequency
  const sortedColors = Object.entries(colors)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 20); // Top 20 most used colors
  
  const cssLines = [
    '/* Auto-generated color system from Figma */',
    ':root {',
    '  /* Primary colors (most used) */'
  ];
  
  sortedColors.forEach(([key, color], index) => {
    const varName = color.symbolName || `color-${index + 1}`;
    cssLines.push(`  --${varName.toLowerCase().replace(/[^a-z0-9]/g, '-')}: ${color.hex}; /* Used ${color.count} times */`);
  });
  
  cssLines.push('}');
  
  const cssPath = path.join(process.cwd(), 'src/design-system/tokens/colors.css');
  writeFileSync(cssPath, cssLines.join('\n'));
  
  // Also generate JS version
  const jsContent = `// Auto-generated color tokens
export const colors = {
${sortedColors.map(([key, color], index) => {
  const name = color.symbolName || `color${index + 1}`;
  return `  '${name}': '${color.hex}'`;
}).join(',\n')}
};
`;
  
  const jsPath = path.join(process.cwd(), 'src/design-system/tokens/colors.ts');
  writeFileSync(jsPath, jsContent);
  console.log('📝 Generated color system');
}

function generateTypographySystem(typography: Record<string, any>) {
  // Sort by usage
  const sortedFonts = Object.entries(typography)
    .sort(([, a], [, b]) => b.count - a.count);
  
  const cssLines = [
    '/* Auto-generated typography system */',
    ':root {'
  ];
  
  // Generate logical text style names based on size
  const textStyles = new Map<number, any>();
  
  sortedFonts.forEach(([key, font]) => {
    const size = font.fontSize;
    if (!textStyles.has(size)) {
      textStyles.set(size, font);
    }
  });
  
  // Sort by size and assign names
  const sortedBySize = Array.from(textStyles.entries()).sort(([a], [b]) => b - a);
  
  sortedBySize.forEach(([size, font], index) => {
    let styleName = '';
    if (size >= 32) styleName = `heading-${index + 1}`;
    else if (size >= 18) styleName = `body-large`;
    else if (size >= 16) styleName = `body`;
    else if (size >= 14) styleName = `body-small`;
    else styleName = `caption`;
    
    cssLines.push(`  /* ${styleName} */`);
    cssLines.push(`  --font-${styleName}-family: "${font.fontFamily}";`);
    cssLines.push(`  --font-${styleName}-size: ${font.fontSize}px;`);
    cssLines.push(`  --font-${styleName}-weight: ${font.fontWeight};`);
    cssLines.push(`  --font-${styleName}-line-height: ${font.lineHeight}px;`);
    cssLines.push('');
  });
  
  cssLines.push('}');
  
  const outputPath = path.join(process.cwd(), 'src/design-system/tokens/typography.css');
  writeFileSync(outputPath, cssLines.join('\n'));
  console.log('📝 Generated typography system');
}

// Run extraction
extractData().catch(console.error);