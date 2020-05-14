const parser = require("../parser");
const fs = require("fs");
let html;
let categories;

beforeAll(() => {
  html = fs.readFileSync("./test.html");
  categories = parser.categories(html);
});

it("should give the correct number of categories", () => {
  expect(categories.length.toBe(9));
});

it("should get correct title", () => {
  expect(categories[0].title).toBe("Arts");
});

it("should get correct url", () => {
  expect(categories[0].url).toBe("https://en.wikipedia.org/wiki/Portal:Arts");
});
