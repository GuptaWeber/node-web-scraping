const axios = require("axios");

exports.addCompaniesToDB = async (company) => {
  try {
    await axios.post("http://localhost:5001/clients", { ...company });
    console.log("Client added successfully.");
  } catch (error) {
    console.log("Error while adding clients.", error);
  }
};
