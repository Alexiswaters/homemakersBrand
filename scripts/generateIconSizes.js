const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../public/icons');
const outputFile = path.join(__dirname, '../public/iconSizes.json');

// Read all files in the icons directory
const files = fs.readdirSync(iconsDir);

// Create a map of icon names to available sizes
const iconSizes = {};

files.forEach(file => {
  if (file.endsWith('.svg')) {
    // Parse filename (format: iconName-size-style.svg)
    const parts = file.replace('.svg', '').split('-');
    
    if (parts.length >= 3) {
      const iconName = parts[0];
      const size = parts[1];
      
      // Initialize array if this icon hasn't been seen yet
      if (!iconSizes[iconName]) {
        iconSizes[iconName] = [];
      }
      
      // Add size if it's not already in the array
      if (!iconSizes[iconName].includes(size)) {
        iconSizes[iconName].push(size);
      }
    }
  }
});

// Define the exact order you want: xxxl, xl, l, m, s, xs
const sizeOrder = { 'xxxl': 0, 'xl': 1, 'l': 2, 'm': 3, 's': 4, 'xs': 5 };

// Sort sizes according to the specified order
Object.keys(iconSizes).forEach(icon => {
  iconSizes[icon].sort((a, b) => {
    // If both sizes are in our order map, sort by the order
    if (a in sizeOrder && b in sizeOrder) {
      return sizeOrder[a] - sizeOrder[b];
    }
    // If only one size is in our order map, prioritize it
    else if (a in sizeOrder) {
      return -1; // a comes first
    }
    else if (b in sizeOrder) {
      return 1;  // b comes first
    }
    // For any sizes not in our order map, sort alphabetically
    return a.localeCompare(b);
  });
});

// Write the JSON file
fs.writeFileSync(outputFile, JSON.stringify(iconSizes, null, 2));
console.log(`Generated ${outputFile} with ${Object.keys(iconSizes).length} icons`);