const fs = require('fs');
const https = require('https');

https.get('https://eu.store.bambulab.com/products/pla-basic', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // try to find product images
    const matches = data.match(/https:\/\/cdn\.shopify\.com\/s\/files\/[^\s"'\?]+PLA[^\s"'\?]+\.(png|webp|jpg)/i);
    const fallback = data.match(/https:\/\/cdn\.shopify\.com\/s\/files\/[^\s"'\?]+\.(png|webp|jpg)/g);
    
    const url = matches ? matches[0] : (fallback ? fallback[0] : null);
    
    if (url) {
      console.log('Found:', url);
      const ext = url.split('.').pop();
      const file = fs.createWriteStream(`public/images/bambu-spool.${ext}`);
      https.get(url, (response) => {
        response.pipe(file);
        console.log(`Downloaded to public/images/bambu-spool.${ext}`);
      });
    } else {
      console.log('No matches found');
    }
  });
}).on('error', (e) => {
  console.error(e);
});
