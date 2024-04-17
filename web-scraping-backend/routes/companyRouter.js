const router = require("express").Router();
const {
  getCompanies,
  addCompaniesToDb,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
} = require("../controllers/companyController");

router.route("/").get(getCompanies).post(addCompaniesToDb);

router
  .route("/:id")
  .get(getCompanyById)
  .patch(updateCompanyById)
  .delete(deleteCompanyById);

module.exports = router;
