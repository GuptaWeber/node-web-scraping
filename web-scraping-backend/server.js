const app = require("./app");
const dotenv = require("dotenv");
const { sequelize } = require("./database/sequelize.config");
const {
  setupElasticSearch,
} = require("./elastic-search-service/elastic.config");
dotenv.config();

const PORT = process.env.PORT || 5001;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

//setup elastic

exports.companiesIndex = "companies-index";

setupElasticSearch(this.companiesIndex).then(() => {
  console.log("Elastic search setup complete");
});
