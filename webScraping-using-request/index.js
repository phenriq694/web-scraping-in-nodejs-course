const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://indeed.com/q-Web-Developer-l-United-States-jobs.html';
const jobSummaray = {};
const jobSummaries = [];

async function scrapeJobSummay () {
  try {
    const htmlResult = await request.get(url);
    const $ = cheerio.load(htmlResult);

    $(".jobsearch-SerpJobCard").each((index, element) => {
      const resultTitle = $(element).children(".title");
      const title = resultTitle.text().trim();
      const jobUrl = "https://www.indeed.com" + resultTitle.children(".jobtitle").attr("href");
      const datePosted = $(element).find(".date ").text();
      const location = $(element).find(".location").text();

      const jobSummaray = { title, jobUrl, datePosted, location };
      jobSummaries.push(jobSummaray);
    });

    return jobSummaries
  } catch (err) {
    console.error(err);
  }
}

async function scrapeJobDescription(jobSummaries) {
  jobSummaries.map(async job => {
    const htmlResult = await request.get(job.url);
    const $ = await cheerio.load(htmlResult);

    $("#jobDescriptionText").each((index, element) => {
      job.description = $(element).find("p").text();
    });
  }
}

async function main() {
  const jobSumaries = await scrapeJobSummay();
  console.log(jobSumaries)
}

main()