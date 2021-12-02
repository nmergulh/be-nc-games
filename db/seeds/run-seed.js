const devData = require("../data/development-data/index.js");
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
  if (process.env.PGDATABASE !== "nc_games_test") {
    return seed(devData).then(() => db.end());
  }
};

runSeed();
