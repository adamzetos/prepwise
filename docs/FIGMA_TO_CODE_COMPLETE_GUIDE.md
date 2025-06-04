# 🎨 PrepWise Figma-to-Code Complete Import Guide
**Classification: ADAMCHINS-CONFIDENTIAL ▲**  
**Version: 2.0**  
**Created: 2025-06-01**  
**Purpose: Comprehensive guide for importing PrepWise Figma designs with maximum fidelity**

---

## 📚 Table of Contents

I. [Overview & Prerequisites](#i-overview--prerequisites)  
II. [Phase 1: Figma Design Preparation](#ii-phase-1-figma-design-preparation)  
III. [Phase 2: Setting Up Figma Dev Mode](#iii-phase-2-setting-up-figma-dev-mode)  
IV. [Phase 3: Design Tokens Extraction](#iv-phase-3-design-tokens-extraction)  
V. [Phase 4: Component Export Strategy](#v-phase-4-component-export-strategy)  
VI. [Phase 5: Using AI-Powered Tools](#vi-phase-5-using-ai-powered-tools)  
VII. [Phase 6: Code Connect Implementation](#vii-phase-6-code-connect-implementation)  
VIII. [Phase 7: Asset Management](#viii-phase-7-asset-management)  
IX. [Phase 8: Quality Assurance](#ix-phase-8-quality-assurance)  
X. [Tool Comparison & Recommendations](#x-tool-comparison--recommendations)

---

## I. Overview & Prerequisites

### 🎯 Goal
Convert PrepWise Figma designs into production-ready React code while preserving:
- Pixel-perfect accuracy
- Responsive behavior
- Interactive states
- Design system consistency
- Accessibility standards

### 📋 Prerequisites

#### 1. Access Requirements
```bash
# Figma Access
- Figma account with Dev Mode access (paid plan required from 2024)
- Editor access to PrepWise Figma file
- Personal Access Token for API access

# Development Environment
- Node.js 18+ installed
- React project initialized (PrepWise)
- VS Code with Figma extension
```

#### 2. Install Required Tools
```bash
# Global tools
npm install -g figma-export
npm install -g @figma/code-connect

# Project dependencies
cd prepwise
npm install --save-dev \
  @svgr/webpack \
  @svgr/cli \
  style-dictionary \
  sharp \
  imagemin \
  imagemin-webp \
  tokens-studio-for-figma

# VS Code Extension
# Install "Figma for VS Code" from marketplace
```

#### 3. Figma Access Token Setup
```bash
# 1. Go to Figma Account Settings
# 2. Generate Personal Access Token
# 3. Add to environment variables

# .env.local
FIGMA_ACCESS_TOKEN=your-token-here
FIGMA_FILE_ID=your-prepwise-file-id
FIGMA_TEAM_ID=your-team-id
```

---

## II. Phase 1: Figma Design Preparation

### 🎓 Theory: Why Preparation Matters
Proper Figma file organization directly impacts code quality. Well-structured designs lead to:
- Cleaner component generation
- Better responsive behavior
- Easier maintenance
- Consistent naming conventions

### 1. Design Audit Checklist ✅

#### a) Layer Organization
```
✅ All layers properly named (no "Frame 123")
✅ Consistent naming convention (kebab-case recommended)
✅ No overlapping elements (use Auto Layout)
✅ Groups logically organized
✅ Components properly defined
```

#### b) Auto Layout Setup
```figma
// CRITICAL: Apply Auto Layout to ALL containers
1. Select frame/group
2. Shift + A (Add Auto Layout)
3. Configure:
   - Direction: Horizontal/Vertical
   - Spacing between items (use 8px grid)
   - Padding (consistent values)
   - Min/Max width constraints
```

#### c) Component Structure
```
PrepWise Components/
├── 🧩 Atoms/
│   ├── Button (with variants)
│   ├── Input (all states)
│   ├── Icon (all icons)
│   └── Typography (all styles)
├── 🧩 Molecules/
│   ├── Card
│   ├── Form Field
│   └── Navigation Item
├── 🧩 Organisms/
│   ├── Header
│   ├── Interview Card
│   └── Feedback Panel
└── 📄 Pages/
    ├── Student Dashboard
    ├── Interview Room
    └── Analytics View
```

### 2. Design Token Setup 🎨

#### a) Color System
```figma
// Create color styles in Figma
Primary/
├── primary-50: #EFF6FF
├── primary-100: #DBEAFE
├── primary-500: #3B82F6 (main)
├── primary-900: #1E3A8A

Semantic/
├── success: #10B981
├── warning: #F59E0B
├── error: #EF4444
├── info: #3B82F6
```

#### b) Typography Scale
```figma
// Define text styles
Headings/
├── h1: Inter 48px/56px Bold
├── h2: Inter 36px/44px Bold
├── h3: Inter 24px/32px Semibold

Body/
├── body-lg: Inter 18px/28px Regular
├── body-md: Inter 16px/24px Regular
├── body-sm: Inter 14px/20px Regular
```

#### c) Spacing System
```figma
// Use 8px grid system
Spacing/
├── space-1: 4px
├── space-2: 8px
├── space-3: 12px
├── space-4: 16px
├── space-6: 24px
├── space-8: 32px
```

### 3. Responsive Design Setup 📱

#### a) Breakpoint Frames
```figma
// Create frames for each breakpoint
Desktop: 1440px width
Laptop: 1024px width
Tablet: 768px width
Mobile: 375px width
```

#### b) Constraints Configuration
```figma
// Set constraints for responsive behavior
1. Select element
2. Right panel → Constraints
3. Configure:
   - Horizontal: Scale/Fixed/Stretch
   - Vertical: Top/Center/Bottom
   - Pin to edges as needed
```

---

## III. Phase 2: Setting Up Figma Dev Mode

### 1. Enable Dev Mode 🔧

```typescript
// Access Dev Mode
1. Open PrepWise Figma file
2. Toggle Dev Mode (top right switch)
3. Configure preferences:
   - Units: Pixels
   - Code format: CSS/React
   - Include comments: Yes
```

### 2. Mark Designs as Ready 🚀

```figma
// Mark completed designs
1. Select frames/components
2. Right-click → "Mark as ready for development"
3. Add implementation notes
4. Tag with version/sprint
```

### 3. VS Code Integration 💻

```bash
# Install Figma VS Code extension
1. Open VS Code
2. Extensions → Search "Figma for VS Code"
3. Install and authenticate
4. Configure workspace:
```

```json
// .vscode/settings.json
{
  "figma.autocompleteBlocks": true,
  "figma.showGrid": true,
  "figma.showRulers": true,
  "figma.fileId": "${FIGMA_FILE_ID}"
}
```

---

## IV. Phase 3: Design Tokens Extraction

### 1. Using Tokens Studio 🎨

```typescript
// Install Tokens Studio plugin in Figma
1. Plugins → Browse → "Tokens Studio for Figma"
2. Install and open
3. Create token sets:

// tokens/global.json
{
  "color": {
    "primary": {
      "50": { "value": "#EFF6FF" },
      "500": { "value": "#3B82F6" },
      "900": { "value": "#1E3A8A" }
    }
  },
  "spacing": {
    "xs": { "value": "4px" },
    "sm": { "value": "8px" },
    "md": { "value": "16px" }
  },
  "typography": {
    "heading": {
      "h1": {
        "fontSize": { "value": "48px" },
        "lineHeight": { "value": "56px" },
        "fontWeight": { "value": "700" }
      }
    }
  }
}
```

### 2. Automated Token Extraction Script 🤖

```typescript
// scripts/extract-tokens.ts
"""
ADAMCHINS PrepWise
Classification: ADAMCHINS-CONFIDENTIAL ▲
Purpose: Extract design tokens from Figma
Why Needed: Single source of truth for design system
"""

import * as Figma from 'figma-js';
import { writeFileSync } from 'fs';
import path from 'path';

const client = Figma.Client({
  personalAccessToken: process.env.FIGMA_ACCESS_TOKEN!
});

interface DesignTokens {
  colors: Record<string, string>;
  typography: Record<string, any>;
  spacing: Record<string, string>;
  shadows: Record<string, any>;
  borderRadius: Record<string, string>;
}

async function extractTokens(): Promise<void> {
  console.log('🎓 Extracting design tokens from Figma...');
  
  const file = await client.file(process.env.FIGMA_FILE_ID!);
  const { styles, document } = file.data;
  
  const tokens: DesignTokens = {
    colors: extractColors(styles),
    typography: extractTypography(styles),
    spacing: extractSpacing(document),
    shadows: extractShadows(styles),
    borderRadius: extractBorderRadius(styles)
  };
  
  // Generate multiple output formats
  generateCSSVariables(tokens);
  generateTypeScriptTokens(tokens);
  generateTailwindConfig(tokens);
  
  console.log('✅ Design tokens extracted successfully!');
}

function extractColors(styles: any): Record<string, string> {
  const colors: Record<string, string> = {};
  
  Object.entries(styles).forEach(([id, style]: [string, any]) => {
    if (style.styleType === 'FILL') {
      const fill = style.fills?.[0];
      if (fill?.type === 'SOLID') {
        const { r, g, b, a = 1 } = fill.color;
        const hex = rgbToHex(r * 255, g * 255, b * 255);
        const name = style.name.toLowerCase().replace(/\s+/g, '-');
        colors[name] = hex;
      }
    }
  });
  
  return colors;
}

function generateCSSVariables(tokens: DesignTokens): void {
  const css = `
/* Auto-generated from Figma - Do not edit manually */
/* Generated: ${new Date().toISOString()} */

:root {
  /* Colors */
${Object.entries(tokens.colors).map(([name, value]) => 
  `  --color-${name}: ${value};`
).join('\n')}

  /* Typography */
${Object.entries(tokens.typography).map(([name, value]) => 
  `  --font-${name}: ${value.fontSize}/${value.lineHeight} ${value.fontFamily};
  --font-weight-${name}: ${value.fontWeight};`
).join('\n')}

  /* Spacing */
${Object.entries(tokens.spacing).map(([name, value]) => 
  `  --space-${name}: ${value};`
).join('\n')}

  /* Shadows */
${Object.entries(tokens.shadows).map(([name, value]) => 
  `  --shadow-${name}: ${value};`
).join('\n')}

  /* Border Radius */
${Object.entries(tokens.borderRadius).map(([name, value]) => 
  `  --radius-${name}: ${value};`
).join('\n')}
}`;

  writeFileSync(
    path.join(process.cwd(), 'src/styles/design-tokens.css'),
    css
  );
}

function generateTypeScriptTokens(tokens: DesignTokens): void {
  const ts = `
// Auto-generated from Figma - Do not edit manually
// Generated: ${new Date().toISOString()}

export const designTokens = ${JSON.stringify(tokens, null, 2)} as const;

export type ColorToken = keyof typeof designTokens.colors;
export type SpacingToken = keyof typeof designTokens.spacing;
export type TypographyToken = keyof typeof designTokens.typography;
`;

  writeFileSync(
    path.join(process.cwd(), 'src/design-system/tokens.ts'),
    ts
  );
}

// Run extraction
extractTokens().catch(console.error);
```

### 3. Style Dictionary Configuration 📚

```javascript
// style-dictionary.config.js
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'src/design-system/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'src/styles/',
      files: [{
        destination: '_variables.scss',
        format: 'scss/variables'
      }]
    }
  }
};
```

---

## V. Phase 4: Component Export Strategy

### 1. Manual Export for Icons & Graphics 🎨

```bash
# Export settings for different asset types

# Icons (SVG)
- Format: SVG
- Include "id" attributes: ✓
- Outline text: ✓
- Flatten images: ✗
- Simplify stroke: ✓

# Images (Multiple formats)
- Formats: PNG @1x, @2x, @3x + WebP
- Export settings:
  - PNG: Optimize for web
  - WebP: Quality 85%
  - Include color profile: ✗
```

### 2. Automated Component Export Script 🤖

```typescript
// scripts/export-components.ts
"""
ADAMCHINS PrepWise
Classification: ADAMCHINS-CONFIDENTIAL ▲
Purpose: Export Figma components as React components
Why Needed: Automate component library creation
"""

import { transform } from '@svgr/core';
import * as Figma from 'figma-js';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';

const client = Figma.Client({
  personalAccessToken: process.env.FIGMA_ACCESS_TOKEN!
});

interface ComponentExportConfig {
  componentIds: string[];
  outputDir: string;
  format: 'svg' | 'react';
  typescript: boolean;
}

async function exportComponents(config: ComponentExportConfig): Promise<void> {
  console.log('🎓 Exporting components from Figma...');
  
  // Create output directory
  mkdirSync(config.outputDir, { recursive: true });
  
  // Fetch component images
  const images = await client.fileImages(
    process.env.FIGMA_FILE_ID!,
    {
      ids: config.componentIds,
      format: 'svg',
      svg_include_id: true,
      svg_simplify_stroke: true
    }
  );
  
  // Process each component
  for (const [nodeId, imageUrl] of Object.entries(images.data.images)) {
    const svgContent = await fetchSvg(imageUrl);
    const componentName = await getComponentName(nodeId);
    
    if (config.format === 'react') {
      await generateReactComponent(
        svgContent,
        componentName,
        config.outputDir,
        config.typescript
      );
    } else {
      // Save as SVG
      writeFileSync(
        path.join(config.outputDir, `${componentName}.svg`),
        svgContent
      );
    }
  }
  
  // Generate index file
  generateIndexFile(config.outputDir, config.componentIds);
  
  console.log('✅ Components exported successfully!');
}

async function generateReactComponent(
  svgContent: string,
  componentName: string,
  outputDir: string,
  typescript: boolean
): Promise<void> {
  const jsCode = await transform(
    svgContent,
    {
      typescript,
      prettier: true,
      svgo: true,
      svgoConfig: {
        plugins: [
          'preset-default',
          'prefixIds',
          {
            name: 'removeViewBox',
            active: false
          }
        ]
      },
      template: (variables, { tpl }) => {
        return tpl`
/**
 * ADAMCHINS PrepWise
 * Auto-generated from Figma - Do not edit manually
 * Component: ${componentName}
 * Generated: ${new Date().toISOString()}
 */

import { SVGProps, memo } from 'react';

export interface ${componentName}Props extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const ${componentName} = memo<${componentName}Props>(({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}) => (
  ${variables.jsx.replace('props', '{ ...props, width: size, height: size, fill: color }')}
));

${componentName}.displayName = '${componentName}';
        `;
      }
    },
    { componentName }
  );
  
  const extension = typescript ? '.tsx' : '.jsx';
  writeFileSync(
    path.join(outputDir, `${componentName}${extension}`),
    jsCode
  );
}

// Export configuration for PrepWise
const prepwiseConfig: ComponentExportConfig = {
  componentIds: [
    // Add your component node IDs here
    'COMPONENT_ID_1',
    'COMPONENT_ID_2',
  ],
  outputDir: 'src/design-system/components',
  format: 'react',
  typescript: true
};

exportComponents(prepwiseConfig).catch(console.error);
```

### 3. Component Mapping Strategy 🗺️

```typescript
// src/design-system/component-map.ts
"""
ADAMCHINS PrepWise
Classification: ADAMCHINS-CONFIDENTIAL ▲
Purpose: Map Figma components to React components
Why Needed: Maintain consistency between design and code
"""

export const componentMap = {
  // Atoms
  'Button': {
    figmaId: 'FIGMA_NODE_ID',
    component: () => import('./components/Button'),
    variants: {
      'primary': 'variant="primary"',
      'secondary': 'variant="secondary"',
      'ghost': 'variant="ghost"'
    }
  },
  
  // Molecules
  'InterviewCard': {
    figmaId: 'FIGMA_NODE_ID',
    component: () => import('./components/InterviewCard'),
    props: {
      'title': 'string',
      'duration': 'number',
      'difficulty': 'beginner | intermediate | advanced'
    }
  },
  
  // Organisms
  'StudentDashboard': {
    figmaId: 'FIGMA_NODE_ID',
    component: () => import('./pages/StudentDashboard'),
    responsive: true,
    breakpoints: {
      mobile: 375,
      tablet: 768,
      desktop: 1440
    }
  }
};
```

---

## VI. Phase 5: Using AI-Powered Tools

### 🎓 Theory: When to Use AI Tools
AI-powered tools excel at:
- Rapid prototyping
- Converting complex layouts
- Generating responsive code
- Maintaining design consistency

### 1. Builder.io Visual Copilot Setup 🤖

```typescript
// Install Builder.io plugin in Figma
1. Plugins → "Builder.io Visual Copilot"
2. Configure settings:

// Builder.io Configuration
{
  "framework": "react",
  "styling": "tailwind",
  "typescript": true,
  "componentMapping": true,
  "responsiveness": "auto",
  "codeStyle": "clean", // fast | clean | semantic
  "customInstructions": "Use PrepWise design system tokens"
}
```

#### Using Visual Copilot
```typescript
// Step-by-step process
1. Select frame/component in Figma
2. Open Visual Copilot plugin
3. Configure options:
   - Framework: React
   - Styling: Tailwind CSS
   - Include interactions: Yes
   - Map to existing components: Yes

4. Add custom prompt:
   "Generate React component using PrepWise design tokens.
    Use semantic HTML, ARIA labels, and follow accessibility best practices.
    Implement responsive behavior using Tailwind breakpoints."

5. Click "Generate Code"
6. Review and refine output
```

### 2. Anima Plugin Configuration 🎨

```typescript
// Anima Setup (900,000+ users)
1. Install Anima plugin
2. Configure project:

// Project Settings
{
  "name": "PrepWise",
  "framework": "React",
  "cssFramework": "Tailwind",
  "routing": "React Router",
  "stateManagement": "Props & Hooks",
  "responsive": {
    "breakpoints": [375, 768, 1024, 1440],
    "unit": "rem"
  }
}

// Export Settings
{
  "codeQuality": "production",
  "includeComments": true,
  "generateTypes": true,
  "optimizeImages": true,
  "preserveInteractions": true
}
```

### 3. Locofy.ai Lightning Setup ⚡

```typescript
// Locofy Configuration
1. Install Locofy plugin
2. Tag elements:

// Tagging Strategy
- Buttons → Tag as "Button" component
- Inputs → Tag as "Input" with validation
- Cards → Tag as reusable component
- Navigation → Tag with routing

// Responsiveness Settings
{
  "autoResponsive": true,
  "breakpoints": {
    "mobile": { "max": 767 },
    "tablet": { "min": 768, "max": 1023 },
    "desktop": { "min": 1024 }
  },
  "flexboxPreference": true,
  "cssGrid": "when-optimal"
}
```

### 4. AI Tool Comparison for PrepWise 📊

```typescript
// Decision Matrix
const toolComparison = {
  'Builder.io Visual Copilot': {
    pros: [
      'Best AI accuracy',
      'Component mapping',
      'Custom instructions',
      'VSCode integration'
    ],
    cons: [
      'Limited free tier',
      'Learning curve'
    ],
    bestFor: 'Complex components, production code',
    price: 'Free during beta, then $25-35/month'
  },
  
  'Anima': {
    pros: [
      'Largest user base (900k+)',
      'Material UI support',
      'Auto-responsive',
      'React Router integration'
    ],
    cons: [
      'Higher price point',
      'Sometimes verbose code'
    ],
    bestFor: 'Full page conversions, teams',
    price: '$39-150/month'
  },
  
  'Locofy.ai': {
    pros: [
      'Live preview',
      'GitHub integration',
      'Smart component detection',
      'Good documentation'
    ],
    cons: [
      'Newer tool',
      'Limited customization'
    ],
    bestFor: 'Rapid prototyping, MVPs',
    price: 'Freemium model'
  }
};
```

### 5. Hybrid Approach (Recommended) 🎯

```typescript
// Optimal workflow for PrepWise
1. Design Tokens: Manual extraction (accuracy)
2. Icons/Graphics: SVGR automation
3. Simple Components: AI tools (speed)
4. Complex Components: Manual + AI assistance
5. Pages/Layouts: AI generation + manual refinement

// Example: Interview Room Component
- Layout: Builder.io Visual Copilot
- Video Component: Manual implementation
- UI Elements: Anima for speed
- Interactions: Manual JavaScript
- Styling: AI-generated Tailwind + custom CSS
```

---

## VII. Phase 6: Code Connect Implementation

### 🎓 Theory: Bridging Design and Code
Code Connect creates a living connection between your Figma components and production code, ensuring developers always use the correct implementation.

### 1. Initial Setup 🔧

```bash
# Install Code Connect CLI
npm install -g @figma/code-connect

# Initialize in your project
cd prepwise
figma connect init

# This creates:
# - figma.config.json
# - .figma/
# - Example component connections
```

### 2. Configure Code Connect 📝

```json
// figma.config.json
{
  "codeConnect": {
    "parser": "react",
    "importPaths": {
      "src/components/*": "@/components/*",
      "src/design-system/*": "@/design-system/*"
    },
    "include": [
      "src/**/*.figma.tsx"
    ],
    "exclude": [
      "node_modules/**"
    ]
  }
}
```

### 3. Create Component Connections 🔗

```typescript
// src/components/Button/Button.figma.tsx
"""
ADAMCHINS PrepWise
Classification: ADAMCHINS-CONFIDENTIAL ▲
Purpose: Connect Button component to Figma
Why Needed: Provide accurate code snippets in Dev Mode
"""

import { figma } from '@figma/code-connect';
import { Button } from './Button';

/**
 * Button component connection
 * Maps Figma properties to React props
 */
figma.connect(Button, 'FIGMA_COMPONENT_URL_HERE', {
  props: {
    label: figma.string('Text'),
    variant: figma.enum('Variant', {
      'Primary': 'primary',
      'Secondary': 'secondary',
      'Ghost': 'ghost'
    }),
    size: figma.enum('Size', {
      'Small': 'sm',
      'Medium': 'md',
      'Large': 'lg'
    }),
    disabled: figma.boolean('Disabled'),
    onClick: figma.function('On Click')
  },
  example: ({ label, variant, size, disabled }) => (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={() => console.log('Clicked')}
    >
      {label}
    </Button>
  )
});
```

### 4. Complex Component Mapping 🏗️

```typescript
// src/components/InterviewCard/InterviewCard.figma.tsx
import { figma } from '@figma/code-connect';
import { InterviewCard } from './InterviewCard';

figma.connect(InterviewCard, 'FIGMA_URL', {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
    duration: figma.string('Duration'),
    difficulty: figma.enum('Difficulty', {
      'Beginner': 'beginner',
      'Intermediate': 'intermediate',
      'Advanced': 'advanced'
    }),
    type: figma.enum('Type', {
      'Behavioral': 'behavioral',
      'Technical': 'technical',
      'Case Study': 'case'
    }),
    thumbnail: figma.image('Thumbnail'),
    isNew: figma.boolean('New Badge')
  },
  example: (props) => (
    <InterviewCard
      {...props}
      onStart={() => router.push(`/interview/${id}`)}
      onBookmark={() => bookmarkInterview(id)}
    />
  ),
  variant: {
    'Has Progress': {
      progress: figma.number('Progress'),
      example: (props) => (
        <InterviewCard
          {...props}
          showProgress
          progress={props.progress}
        />
      )
    }
  }
});
```

### 5. Publish to Figma 🚀

```bash
# Publish all connections
figma connect publish --token=$FIGMA_ACCESS_TOKEN

# Publish specific components
figma connect publish src/components/Button/Button.figma.tsx

# Validate connections
figma connect validate

# Update after changes
figma connect sync
```

---

## VIII. Phase 7: Asset Management

### 1. Image Optimization Pipeline 🖼️

```typescript
// scripts/optimize-images.ts
"""
ADAMCHINS PrepWise
Classification: ADAMCHINS-CONFIDENTIAL ▲
Purpose: Optimize images for web performance
Why Needed: Reduce load times while maintaining quality
"""

import sharp from 'sharp';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import glob from 'glob';
import path from 'path';

interface OptimizationConfig {
  quality: number;
  formats: Array<'webp' | 'avif' | 'jpg' | 'png'>;
  sizes: number[];
  preserveOriginal: boolean;
}

const config: OptimizationConfig = {
  quality: 85,
  formats: ['webp', 'avif'],
  sizes: [320, 640, 768, 1024, 1280, 1920],
  preserveOriginal: false
};

async function optimizeImages(): Promise<void> {
  console.log('🎓 Optimizing images for PrepWise...');
  
  const images = glob.sync('public/assets/images/**/*.{jpg,jpeg,png}');
  
  for (const imagePath of images) {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    const baseName = path.basename(imagePath, path.extname(imagePath));
    const dir = path.dirname(imagePath);
    
    // Generate responsive sizes
    for (const width of config.sizes) {
      if (metadata.width! >= width) {
        // WebP format
        await image
          .resize(width)
          .webp({ quality: config.quality })
          .toFile(path.join(dir, `${baseName}-${width}w.webp`));
        
        // AVIF format (better compression)
        await image
          .resize(width)
          .avif({ quality: config.quality })
          .toFile(path.join(dir, `${baseName}-${width}w.avif`));
      }
    }
    
    // Generate blur placeholder
    const placeholder = await image
      .resize(20)
      .blur()
      .toBuffer();
    
    const base64 = `data:image/jpeg;base64,${placeholder.toString('base64')}`;
    
    // Save placeholder data
    await saveImageMetadata(baseName, {
      placeholder: base64,
      width: metadata.width!,
      height: metadata.height!,
      aspectRatio: metadata.width! / metadata.height!
    });
  }
  
  console.log('✅ Image optimization complete!');
}

// Component for responsive images
export const ResponsiveImage: React.FC<{
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}> = ({ src, alt, sizes = '100vw', className }) => {
  const baseName = src.replace(/\.[^/.]+$/, '');
  
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`
          ${baseName}-320w.avif 320w,
          ${baseName}-640w.avif 640w,
          ${baseName}-1024w.avif 1024w,
          ${baseName}-1920w.avif 1920w
        `}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`
          ${baseName}-320w.webp 320w,
          ${baseName}-640w.webp 640w,
          ${baseName}-1024w.webp 1024w,
          ${baseName}-1920w.webp 1920w
        `}
        sizes={sizes}
      />
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};
```

### 2. Icon System Setup 🎨

```typescript
// scripts/generate-icon-system.ts
"""
ADAMCHINS PrepWise
Classification: ADAMCHINS-CONFIDENTIAL ▲
Purpose: Create type-safe icon system
Why Needed: Consistent icon usage across app
"""

import { transform } from '@svgr/core';
import glob from 'glob';
import fs from 'fs/promises';
import path from 'path';

async function generateIconSystem(): Promise<void> {
  const icons = glob.sync('src/assets/icons/*.svg');
  const iconComponents: string[] = [];
  
  // Create icon components
  for (const iconPath of icons) {
    const svgContent = await fs.readFile(iconPath, 'utf8');
    const iconName = path.basename(iconPath, '.svg')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    const component = await transform(
      svgContent,
      {
        typescript: true,
        icon: true,
        svgoConfig: {
          plugins: [
            'preset-default',
            { name: 'removeViewBox', active: false }
          ]
        },
        template: (variables, { tpl }) => {
          return tpl`
export const ${iconName}Icon = (props: React.SVGProps<SVGSVGElement>) => (
  ${variables.jsx}
);
          `;
        }
      },
      { componentName: `${iconName}Icon` }
    );
    
    iconComponents.push(component);
  }
  
  // Generate icon index
  const indexContent = `
// Auto-generated icon system
import { lazy, Suspense } from 'react';

${iconComponents.join('\n\n')}

// Icon component with lazy loading
export const Icon = ({ 
  name, 
  size = 24, 
  color = 'currentColor',
  ...props 
}: {
  name: IconName;
  size?: number;
  color?: string;
} & React.SVGProps<SVGSVGElement>) => {
  const IconComponent = iconMap[name];
  
  return (
    <Suspense fallback={<div style={{ width: size, height: size }} />}>
      <IconComponent 
        width={size} 
        height={size} 
        fill={color} 
        {...props} 
      />
    </Suspense>
  );
};

export type IconName = keyof typeof iconMap;

const iconMap = {
  ${icons.map(icon => {
    const name = path.basename(icon, '.svg');
    const componentName = name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    return `'${name}': ${componentName}Icon`;
  }).join(',\n  ')}
};
`;

  await fs.writeFile(
    'src/design-system/icons/index.tsx',
    indexContent
  );
}
```

---

## IX. Phase 8: Quality Assurance

### 1. Visual Regression Testing 📸

```typescript
// tests/visual/visual-regression.test.ts
"""
ADAMCHINS PrepWise
Classification: ADAMCHINS-CONFIDENTIAL ▲
Purpose: Ensure pixel-perfect implementation
Why Needed: Catch visual discrepancies
"""

import { test, expect } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

test.describe('Visual Regression', () => {
  test('Button matches Figma design', async ({ page }) => {
    // Navigate to component
    await page.goto('/storybook/button--primary');
    
    // Take screenshot
    const screenshot = await page.screenshot({
      clip: { x: 0, y: 0, width: 200, height: 50 }
    });
    
    // Load Figma reference
    const reference = await loadFigmaReference('button-primary');
    
    // Compare
    const diff = pixelmatch(
      screenshot,
      reference,
      null,
      200,
      50,
      { threshold: 0.1 }
    );
    
    expect(diff).toBeLessThan(100); // Less than 100 different pixels
  });
  
  test('Responsive layout matches breakpoints', async ({ page }) => {
    const breakpoints = [375, 768, 1024, 1440];
    
    for (const width of breakpoints) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/student/dashboard');
      
      const screenshot = await page.screenshot({
        fullPage: true
      });
      
      await expect(screenshot).toMatchSnapshot(
        `dashboard-${width}px.png`
      );
    }
  });
});
```

### 2. Design Token Validation ✅

```typescript
// tests/design-system/tokens.test.ts
import { designTokens } from '@/design-system/tokens';
import { getCSSVariable } from '@/lib/utils';

describe('Design Token Consistency', () => {
  test('All Figma colors are implemented', () => {
    const figmaColors = [
      'primary-500',
      'secondary-500',
      'success',
      'error',
      'warning'
    ];
    
    figmaColors.forEach(color => {
      const cssVar = getCSSVariable(`--color-${color}`);
      expect(cssVar).toBeDefined();
      expect(cssVar).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });
  
  test('Typography scale matches design', () => {
    const typography = {
      'h1': { fontSize: '48px', lineHeight: '56px' },
      'h2': { fontSize: '36px', lineHeight: '44px' },
      'body': { fontSize: '16px', lineHeight: '24px' }
    };
    
    Object.entries(typography).forEach(([name, values]) => {
      const cssVar = getCSSVariable(`--font-${name}`);
      expect(cssVar).toContain(values.fontSize);
    });
  });
});
```

### 3. Accessibility Audit 🦾

```typescript
// tests/a11y/accessibility.test.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility', () => {
  test('Interview room is accessible', async ({ page }) => {
    await page.goto('/interview/demo');
    await injectAxe(page);
    
    // Check for violations
    const violations = await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    });
    
    expect(violations).toHaveLength(0);
  });
  
  test('All interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/student/dashboard');
    
    // Tab through all elements
    const interactiveElements = await page.$$eval(
      'button, a, input, select, textarea, [tabindex]',
      elements => elements.length
    );
    
    for (let i = 0; i < interactiveElements; i++) {
      await page.keyboard.press('Tab');
      const focusedElement = await page.evaluate(
        () => document.activeElement?.tagName
      );
      expect(focusedElement).toBeTruthy();
    }
  });
});
```

---

## X. Tool Comparison & Recommendations

### 🎯 Recommended Workflow for PrepWise

Based on comprehensive research, here's the optimal approach:

#### 1. Design Tokens & System (Manual)
```typescript
Priority: CRITICAL
Method: Scripts + Tokens Studio
Why: Foundation for all components
Time: 2-4 hours
```

#### 2. Icons & Graphics (Automated)
```typescript
Priority: HIGH
Method: SVGR + optimization scripts
Why: Consistent, optimized assets
Time: 1-2 hours
```

#### 3. Simple Components (AI-Assisted)
```typescript
Priority: MEDIUM
Method: Builder.io Visual Copilot
Why: Speed + quality balance
Time: 4-6 hours
```

#### 4. Complex Components (Hybrid)
```typescript
Priority: HIGH
Method: AI generation + manual refinement
Why: Preserve interactions and logic
Time: 8-12 hours
```

#### 5. Full Pages (AI + Manual)
```typescript
Priority: MEDIUM
Method: Anima/Locofy + heavy customization
Why: Layout structure + custom behavior
Time: 6-8 hours per page
```

### 📊 Decision Matrix

```typescript
const decisionMatrix = {
  'Design Tokens': {
    method: 'Manual extraction',
    tools: ['Tokens Studio', 'Style Dictionary'],
    accuracy: '100%',
    effort: 'Low'
  },
  'Icons': {
    method: 'Automated',
    tools: ['SVGR', 'Custom scripts'],
    accuracy: '100%',
    effort: 'Low'
  },
  'UI Components': {
    method: 'AI-assisted',
    tools: ['Builder.io', 'Code Connect'],
    accuracy: '90-95%',
    effort: 'Medium'
  },
  'Complex Layouts': {
    method: 'Hybrid',
    tools: ['Anima', 'Manual coding'],
    accuracy: '85-90%',
    effort: 'High'
  },
  'Interactions': {
    method: 'Manual',
    tools: ['React', 'Framer Motion'],
    accuracy: '100%',
    effort: 'High'
  }
};
```

### ✅ Final Checklist

Before considering the import complete:

- [ ] All design tokens extracted and implemented
- [ ] Icons converted to React components
- [ ] Component library matches Figma exactly
- [ ] Responsive behavior verified at all breakpoints
- [ ] Accessibility audit passed
- [ ] Visual regression tests passing
- [ ] Performance metrics acceptable
- [ ] Code Connect published for all components
- [ ] Documentation complete

---

## 🎓 Summary

This comprehensive guide provides multiple pathways to import your PrepWise Figma designs:

1. **Official Figma Dev Mode**: For accurate specs and measurements
2. **AI-Powered Tools**: For rapid conversion with good accuracy
3. **Code Connect**: For living documentation
4. **Custom Scripts**: For precise control and automation

The key to success is using the right tool for each task and maintaining a systematic approach throughout the process.

Remember: **Perfect is the enemy of done. Start with automation, refine manually.**

---

**PrepWise Development Team**  
*Preserving design excellence in every line of code*