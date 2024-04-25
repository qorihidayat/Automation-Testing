const assert = require('assert');



//-------------------------This page for main function collection---------------------
//why am i make this??? because so this function can be used everywhere

const sleep = async(ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const scrollAndClickElement = async(driver, locator) => {
        await driver.manage().setTimeouts({ implicit: 5000 });
        let element = await driver.findElement(locator);
        await driver.executeScript("arguments[0].scrollIntoView();", element);
        await element.click();
}

const scrollAndClickElements = async(driver, locator, arg) => {
    await driver.manage().setTimeouts({ implicit: 5000 });
    let elements = await driver.findElements(locator);
    await driver.executeScript("arguments[0].scrollIntoView();", elements[arg]);
    await elements[arg].click();
}

const waitLoadPage = async(driver, times) => {
    await driver.manage().setTimeouts({implicit: times});
    await driver.executeScript("return document.readyState === 'complete'");
}

const verifyValue = (actual, value) => {
    try{
        assert.equal(actual, value);
        console.log("--------------ASSERT TRUE-------------- \n Compare : " + value + "\n Actual : " + actual);
      }catch(e){
        console.log("--------------ASSERT FALSE-------------- \n Compare : " + value + "\n Actual : " + actualCondition);
      }
}

function formatRupiah(amount) {
    let formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });

    let formattedAmount = formatter.format(amount);

    return formattedAmount;
}


function getDigit(inputString) {
    const digitPattern = /\d/g;
    const digitsArray = inputString.match(digitPattern);
    const digitsString = digitsArray ? digitsArray.join('') : '';
    return digitsString;
}

module.exports = {sleep, scrollAndClickElement, scrollAndClickElements, getDigit, verifyValue, waitLoadPage, formatRupiah};