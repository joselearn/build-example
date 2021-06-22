const validateObjectId = require("../middleware/validateObjectId");
const { Cat, validate } = require("../models/cat");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const cats = await Cat.find()
    .select("-__v")
    .sort("name");
  res.send(cats);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let cat = new Cat({ name: req.body.name });
  cat = await cat.save();

  res.send(cat);
});

router.put("/:id", [ validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cat = await Cat.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!cat)
    return res.status(404).send("The cat with the given ID was not found.");

  res.send(cat);
});

router.delete("/:id", [validateObjectId], async (req, res) => {
  const cat = await Cat.findByIdAndRemove(req.params.id);

  if (!cat)
    return res.status(404).send("The cat with the given ID was not found.");

  res.send(cat);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const cat = await Cat.findById(req.params.id).select("-__v");

  if (!cat)
    return res.status(404).send("The cat with the given ID was not found.");

  res.send(cat);
});

module.exports = router;
