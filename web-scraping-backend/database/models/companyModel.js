const { DataTypes } = require("sequelize");

const Company = (sequelize) =>
  sequelize.define(
    "Company",
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pinCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );

// await Company.sync({ force: true });

module.exports = Company;
