const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://127.0.0.1:27017"
  )
  .then(() => {
    console.log("Conectado ao MongoDB!");
  })
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

module.exports = mongoose;