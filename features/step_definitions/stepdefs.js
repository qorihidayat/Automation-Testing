const {By, Builder, Browser, Key} = require('selenium-webdriver');
const debug = require('debug')('app:stepdefs');
const elements = require('../elementPage/Const');
const {sleep, scrollAndClickElement, getDigit, verifyValue, waitLoadPage, formatRupiah} = require('../elementPage/BaseFunctions');
const { Given, When, Then, AfterAll, BeforeAll } = require('@cucumber/cucumber');

let driver;

BeforeAll(async function(){
     driver = await new Builder().forBrowser(Browser.CHROME).build();
     driver.manage().window().maximize();
     debug('debug');
});

  Given('go to ebay page',{timeout: 60 * 1000}, async function () {
    await driver.get('http://www.ebay.com');
  });

  When('Navigate to Search by category > Electronics > Cell Phones & accessories',{timeout: 60 * 1000}, async function () {
    await driver.findElement(By.id(elements.id.btnShopByCategory)).click();
    await driver.findElement(By.xpath(elements.xpath.textContains.replace("?", "Cell phones & accessories"))).click();
  });


  Then('click Cell Phones & smarthphone',{timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath(elements.xpath.textContains.replace("?", "Cell Phones & Smartphones"))).click();    
  });

  Then('click all filter',{timeout: 60 * 1000}, async function () {
    let element = await driver.findElement(By.xpath(elements.xpath.btnAllFilter));
    await driver.executeScript("arguments[0].scrollIntoView();", element);
    await element.click();
    await sleep(2000);
 });

  Then('add filter {string} = {string},  {string} = {string} until {string}, {string} = {string}',{timeout: 60 * 1000}, async function (filter1, conditionValue, filter2, minPrice, maxPrice, filter3, locationValue) {
    //why am I use so many arguments?? because so the scenario can be edited/editable
    this.conditionValue = conditionValue;
    this.priceFrom = minPrice;
    this.priceTo = maxPrice;
    this.location = locationValue;
    //i used the xpath replace for all element reuseable and efficient
    await scrollAndClickElement(driver, By.xpath(elements.xpath.idContains.replace("?", "mainPanel-" + filter1)));
    await scrollAndClickElement(driver, By.xpath(elements.xpath.textContains.replace("?", conditionValue)+"/parent::*/preceding-sibling::*/input"));
    await scrollAndClickElement(driver, By.xpath(elements.xpath.idContains.replace("?", "mainPanel-" + filter2)));
    let textRangeFrom = By.xpath(elements.xpath.classContains.replace("?", "x-textrange__input--from"));
    let textRangeTo = By.xpath(elements.xpath.classContains.replace("?", "x-textrange__input--to"));
    await scrollAndClickElement(driver, textRangeFrom);
    //i used window fullscreen becouse if not, the website cant display element (bug in website)
    await driver.manage().window().fullscreen();
    await driver.findElement(textRangeFrom).sendKeys(this.priceFrom);
    await scrollAndClickElement(driver, textRangeTo);
    await driver.findElement(textRangeTo).sendKeys(this.priceTo);
    await driver.findElement(By.xpath(elements.xpath.idContains.replace("?", "mainPanel-" + filter3))).click();
    await driver.findElement(By.xpath(elements.xpath.radioLocation.replace("?", this.location))).click();
  });

  Then('click apply',{timeout: 60 * 1000}, async function () {
    await driver.findElement(By.xpath(elements.xpath.allFilter_btnApply)).click();
  });

  Then('verify all filters applied',{timeout: 60 * 1000}, async function () {
    await driver.manage().window().maximize();
    let itemsPrice = await driver.findElements(By.xpath(elements.xpath.itemPrice));
    //i loop for verify all text element for efficient script
    let arrPrice = [];
    for (let i = 0; i < itemsPrice.length; i++) {
      arrPrice.push(await itemsPrice[i].getText());
    }
    arrPrice.forEach((e)=>{
      let splitDot = e.split(".")[0];
      let actualElement = getDigit(splitDot);
      if (actualElement == "") {
        return;
      }
      //i will compare this elements with range priceFrom - priceTO = actualElement
      if (parseInt(actualElement) >= this.priceFrom && parseInt(actualElement) <= this.priceTo ) {
        console.log("--------------ASSERT TRUE-------------- \n Compare : " + formatRupiah(this.priceFrom) + " - " + formatRupiah(this.priceTo) + "\n Actual : " + formatRupiah(actualElement));
      }else{
        console.log("--------------ASSERT FALSE-------------- \n Compare : " + formatRupiah(this.priceFrom) + " - " + formatRupiah(this.priceTo) + "\n Actual : " + formatRupiah(actualElement));
      }
    });

    await driver.findElement(By.xpath(elements.xpath.btnFilterApplies)).click();
    const verifyCondition = await driver.findElement(By.xpath(elements.xpath.subFilterApplies.replace("?", "Condition"))).getText();
    const verifyPrice = await driver.findElement(By.xpath(elements.xpath.subFilterApplies.replace("?", "Price"))).getText();
    const verifyLocation = await driver.findElement(By.xpath(elements.xpath.subFilterApplies.replace("?", "Location"))).getText();
    const actualCondition = verifyCondition.replace("filter applied", "").split(":")[1].trim();
    const actualPriceFrom = verifyPrice.replace("filter applied", "").split("$")[1].split(".")[0];
    const actualPriceTo = verifyPrice.replace("filter applied", "").split("$")[2].split(".")[0];
    const actualLocation = verifyLocation.replace("filter applied", "").split(":")[1].trim();

    verifyValue(actualCondition, this.conditionValue);
    verifyValue(formatRupiah(getDigit(actualPriceFrom)), formatRupiah(this.priceFrom));
    verifyValue(formatRupiah(getDigit(actualPriceTo)), formatRupiah(this.priceTo));
    verifyValue(actualLocation, this.location);
  });


    When('search according to keyword {string}',{timeout: 60 * 1000}, async function (string) {
      this.keyword = string;
      await driver.findElement(By.id(elements.id.inputSearch)).sendKeys(string);
    });

    Then('change category {string}',{timeout: 60 * 1000}, async function (string) {
      await driver.findElement(By.xpath(elements.xpath.textContains.replace("?", string))).click();
    });

    Then('click search',{timeout: 60 * 1000}, async function () {
      await driver.findElement(By.id(elements.id.inputSearch)).sendKeys(Key.ENTER);
    });

    Then('verify that the page loads completely',{timeout: 60 * 1000}, async function () {
      //verify loading page with LoadPage, if cant load this script will be to catch
      try{
        waitLoadPage(driver, 1000);
        console.log("---------------LOADING COMPLETE-------------");
      }catch(e){
        console.log("---------------LOADING NOT COMPLETE-------------");
      }
        
    });

    Then('verify that the first result name matches with the search string',{timeout: 60 * 1000}, async function () {
      //i verify all title name matches with the keyword
      const itemTitle = await driver.findElements(By.xpath(elements.xpath.classContains.replace("?", "item__title")+"/span"));
      const arrItemTitle = [];
      for (let i = 0; i < itemTitle.length; i++) {
        arrItemTitle.push(await itemTitle[i].getText());
      }
      arrItemTitle.forEach((ele)=>{
        const elementLowerCase = ele.toLowerCase();
        const keywordLowerCase = this.keyword.toLowerCase();
        if (elementLowerCase == "") {
          return;
        }
        if (elementLowerCase.includes(keywordLowerCase)) {
          console.log("--------------ASSERT TRUE-------------- \n Compare includes : " + keywordLowerCase + "\n Actual : " + elementLowerCase);
        }else{
          console.log("--------------ASSERT FALSE-------------- \n Compare includes : " + keywordLowerCase + "\n Actual : " + elementLowerCase);
        }
      });
    });

  AfterAll(async function(){
    await driver.quit();
});


