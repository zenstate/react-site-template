/* eslint no-console: "off" */

import puppeteer from 'puppeteer';
import puppeteerConfig from '../helpers/puppeteerConfigLoader';

describe('0000 - Canary', () => {
    let browser;
    // eslint-disable-next-line no-unused-vars
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch(puppeteerConfig);
        const context = await browser.createIncognitoBrowserContext();
        page = await context.newPage();
    }, 30000);

    afterAll(() => {
        browser.close();
    });

    it('should run', async () => {
        expect(true).toBeTruthy();
    });

    afterAll(async () => {
        await browser.close();
    }, 5000);
});