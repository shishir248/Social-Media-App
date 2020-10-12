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
//Require express session library used for session cookies
const session = require("express-session");
//Require passport
const passport = require("passport");
//Require strategy
const passportlocal = require("./config/passport-local-strategy");
//Require mongo store to store the session
const MongoStore = require("connect-mongo")(session);
//Require sass middleware
const sassMiddleware = require('node-sass-middleware');

app.use(expressLayouts);

app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}))


//Use url encoded middleware(Post parser)
app.use(express.urlencoded());
//Use cookie parser
app.use(cookieParser());


//Set up static files
app.use(express.static("./assets"));
//extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Use express session library
app.use(
  session({
    name: "codeial",
    //TODO Change the secret before deployment
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err);
      }
    ),
  })
);
//Use passport and session
app.use(passport.initialize());
app.use(passport.session());
//Calling storing local fn
app.use(passport.setAuthenticatedUser);

//Get express router from routes
app.use("/", require("./routes/"));

//To check if server is running
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
    return;
  }
  console.log(`Server is running on port: ${port}`);
});