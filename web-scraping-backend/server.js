const app = require("./app");
const dotenv = require("dotenv");
const { sequelize } = require("./database/sequelize.config");
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
