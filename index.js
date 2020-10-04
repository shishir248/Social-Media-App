//Req express
const express = require("express");
//Req layouts
const expressEjsLayouts = require("express-ejs-layouts");
//Req cookie parser package
const cookieParser = require("cookie-parser");
//Define port
const port = 8000;
//Require express layouts
const expressLayouts = require("express-ejs-layouts");
//Fire express
const app = express();
//Get database
const db = require("./config/mongoose");

//Use url encoded middleware(Post parser)
app.use(express.urlencoded());
//Use cookie parser
app.use(cookieParser());

app.use(expressEjsLayouts);
//Set up static files
app.use(express.static("./assets"));
//extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

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