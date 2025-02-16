const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect("/chat.html")
);

router.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/"));
});

router.get("/user", (req, res) => {
  if (!req.isAuthenticated()) return res.json({ loggedIn: false });
  res.json({ loggedIn: true, name: req.user.displayName });
});

module.exports = router;
