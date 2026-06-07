const https = require('https');
const fs = require('fs');

https.get('https://bambulab.com/en/filament', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const match = data.match(/https:\/\/[^\s"'\?]+\.(jpg|jpeg|png|webp)/ig);
    if (match) {
      const img = match.find(m => m.includes('filament') || m.includes('spool') || m.includes('pla'));
      if (img) {
         console.log('Found image:', img);
         const ext = img.split('.').pop();
         const file = fs.createWriteStream(`public/images/bambu-spool.${ext}`);
         https.get(img, r => r.pipe(file));
      } else { console.log('No specific image found, try first ones:', match.slice(0, 5)); }
    }
  });
});
