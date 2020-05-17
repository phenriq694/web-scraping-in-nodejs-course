const request = require("request-promise");
const cheerio = require("cheerio");

async function scrape() {
  for (let index = 1; index <= 10; index++) {
    const html = await request.get(
      {
        url: `https://www.amazon.com/s?k=macbook&i=computers-intl-ship&page=${index}&qid=1589743643&ref=sr_pg_${index}`, 
        gzip: true
      }
      );

    const $ = await cheerio.load(html);

    $("#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span > div > div > div > span > div > div > div > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div > div > div > div > h2 > a > span")
      .each((index, element) => { 
        console.log("/'" + $(element).text() + "/'");
      });

    console.log("At page number " + index);
  }
}

scrape();