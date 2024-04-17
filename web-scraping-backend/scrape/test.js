const axios = require("axios");
const cheerio = require("cheerio");

const domain = "https://www.companydetails.in";
const registeredCompaniesUrl = `${domain}/latest-registered-company-mca`;

axios(registeredCompaniesUrl)
  .then(async (response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const companies = [];

    console.log("Fetching companies data...");

    $(".col-10", html).each(function () {
      const title = $(this).find("h3").text();
      const anchor = $(this).find("a").attr("href");

      companies.push({ title, anchor });
    });

    console.log(
      `Fetched ${companies.length} companies. Fetching company details...`
    );

    const companiesDetails = [];
    const failedEntries = [];

    companies.forEach(async (company) => {
      try {
        const response = await axios(`${domain}${company.anchor}`);
        const html = response.data;
        const $ = cheerio.load(html);

        const companyDetailsElement = $("#basicdetails");
        const companyDetails = {};
        companyDetailsElement.find(".bg-white").each(function () {
          const key = $(this).find("a").text();
          const value = $(this).find("h6").text().trim();

          companyDetails[key.trim()] = value.trim();
        });

        companiesDetails.push({
          cin: companyDetails["CIN"],
          companyName: companyDetails["Company Name"],
          pin: companyDetails["PIN Code"],
          email: companyDetails["Email"],
          address: companyDetails["Address"],
        });

        console.log(
          `Successfully fetched details for ${companiesDetails.length} companies.`
        );
        console.log(
          `Failed to fetch details for ${failedEntries.length} companies.`
        );
      } catch (e) {
        failedEntries.push(company);
        console.log(e);
      }
    });

    console.log("Fetching clients data completed.");

    const addCompaniesToDb = async (companies) => {
      try {
        await axios.post("http://localhost:5001/clients", { companies });
        console.log("Clients added successfully.");
      } catch (error) {
        console.log("Error while adding companies.", error);
      }
    };

    addCompaniesToDb(companiesDetails);
  })
  .catch((e) => {
    console.log(`Failed to fetch companies data. Error: ${e}`);
  });
