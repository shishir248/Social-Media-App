//Req express
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
//Define port
const port = 8000;
//Require express layouts
const expressLayouts = require("express-ejs-layouts");
//Fire express
const app = express();

app.use(expressEjsLayouts);
//Set up static files 
app.use(express.static('./assets'));
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Get express router from routes
app.use("/", require("./routes/"));
//Setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//To check if server is running
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
    return;
  }
  console.log(`Server is running on port: ${port}`);
});