const cheerio = require("cheerio");

exports.categories = html => {
  const $ = cheerio.load(html);

  return $("#mp-topbanner > ul > li")
    .map((index, element) => {
      const titleElement = $(element).find("a");
      const title = titleElement.text();
      const url = titleElement.attr("href");

      return { title, url };
    }).get();
}