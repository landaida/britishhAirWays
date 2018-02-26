let puppeteer = require('puppeteer')
let url = 'https://www.britishairways.com'
const jsdom = require("jsdom")
const dom = new jsdom.JSDOM(`<!DOCTYPE html>`)
const $ = require("jquery")(dom.window);

(async function run(){
    let browser = await puppeteer.launch({headless:false})
    let page = await browser.newPage()
    await page
    .goto(url, {timeout:60000})
    await page
    .waitFor(500)
    await page
    .evaluate(()=>{
        $('#countrycode').val('US')
    })
    await page
    .waitFor(500)
    await page
    .click('button[type=submit].cookieModalButton')
    await page
    .waitFor('.hotelsTab')
    await page
    .click('.hotelsTab')
    await page
    .waitFor('#planTripHotelDestination')
    await page
    .type('#planTripHotelDestination', 'DUB')
    await page
    .waitFor('#destChoices')
    await page
    .waitFor('#CITY_DXB_AE')
    await page
    .waitFor(500)
    await page
    .click('#CITY_DXB_AE')
    await page
    .waitFor(500)
    await page
    .type('#checkInGO', '02/26/18')
    await page
    .waitFor(250)
    await page
    .evaluate(()=>{
        $('#ui-datepicker-div').remove()
    })
    await page
    .waitFor(250)
    await page
    .type('#checkOutGO', '02/28/18')
    await page
    .waitFor(250)
    await page
    .evaluate(()=>{
        $('#ui-datepicker-div').hide()
    })
    await page
    .waitFor(250)
    await page
    .click('#hotelSearchButton')
    await page
    .waitFor('.searchPagePackages820')

    let data = await page
    .evaluate(()=>{
        return document.querySelector('#searchPagePackages').innerHTML
    })
    
    
    let $html = $('<div/>').html(data)
    
    let $list = $html.find('.packageDiv820')
    
    await browser.close()
    
    $list.each((i, item) => {
        console.log($(item).find('.underline').text())
        console.log($(item).find('#totalPricePackLinkBA').text())
    });
    
})()
