const puppeteer = require('puppeteer');
const {screenshotPath} = require('./config/config');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://www.baidu.com');
    await page.screenshot({
        path: `${screenshotPath}/${Date.now()}.png`
    });
    await browser.close();

})();