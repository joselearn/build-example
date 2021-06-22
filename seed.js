const mongoose = require("mongoose");
const config = require("config");

async function seed() {
  await mongoose.connect(config.get("db"), {useNewUrlParser: true, useUnifiedTopology: true});

  mongoose.disconnect();

  console.info("Done!");
}

seed();
