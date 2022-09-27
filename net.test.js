const { expect } = require("chai");
const { clickElement, getText } = require("./lib/commands.js");
const daysWeek = require("./lib/util.js");


let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
    page.close();
});

describe("Booking tickets", () => {
    beforeEach(async () => {
        await page.goto("http://qamid.tmweb.ru/client/index.php", {
            timeout: 60000,
        });
        await clickElement(page, daysWeek.thirdDay);
    });


    test("Should book one seat", async () => {
        await clickElement(page, "[data-seance-start='1140']");
        await clickElement(page, ".buying-scheme__wrapper > div:nth-child(1) > span:nth-child(1)");
        await clickElement(page, ".acceptin-button");

        const actual = await getText(page, "h2.ticket__check-title");
        expect(actual).contain("Вы выбрали билеты:");
    }, 60000);

    test("Should book one VIP seat", async () => {
        await clickElement(page, "[data-seance-start='840']");
        await clickElement(page, ".buying-scheme__wrapper > div:nth-child(1) > span:nth-child(2)");
        await clickElement(page, ".acceptin-button");

        const actual = await getText(page, "h2.ticket__check-title");
        expect(actual).contain("Вы выбрали билеты:");
    }, 60000);


    test("Should don't booking seat", async () => {
        await clickElement(page, "[data-seance-id='129']");

        const isDisabled = await page.$eval("button", (button) => button.disabled);
        expect(isDisabled).to.equal(true);
    }, 60000);
});