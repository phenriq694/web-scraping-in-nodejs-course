const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://indeed.com/q-Web-Developer-l-United-States-jobs.html';
const scrapeResult = {};
const scrapeResults = [];

async function main() {
  try {
    const htmlResult = await request.get(url);
    const $ = cheerio.load(htmlResult);

    $(".jobsearch-SerpJobCard").each((index, element) => {
      const resultTitle = $(element).children(".title");
      const title = resultTitle.text().trim();
      const jobUrl = resultTitle.children(".jobtitle").attr("href");

      const scrapeResult = { title, url };
      scrapeResults.push(scrapeResult);
    });

    console.log(scrapeResults);
  } catch (err) {
    console.error(err);
  }
}

main()