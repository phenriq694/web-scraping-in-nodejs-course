const request = require("request-promise");
const fs = require("fs");

async function getHmtl(url) {
  const html = await request.get(url);
  return html;
}

function saveHtmlFile(html) {
  fs.writeFileSync("./test.html", html);
}

async function main() {
  const html = await getHmtl("https://en.wikipedia.org/wiki/Main_Page");
  saveHtmlFile(html);
}

main();
