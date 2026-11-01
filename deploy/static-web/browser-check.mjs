import { chromium } from '../../.tmp/static-web-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
const browser = await chromium.launch({headless:true,channel:'chrome'});
const page = await browser.newPage({viewport:{width:1440,height:1000},timezoneId:'Asia/Ho_Chi_Minh'});
const errors=[]; page.on('pageerror',error=>errors.push({url:page.url(),message:error.message}));
// External article images are outside this package; keep local UI checks deterministic.
await page.route('https://**',route=>route.abort());
// Analytics is outside the static bundle and not needed for this UI test.
await page.route('**/api/analytics/visit',route=>route.fulfill({status:204}));
const checks=[];
try {
 await page.goto('http://127.0.0.1:3388/vi/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('html').getAttribute('lang'),'vi');
 await page.screenshot({path:'outputs/static-web/home-desktop.png',fullPage:false});
 checks.push('Vietnamese homepage hydrates');
 await page.goto('http://127.0.0.1:3388/en/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('html').getAttribute('lang'),'en');
 checks.push('English homepage hydrates');
 await page.goto('http://127.0.0.1:3388/vi/news/',{waitUntil:'networkidle'});
 await page.locator('input[name="q"]').fill('ESET');
 await page.getByRole('button',{name:'Tìm kiếm',exact:true}).click();
 await page.waitForURL('**/vi/news/?q=ESET');
 await page.waitForLoadState('networkidle');
 assert.equal(await page.locator('main a[target="_blank"][data-reveal]').count(),1);
 assert.ok(await page.locator('main').innerText().then(text=>text.includes('Hội nghị ESET2026')));
 checks.push('Static news search filters the source cards');
 await page.goto('http://127.0.0.1:3388/vi/resources/',{waitUntil:'networkidle'});
 const download=page.locator('main a[download]').first();
 assert.ok((await download.getAttribute('href')).startsWith('/documents/'));
 checks.push('Resource download points directly to static document');
 await page.goto('http://127.0.0.1:3388/vi/programmes/cong-nghe-thong-tin/',{waitUntil:'networkidle'});
 assert.ok(await page.locator('main h1').innerText());
 checks.push('Programme detail renders without server');
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:3388/vi/',{waitUntil:'networkidle'});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));
 await page.screenshot({path:'outputs/static-web/home-mobile.png',fullPage:false});
 checks.push('Mobile homepage fits viewport');
 assert.deepEqual(errors,[]);
 const file='outputs/static-web/VERIFICATION.json';const report=JSON.parse(readFileSync(file,'utf8'));
 report.browser={engine:'Chrome headless',checks,errors};
 writeFileSync(file,JSON.stringify(report,null,2));
 console.log(JSON.stringify(report.browser,null,2));
} finally {await browser.close();}
