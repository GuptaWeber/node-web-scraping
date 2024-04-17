const { Company } = require("../database/sequelize.config");
const { Op } = require("sequelize");

exports.addCompaniesToDb = async (req, res) => {
  try {
    const { cin, companyName, pinCode, email, address } = req.body;

    if (cin !== undefined && cin?.length !== 21) {
      return res.status(400).send({
        message: "CIN should be of 21 characters",
      });
    }

    if (pinCode !== undefined && pinCode.length !== 6) {
      return res.status(400).send({
        message: "PIN code should be of 6 characters",
      });
    }

    const company = await Company.create({
      cin,
      companyName,
      pinCode,
      email,
      address,
    });
    res.status(201).send({
      message: "Company added successfully",
      id: company.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while adding company",
    });
  }
};

exports.getCompanies = async (req, res) => {
  const { page = 1, pageSize = 10, q, count } = req.query;
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize);

  const filter = {};

  if (q) {
    filter[Op.or] = {
      companyName: {
        [Op.like]: `%${q}%`,
      },
      cin: {
        [Op.like]: `%${q}%`,
      },
      email: {
        [Op.like]: `%${q}%`,
      },
    };
  }

  const companies = await Company.findAndCountAll({
    where: filter,
    offset,
    limit,
  });

  let result = {
    companies: companies.rows,
  };

  if (companies.count > 0 && count === "true") {
    result.totalCount = companies.count;
  }

  res.status(200).send(result);
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    if (!company) {
      throw new Error("Company not found");
    }
    res.status(200).send({
      ...company.dataValues,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "Company not found",
    });
  }
};

exports.updateCompanyById = async (req, res) => {
  const { id } = req.params;
  const { cin, companyName, pinCode, email, address } = req.body;

  if (req.body.hasOwnProperty("cin") && cin?.length !== 21) {
    return res.status(400).send({
      message: "CIN should be of 21 characters",
    });
  }

  if (req.body.hasOwnProperty("pinCode") && pinCode.length !== 6) {
    return res.status(400).send({
      message: "PIN code should be of 6 characters",
    });
  }

  try {
    const company = await Company.update(
      {
        ...(req.body.hasOwnProperty("cin") && { cin }),
        ...(req.body.hasOwnProperty("companyName") && { companyName }),
        ...(req.body.hasOwnProperty("pinCode") && { pinCode }),
        ...(req.body.hasOwnProperty("email") && { email }),
        ...(req.body.hasOwnProperty("address") && { address }),
      },
      {
        where: {
          id,
        },
      }
    );

    if (company[0] === 1) {
      res.status(200).send({
        message: "Company updated successfully",
      });
    } else {
      res.status(404).send({
        message: "Company not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while updating company",
    });
  }
};

exports.deleteCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.destroy({
      where: {
        id,
      },
    });

    if (company === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({
        message: "Company not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while deleting company",
    });
  }
};
