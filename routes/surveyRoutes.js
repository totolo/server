const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// sometimes running tests in node complains about requiring the same component multiple times, so instead of requiring Survey.js, we use
// the following workaround to access the surveys class.
const Survey = mongoose.model("surveys");

// we have to make sure that the user is login and they have enough credits to send out a survey.
module.exports = app => {
  // we can put as many functions as you want between the request url and the callback function. These functions will be executed in order.
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const {title, subject, body, recipients} = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now()

    });

    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });
};