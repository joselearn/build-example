const validateObjectId = require("../middleware/validateObjectId");
const { URL, validate } = require("../models/URL");
const express = require("express");
const shortId = require("shortid");
const router = express.Router();


router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    const urlData = await URL.findOne({ shortUrlId: req.params.id}).select("-__v");
    console.log(urlData);
  
    if (!urlData) return res.status(404).send("The URL was not found.");
    console.log(urlData.url);
    return res.redirect(urlData.url);
  });

router.post("/", async (req, res) => {
  console.log("test")
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const shortURLId = shortId.generate();
  let shortURL = new URL({ shortUrlId: shortURLId, url: req.body.url });
  console.log(shortURL)
  shortURL = await shortURL.save();

  res.send(shortURL);
});

module.exports = router;
