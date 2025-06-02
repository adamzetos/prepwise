#!/bin/bash
# Copy PrepWise to local directory for easier development

echo "📦 Copying PrepWise to ~/prepwise-local..."

# Create directory and copy
cp -R "$(pwd)" ~/prepwise-local

echo "✅ Project copied!"
echo ""
echo "To run the project:"
echo "1. cd ~/prepwise-local"
echo "2. npm install"
echo "3. npm run dev"
echo ""
echo "Then open http://localhost:5173"