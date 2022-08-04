const portfinder = require('portfinder');
const puppeteer = require('puppeteer');

const app = require('../meadowlark.js');

let server = null;
let port = null;

beforeEach(async () => { // jest - 각 테스트 수행 전 호출
    port = await portfinder.getPortPromise();
    server = app.listen(port);
});

afterEach(() => { // jest - 각 테스트 수행 후 호출
    server.close();
});

test('home page links to about page', async () => {
    const browser = await puppeteer.launch(); // Headless 모드
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}`);
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]'),
    ]);
    expect(page.url()).toBe(`http://localhost:${port}/about`);
    await browser.close();
});

// run test : npm test integration-tests/basic-navigation.test.js --coverage 