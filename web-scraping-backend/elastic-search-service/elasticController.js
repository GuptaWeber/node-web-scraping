const { Company } = require("../database/sequelize.config");
const { companiesIndex } = require("../server");
const {
  queryElasticSearch,
  deleteElasticDocument,
} = require("./elastic.config");

exports.getCompaniesFromElastic = async (req, res) => {
  const data = await queryElasticSearch(companiesIndex, req.query.q || "");

  const result = data.map((company) => {
    return {
      id: company._id,
      ...company._source,
    };
  });

  console.log(result);

  res.status(200).send({
    companies: result,
  });
};

exports.deleteCompanyByIdFromElastic = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteElasticDocument(companiesIndex, id);

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while deleting company",
    });
  }
};
