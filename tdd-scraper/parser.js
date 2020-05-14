const cheerio = require("cheerio");

exports.categories = html => {
  const $ = cheerio.load(html);

  return $("#mp-topbanner > ul > li")
    .map((index, element) => {
      const title = $(element)
        .find("a")
        .text();

      return { title };
    }).get();
}