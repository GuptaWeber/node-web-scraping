const axios = require("axios");
const cheerio = require("cheerio");
const { registeredCompaniesUrl } = require("./values");

exports.fetchCompanies = async () => {
  try {
    const response = await axios(registeredCompaniesUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    const companies = [];

    $(".col-10", html).each(function () {
      const title = $(this).find("h3").text();
      const anchor = $(this).find("a").attr("href");

      companies.push({ title, anchor });
    });

    return companies;
  } catch (e) {
    console.log(`Failed to fetch companies data. Error: ${e}`);
  }
};
