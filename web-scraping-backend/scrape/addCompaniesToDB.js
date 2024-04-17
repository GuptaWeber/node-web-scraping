const axios = require("axios");

exports.addCompaniesToDB = async (company) => {
  try {
    await axios.post("http://localhost:5001/companies", { ...company });
    console.log("Companies added successfully.");
  } catch (error) {
    console.log("Error while adding companies.", error);
  }
};
