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

  const listSelector = 'div.mod';
  const spanSelector = 'div[role] > span > span';
  const searchResult = await page.$eval(spanSelector, (object) => object.innerText);

  // TODO: implement detection of listSelector or spanSelector

  // const searchResult = await page.evaluate(() => {
  //   return document.querySelector(spanSelector).innerText;
  // });

  await browser.close();
  return searchResult;
}
