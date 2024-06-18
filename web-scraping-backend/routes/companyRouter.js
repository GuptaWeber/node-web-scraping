const router = require("express").Router();
const {
  getCompanies,
  addCompaniesToDb,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
} = require("../controllers/companyController");

const {
  getCompaniesFromElastic,
  deleteCompanyByIdFromElastic,
} = require("../elastic-search-service/elasticController");

router.route("/").get(getCompaniesFromElastic).post(addCompaniesToDb);

router
  .route("/:id")
  .get(getCompanyById)
  .patch(updateCompanyById)
  .delete(deleteCompanyByIdFromElastic);

module.exports = router;
