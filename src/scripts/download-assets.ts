/**
 * ADAMCHINS PrepWise
 * Classification: ADAMCHINS-CONFIDENTIAL ▲
 * Script: Download Assets from Figma
 * Purpose: Download images and icons from Figma
 * Why Needed: Get actual assets for the imported components
 */

import * as Figma from 'figma-js';
import { writeFileSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config({ path: '.env.local' });

const TOKEN = process.env.VITE_FIGMA_ACCESS_TOKEN!;
const FILE_ID = process.env.VITE_FIGMA_FILE_ID!;

const client = Figma.Client({ personalAccessToken: TOKEN });

// Specific node IDs to download
const ASSET_NODES = {
  logo: 'Frame 10',
  heroImage: 'img',
  // Add more as needed
};

async function downloadAssets() {
  console.log('🎨 Downloading assets from Figma...');
  
  try {
    // Get the file to find node IDs
    const file = await client.file(FILE_ID);
    const websitePage = file.data.document.children.find(
      (page: any) => page.name === 'Website'
    );
    
    if (!websitePage) {
      throw new Error('Website page not found');
    }
    
    // Find landing page
    const landingFrame = websitePage.children.find(
      (child: any) => child.name === 'Page_1_Landing_Page_not_log_in'
    );
    
    if (!landingFrame) {
      throw new Error('Landing page frame not found');
    }
    
    // Collect node IDs
    const nodeIds: string[] = [];
    const nodeMap: Record<string, string> = {};
    
    // Find specific nodes
    function findNodes(node: any, path: string = '') {
      const currentPath = path ? `${path}/${node.name}` : node.name;
      
      // Check if this is one of our target assets
      if (node.name === 'Frame 10' || node.name === 'Frame 3') {
        nodeIds.push(node.id);
        nodeMap[node.id] = 'logo';
      } else if (node.name === 'img' && node.type === 'RECTANGLE') {
        nodeIds.push(node.id);
        nodeMap[node.id] = 'hero-image';
      } else if (node.type === 'VECTOR' && currentPath.includes('Frame 33')) {
        nodeIds.push(node.id);
        nodeMap[node.id] = `icon-${nodeIds.length}`;
      }
      
      // Recurse
      if (node.children) {
        node.children.forEach((child: any) => findNodes(child, currentPath));
      }
    }
    
    findNodes(landingFrame);
    
    if (nodeIds.length === 0) {
      console.log('⚠️  No image nodes found');
      return;
    }
    
    console.log(`📸 Found ${nodeIds.length} assets to download`);
    
    // Get image URLs
    const response = await client.fileImages(FILE_ID, {
      ids: nodeIds,
      format: 'png',
      scale: 2
    });
    
    // Download each image
    for (const [nodeId, url] of Object.entries(response.data.images)) {
      const filename = nodeMap[nodeId] || 'asset';
      await downloadImage(url, `public/${filename}.png`);
    }
    
    console.log('✅ Assets downloaded successfully!');
    
  } catch (error) {
    console.error('❌ Error downloading assets:', error);
  }
}

function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(process.cwd(), filepath);
    console.log(`⬇️  Downloading: ${path.basename(filepath)}`);
    
    https.get(url, (response) => {
      const chunks: Buffer[] = [];
      
      response.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        writeFileSync(fullPath, buffer);
        console.log(`✅ Saved: ${filepath}`);
        resolve();
      });
      
      response.on('error', reject);
    });
  });
}

// Run the download
downloadAssets().catch(console.error);