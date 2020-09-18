//Req express
const express = require("express");
//Define port
const port = 8000;

//Fire express
const app = express();
//Get express router from routes
app.use("/", require("./routes/"));
//Setting up view engine
app.set("view-engine", "ejs");
app.set("views", "./views");

//To check if server is running
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
    return;
  }
  console.log(`Server is running on port: ${port}`);
});
