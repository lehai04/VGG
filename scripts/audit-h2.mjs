import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const output = 'outputs/h2-audit';
await fs.mkdir(output, { recursive: true });
const report = [];
try {
  const page = await browser.newPage();
  const routes = process.env.H2_ROUTES?.split(',') || ['/vi', '/vi/discover', '/vi/programmes', '/vi/programmes/quan-tri-kinh-doanh', '/vi/admissions', '/vi/research', '/vi/student-success', '/vi/news', '/vi/resources'];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      const headings = await page.locator('#main-content h2').evaluateAll(nodes => nodes.filter(n => n.getBoundingClientRect().height && !n.closest('footer,nav,dialog,[role="dialog"]')).map(n => {
        const s = getComputedStyle(n), r = n.getBoundingClientRect();
        return { text: n.textContent.trim(), color: s.color, font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, style: s.fontStyle, lineHeight: s.lineHeight, margin: s.marginBottom, overflow: n.scrollWidth > n.clientWidth + 1, outsideViewport: r.right > innerWidth + 1, parent: n.parentElement.className };
      }));
      const item = { route, width, status: response.status(), headings };
      report.push(item);
      console.log(JSON.stringify(item));
      if (['/vi', '/vi/admissions', '/vi/discover'].includes(route)) {
        const heading = page.locator('#main-content h2:visible').first();
        if (await heading.count()) await heading.scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${output}/${route.replaceAll('/', '-')}-${width}.png` });
      }
    }
  }
} finally {
  await fs.writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
