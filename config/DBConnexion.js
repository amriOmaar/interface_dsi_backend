const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/dsiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    console.log("Database connected !");
  })
  .on("error", (error) => {
    console.log(`Database connection error : ${error}`);
  });

  module.exports=mongoose; 