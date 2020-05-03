#  Scraping software jobs on Craigslist using Puppeteer 

In this project, we use the 'pupperteer' package to get information from a list of elements on a website. 
After getting all the data, we also saved it in a MongoDB data base, using the 'mongoose' package.

## Packages:
- pupperteer;
- cheerio;
- mongoose; 

## Database:
- MongoDB;

## Tools:
- MongoDB Compass;

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.21.1][yarn] or higher installed on your computer. From your command line:

```bash
# Configure a Docker MongoDB instance
docker run --name craigslistWebScraper -p 27017:27017 -d -t mongo

# Clone this repository
$ git clone https://github.com/phenriq694/web-scraping-in-nodejs-course.git

# Go into the repository
$ cd web-scraping-in-nodejs-course/craigslistWebScrapper

# Install dependencies
$ yarn

# Start application
$ node index.js
```

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/