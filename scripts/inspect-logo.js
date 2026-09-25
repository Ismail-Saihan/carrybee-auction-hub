const puppeteer = require('puppeteer');

async function inspect() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1536, height: 1024 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Capture full screenshot of the page
  await page.screenshot({ path: 'public/auction/browser-rendered-page.png' });

  // Capture header screenshot
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: 'public/auction/browser-header.png' });
  }

  // Evaluate logo dimensions
  const logoInfo = await page.evaluate(() => {
    const logoImg = document.querySelector('header img[alt*="CarryBee"]');
    if (!logoImg) return null;
    const rect = logoImg.getBoundingClientRect();
    const parentRect = logoImg.parentElement ? logoImg.parentElement.getBoundingClientRect() : null;
    return {
      rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      parentRect: parentRect ? { x: parentRect.x, y: parentRect.y, width: parentRect.width, height: parentRect.height } : null,
      naturalWidth: logoImg.naturalWidth,
      naturalHeight: logoImg.naturalHeight
    };
  });

  console.log('Logo info in browser:', JSON.stringify(logoInfo, null, 2));

  await browser.close();
}

inspect().catch(console.error);
