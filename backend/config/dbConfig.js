const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `Connection to database was successful with HOST: ${con.connection.host}`
      );
    });
};

module.exports = connectDb;
