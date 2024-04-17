const fs = require("fs");

const { fetchCompanies } = require("./fetchCompanies");
const { fetchCompaniesDetails } = require("./fetchCompanyDetails");
const { addCompaniesToDB } = require("./addCompaniesToDB");

// const domain = "https://www.companydetails.in";
// const registeredCompaniesUrl = `${domain}/latest-registered-company-mca`;

(async () => {
  try {
    const companies = await fetchCompanies();
    const companiesDetails = await fetchCompaniesDetails(companies);
    console.log(companiesDetails);

    console.log("Companies details fetched successfully!");

    // const stringify = JSON.stringify(companiesDetails);

    // fs.writeFile("data.json", stringify, "utf8", (e) => {
    //   console.log("Error writing to file:", e);
    // });

    for (let i = 0; i < companiesDetails.length; i++) {
      await addCompaniesToDB(companiesDetails[i]);
    }

    console.log("Scraping completed successfully!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
