const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

async function connectToMongoDB() {
  await mongoose.connect("mongodb://localhost:27017/craigslistWebScraper", {
    useNewUrlParser: true, 
    useFindAndModify: true, 
  });
  
  console.log('Connected to MongoDB');
}

async function scrapeListings(page) {
  await page.goto("https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof");
  
  const html = await page.content();
  const $ = cheerio.load(html);
  
  const listings = $(".result-info").map((index, element) => {
    const titleElement = $(element).find(".result-title");
    const timeElement = $(element).find(".result-date");
    const hoodElement = $(element).find(".result-hood");

    const title = $(titleElement).text();
    const url = $(titleElement).attr("href");
    const datePosted = new Date($(timeElement).attr("datetime"));
    const neignborhood = $(hoodElement).text().trim().replace("(", "").replace(")", "");

    return { title, url, datePosted, neignborhood };
  }).get();

  return listings;
}

async function scrapteJobDescriptions(listings, page) {
  for(var i = 0; i < listings.length; i++) {
    await page.goto(listings[i].url);

    const html = await page.content();
    const $ = cheerio.load(html);

    const jobDescription = $("#postingbody").text();
    const compensation = $("p.attrgroup > span:nth-child(1) > b").text();

    listings[i].jobDescription = jobDescription;
    listings[i].compensation = compensation;

    console.log(listings[i].compensation)
    await sleep(1000) // 1 second sleep
  }
}

async function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function main() {
  await connectToMongoDB();

  const browser = await puppeteer.launch({ headless: false }); 
  const page = await browser.newPage();

  const listings = await scrapeListings(page);
  const listingsWithJobDescriptions = await scrapteJobDescriptions(listings, page);
  console.log(listings);
}

main()