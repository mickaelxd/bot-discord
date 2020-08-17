import * as puppeteer from 'puppeteer';

export default async function searchOnGoogle(searchObject: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com', {
    waitUntil: 'networkidle0',
  });
  await page.type('input[role=combobox]', searchObject);

  await Promise.all([
    page.evaluate(() => {
      document.querySelector('center > input').click();
    }),
    page.waitForNavigation({
      waitUntil: 'networkidle0',
    }),
  ]);

  const searchResult = await page.evaluate(() => {
    const spanSelector = 'div[role] > span > span';
    const listSelector = 'div.mod';

    return document.querySelector(spanSelector).innerHTML;

    // if (document.querySelector(spanSelector).innerText === '' || null) {
    //   return document.querySelector(listSelector).innerText;
    // }

    // if (document.querySelector(listSelector).innerText === '' || null) {
    //   return document.querySelector(spanSelector).innerText;
    // }
  });

  await browser.close();
  return searchResult;
}
