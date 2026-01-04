import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const products = [
  { name: 'bench-barrier-product-shot', color: '#3b82f6', text: 'BENCH COVER PRO' },
  { name: 'benchbarrier-standard', color: '#3b82f6', text: 'STANDARD COVER' },
  { name: 'mat-protector-elite', color: '#3b82f6', text: 'ELITE MAT' },
  { name: 'mat-shield-quick-clean', color: '#3b82f6', text: 'QUICK CLEAN' },
  { name: 'gym-towel-set', color: '#3b82f6', text: 'TOWEL SET' },
  { name: 'gym-bag-bundle', color: '#3b82f6', text: 'GYM BAG' },
  { name: 'team-bundle-5pack', color: '#3b82f6', text: 'TEAM BUNDLE' },
  { name: 'elite-bundle', color: '#3b82f6', text: 'PREMIUM PACK' },
];

const mediaDir = path.join(__dirname, '../public/media');

// Ensure media directory exists
if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true });
}

products.forEach(product => {
  const svg = `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="800" fill="#0c0a09"/>
  <rect x="50" y="50" width="700" height="700" fill="none" stroke="${product.color}" stroke-width="4"/>
  <text x="400" y="380" font-family="monospace" font-size="48" font-weight="bold" fill="${product.color}" text-anchor="middle">${product.text}</text>
  <text x="400" y="440" font-family="monospace" font-size="24" fill="#78716c" text-anchor="middle">BENCHBARRIER</text>
  <circle cx="400" cy="500" r="80" fill="none" stroke="${product.color}" stroke-width="3"/>
  <rect x="360" y="480" width="80" height="40" fill="${product.color}"/>
</svg>`;

  const filePath = path.join(mediaDir, `${product.name}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`Created: ${product.name}.svg`);
});

console.log('\n✅ All placeholder images created successfully!');
