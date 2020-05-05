const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://indeed.com/q-Web-Developer-l-United-States-jobs.html';

async function scrapeCraigslist() {
  try {
    const htmlResult = await request.get(url);
    const $ = cheerio.load(htmlResult);
  } catch (err) {
    console.error(err);
  }
}

scrapeCraigslist()