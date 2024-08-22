const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://premktechworkspace23:Zfrz1O1B5ws6B6D9@cluster0.dbpsg.mongodb.net/"
    )
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB Connection Failed", err));
};

module.exports = dbConnect;
