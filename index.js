const puppeteer = require('puppeteer');

// function imagesHaveLoaded() {
//     return Array.from(document.images).every((i) => i.complete);
// }

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
    // 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    // await page.setUserAgent(userAgent);
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://r-world.netlify.app/resume/cool',{waitUntil: 'networkidle0'});
    // await page.waitForFunction(imagesHaveLoaded, { timeout: 5000 });
    await page.pdf({path: 'resume.pdf', format: 'A4'});

  await browser.close();
})();
