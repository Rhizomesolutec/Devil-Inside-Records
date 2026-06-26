const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'public', 'artists'),
  path.join(__dirname, 'public', 'release'),
  path.join(__dirname, 'src', 'image')
];

async function convertDir(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist: ${dir}`);
    return;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) continue;
    const ext = path.extname(filePath).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const outputName = path.basename(filePath, ext) + '.webp';
      const outputPath = path.join(dir, outputName);
      console.log(`Converting ${filePath} -> ${outputPath}`);
      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        const originalSize = stat.size;
        const newSize = fs.statSync(outputPath).size;
        console.log(`Saved: ${((originalSize - newSize) / 1024).toFixed(2)} KB (${((newSize/originalSize)*100).toFixed(1)}% of original)`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

async function run() {
  for (const dir of directories) {
    console.log(`Processing directory: ${dir}`);
    await convertDir(dir);
  }
}

run();
