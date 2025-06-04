const fs = require('fs');
const path = require('path');

// Read the image file
const imagePath = path.join(__dirname, 'public/icons/pdf_image.png');
const imageBuffer = fs.readFileSync(imagePath);
const base64 = imageBuffer.toString('base64');

// Create the data URL
const dataUrl = `data:image/png;base64,${base64}`;

// Output just the base64 string for easy copying
console.log('Base64 string length:', base64.length);
console.log('\nFirst 100 characters of base64:');
console.log(base64.substring(0, 100));
console.log('\nFull data URL saved to pdf_image_base64.txt');

// Save to file
fs.writeFileSync('pdf_image_base64.txt', dataUrl);