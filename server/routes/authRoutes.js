const passport = require("passport");

module.exports = (app) => {
  app.get("/", (req, res) => res.send("HOME"));

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    console.log("Logged out!");
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current-user", (req, res) => {
    res.send(req.user);
  });
};
