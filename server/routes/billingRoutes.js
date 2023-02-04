const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const { id: stripeTokenId } = req.body;

    const stripeCharge = await stripe.charges.create({
      amount: 500,
      currency: "USD",
      description: "$5 for 5 credits",
      source: stripeTokenId,
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(req.user);
  });
};
