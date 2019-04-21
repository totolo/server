const keys = require("../config/keys");

const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    if (!req.user) {
      return res.status(401).send({error: "you must log in!"});
    }
    const charge = await stripe.charges.create({
      amount: 50000,
      currency: "usd",
      description: "$500 dollars for 500 credits",
      source: req.body.id
    });
    req.user.credits += 500;
    const user = await req.user.save();
    res.send(user);
  });
};