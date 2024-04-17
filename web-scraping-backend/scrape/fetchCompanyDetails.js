const axios = require("axios");
const cheerio = require("cheerio");
const { domain } = require("./values");

exports.fetchCompaniesDetails = async (companies) => {
  const companiesDetails = [];
  const failedEntries = [];

  try {
    await Promise.all(
      companies.map(async (company) => {
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

          const comp = {
            cin: companyDetails["CIN"],
            companyName: companyDetails["Company Name"],
            pinCode: companyDetails["PIN Code"],
            email: companyDetails["Email"],
            address: companyDetails["Address"],
          };

          // await axios.post("http://localhost:5001/companies", {
          //   companies: [comp],
          // });

          companiesDetails.push(comp);
          console.log(
            `Successfully fetched details for ${companiesDetails.length} companies.`
          );
        } catch (e) {
          console.log(`Failed to fetch company details. Error: ${e}`);
          failedEntries.push(company);
        }
      })
    );
  } catch (err) {
    console.error("Error fetching companies details:", err);
  }

  console.log(`Failed to fetch details for ${failedEntries.length} companies.`);
  console.log("RETURNING");

  return companiesDetails;
};
