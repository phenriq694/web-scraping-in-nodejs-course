const request = require("request-promise");
const cheerio = require("cheerio");

async function main() {
  const result = await request.get(
    "https://www.codingwithstefan.com/table-example"
  );

  const $ = cheerio.load(result);

  // $("body > table > tbody > tr > td").each((index, element) => {
  //   console.log($(element).text());
  // });

  // Selecting all table rows
  $("body > table > tbody > tr").each((index, element) => {
    // Selecting all row cells
    const tds = $(element).find("td"); 

    // Selecting the first cell data from the row
    const company = $(tds[0]).text();
    console.log(company);
  });
}

main();