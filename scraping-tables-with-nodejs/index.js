const request = require("request-promise");
const cheerio = require("cheerio");

async function main() {
  const result = await request.get(
    "https://www.codingwithstefan.com/table-example"
  );

  const $ = cheerio.load(result);
  const scrapedRows = [];
  // $("body > table > tbody > tr > td").each((index, element) => {
  //   console.log($(element).text());
  // });

  // Selecting all table rows
  $("body > table > tbody > tr").each((index, element) => {
    // Avoind the first row 
    if (index === 0) return true; 
    
    // Selecting all row cells
    const tds = $(element).find("td"); 

    // Selecting the first cell data from the row
    const company = $(tds[0]).text();

    const contact = $(tds[1]).text();
    const country = $(tds[2]).text();

    const scrapedRow = { company, contact, country };
    scrapedRows.push(scrapedRow);
  });

  console.log(scrapedRows);
}

main();