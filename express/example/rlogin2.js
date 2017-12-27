/*
'#rlogin-username-ja'
'#rlogin-password-ja'
'body > div.rf-form-login.rf-red > main > div > section.rf-form-login--step-1 > form > p:nth-child(7) > button'

$ 
npm i --save puppeteer
*/
'use strict';

const puppeteer = require('puppeteer');
const devices = require('./DeviceDescriptors');

const debug = require('debug')('puppeteer');

let CREDS1 = require('./cred2');// load IPASS
let CREDS = CREDS1.test; // アカウント切り替え
// let CREDS = CREDS1.kuroko; // アカウント切り替え
const chromeGuiFlg = false;// NoGUI:true GUI:false
const chromeGuiFlg = true;// NoGUI:true GUI:false
const slowMotion = 20;// GUI時に早すぎる動きを遅くする、大きいほど遅く


/* //////////////////////////////////
async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/login');
  await page.screenshot({ path: 'screenshots/github.png' });
  browser.close();
}
run();
/*////////////////////////////// .  */

/*/////////////////////////////*/

async function run() {
  // dom element selectors
  const USERNAME_SELECTOR = '#rlogin-username-ja';
  const PASSWORD_SELECTOR = '#rlogin-password-ja';
  const BUTTON_SELECTOR   = 
  'body > div.rf-form-login.rf-navy > main > div > section.rf-form-login--step-1 > form > p:nth-child(6) > button';

  const USERNAME_SELECTOR2 = '#rlogin-username-2-ja';
  const PASSWORD_SELECTOR2 = '#rlogin-password-2-ja';
  const BUTTON_SELECTOR2   = 
  'body > div > main > div > section.rf-form-login--step-2 > form > p:nth-child(8) > button';

  const BUTTON_SELECTOR3   =  '#message-ja > section > div > div > div > div > button';
  // 'body > div.rf-form-login.rf-red > main > div > section.rf-form-login--step-1 > form > p:nth-child(7) > button';
  // 'body > div.rf-form-login.rf-navy > main > div > section.rf-form-login--step-1 > form > p:nth-child(6) > button'
  const LOGIN_URL         = 'https://glogin.rms.rakuten.co.jp/' ;
  const LOGIN_URL2        = 'https://mainmenu.rms.rakuten.co.jp/' ;

  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({
    headless: chromeGuiFlg,
    slowMo: slowMotion // slow down by 250ms
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 400, height: 800 }); // view portの指定
  // await page.emulate(devices['iPhone 6']);
  
  await page.goto(LOGIN_URL);
  await page.screenshot({ path: 'screenshots/login.png' });
  // 1st
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(CREDS.username);

  await page.keyboard.down('Shift');
  for (let i = 0; i < ' World'.length; i++)
    await page.keyboard.press('ArrowLeft');
  await page.keyboard.up('Shift');
  await page.keyboard.down('Tab');
  
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(CREDS.password);
  await page.click(BUTTON_SELECTOR);
  await page.screenshot({ path: 'screenshots/login1.png' });
  
  // await page.waitForNavigation();
  await page.screenshot({ path: 'screenshots/afterLogin.png' });
  // 2nd
  await page.click(USERNAME_SELECTOR2);
  await page.keyboard.type(CREDS.username2);

  await page.click(PASSWORD_SELECTOR2);
  await page.keyboard.type(CREDS.password2);
  await page.click(BUTTON_SELECTOR2);
  await page.screenshot({ path: 'screenshots/login2.png' });

  await page.waitFor(1000);
  
  await setTimeout(() => {
    // await page.click(BUTTON_SELECTOR3);
    page.click(BUTTON_SELECTOR3);
  }, 1000);
  // body > main > div > div.rf-grid.rf-grid--1--1--2.rf-service-top-page-grid > dl:nth-child(2) > dd > a
  // await page.goto(LOGIN_URL2);
  // body > main > div > div.rf-grid.rf-grid--1--1--2.rf-service-top-page-grid > dl:nth-child(2) > dd > a
  // await page.click('a[href="https://mainmenu.rms.rakuten.co.jp/?act=login&sp_id=1"]');
  // await page.click('body > main > div > div.rf-grid.rf-grid--1--1--2.rf-service-top-page-grid > dl:nth-child(2) > dd > a');
  await setTimeout(() => {
    // page.click('body > main > div > div.rf-grid.rf-grid--1--1--2.rf-service-top-page-grid > dl:nth-child(2) > dd > a');
  }, 1000);
  // const xpathUrl = '/html/body/main/div/div[3]/dl[2]/dd/a';
  // await page.click(xpath(page, '/html/body/main/div/div[3]/dl[2]/dd/a'));
  
  /* <a class="rf-medium" href="https://mainmenu.rms.rakuten.co.jp/?act=login&amp;sp_id=1">ＲＭＳ<span class="rf-icon rf-icon-chevron-right"></span></a> */
  await page.waitFor(3000);

  for (let i = 0; i < 8; i++){
    await page.waitFor(500);
    await page.keyboard.press('Tab');
  }

  await page.waitFor(1000);
  await page.keyboard.press('Enter');
  // await page.keyboard.press('Space');

  const SUBMIT= 'body > form > table:nth-child(4) > tbody > tr > td > input[type="submit"]';
  await page.waitFor(1000);
  for (let i = 0; i < 5; i++){
    await page.waitFor(500);
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Space');
  
  // await page.click(SUBMIT);
  
  await page.waitFor(1000);
  const ITEM_UPDATE = 'https://mainmenu.rms.rakuten.co.jp/?left_navi=11';
  await page.goto(ITEM_UPDATE);

  await page.waitFor(1000);
  // const ITEM_UPDATE1 = 'https://item.rms.rakuten.co.jp/rms/mall/rsf/item/vc?__event=RI00_001_002&shop_bid=320124';
  const ITEM_UPDATE1 = 'https://item.rms.rakuten.co.jp/rms/mall/rsf/item/vc?__event=RI00_001_002&shop_bid=' + CREDS.shop_bid ;
  await page.goto(ITEM_UPDATE1);

  await page.waitFor(1000);
  const ITEM_UPDATE2 = '#r_07';
  // const ITEM_UPDATE1 = 'body > form > table > tbody > tr > td:nth-child(2) > table:nth-child(4) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(17) > td:nth-child(2) > font > b > label';
  await page.click(ITEM_UPDATE2);

  // await page.waitFor(1000);
  // // const ITEM_UPDATE3 = 'body > form > table > tbody > tr > td:nth-child(2) > table:nth-child(11) > tbody > tr > td > input[type="submit"]';
  // const ITEM_UPDATE3 = 'input[type="submit"]';
  // await page.click(ITEM_UPDATE3);
  for (let i = 0; i < 3; i++){
    await page.waitFor(500);
    await page.keyboard.press('Tab');
  }
  await page.keyboard.press('Space');



  // const ITEM_UPDATE = '#subNav > li:nth-child(1) > ul > li.first > a';
  // await page.click(ITEM_UPDATE);
  await page.waitFor(2000);
  
  await page.screenshot({ path: 'screenshots/finish.png' });
  // const [handle1, handle2] = await xpath(page, '/html/body/main/div/div[3]/dl[2]/dd/a');
  // console.log(await page.click(e => e.textContent, handle1));
  // console.log(await page.evaluate(e => e.textContent, handle1));
  // console.log(await page.evaluate(e => e.textContent, handle2));
  
  

  // await page.waitForNavigation();
  await browser.close();
  
}
run();

/*/////////////////////////////////////*/

async function xpath(page, path) {
  const resultsHandle = await page.evaluateHandle(path => {
    let results = [];
    let query = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i=0, length = query.snapshotLength; i < length; ++i) {
      results.push(query.snapshotItem(i));
    }
    return results;
  }, path);
  const properties = await resultsHandle.getProperties();
  const result = [];
  const releasePromises = [];
  for (const property of properties.values()) {
    const element = property.asElement();
    if (element)
      result.push(element);
    else
      releasePromises.push(property.dispose());
  }
  await Promise.all(releasePromises);
  return result;
}
