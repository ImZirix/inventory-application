const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Homepage",
  });
});

module.exports = router;
