const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

async function selectAndPrintOneElement() {
  const html = await request.get(
    "https://reactnativetutorial.net/css-selectors"
  ); 

  fs.writeFileSync("./test.html", html);
  
  const $ = await cheerio.load(html);
  const theText = $("h1").text();
  console.log(theText);
}

async function selectAndPrintMultipleElements() {
  const html = await request.get(
    "https://reactnativetutorial.net/css-selectors/lesson2.html"
  ); 

  fs.writeFileSync("./test2.html", html);
  
  const $ = await cheerio.load(html);
  $("h2").each((index, element) => console.log($(element).text()));
}

async function main() {
  // Output: Simple select of HTML element
  await selectAndPrintOneElement();

  /** 
   * Output:
   * I'm a h2 element
   * I'm also a h2 element
   * I'm a h2 element too!
  */
  selectAndPrintMultipleElements();
}

main()