const puppeteer = require('puppeteer');
const ilovepdfSDK = require('ilovepdf-sdk');

// function imagesHaveLoaded() {
//     return Array.from(document.images).every((i) => i.complete);
// }

(async () => {
    const browser = await puppeteer.launch();
    console.log("launching puppeteer...");
    const page = await browser.newPage();
    // const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
    // 'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    // await page.setUserAgent(userAgent);
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://r-world.netlify.app/resume/cool',{waitUntil: 'networkidle0'});
    // await page.waitForFunction(imagesHaveLoaded, { timeout: 5000 });
    await page.pdf({path: 'resume.pdf', format: 'A4'});
    console.log("Finished exporting");

    if (process.env.PUBLIC_KEY && process.env.SECRET_KEY ) {
      const sdk = new ilovepdfSDK(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
      const task = await sdk.createTask('compress');
      console.log('compressing ...');
      await task.addFile("./resume.pdf");
      await task.process();
      console.log('Finished compressing.');
      await task.download("./resume.pdf");
      console.log('Finished downloading.');
    }

  await browser.close();
})();
