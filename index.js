const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

// bodyparser is also a middleware for express.
app.use(bodyParser.json());
// cookieSession takes in two variables, one is the maximum valid period of the cookie (usually 30 days), and the second is
// a collection of keys which can be used for encryption.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // express will serve up production assets
  // like our main.js file, or main.css file

  // the order of app.use is critical. First of all, the express server will check the routes defined in authRoutes, then routes defined in
  // billingRoutes is checked. If the route is still not handled, then it will check if it is a specific file stored in client/build/static (mostly css
  // and js files). If the route is still not handled, then seek help from index.html. It must be some route defined in the index.html file.

  app.use(express.static("client/build"));
  // express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
