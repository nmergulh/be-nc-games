const categoriesRouter = require("./api.categories");

const apiRouter = require("express").Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "connected to api" });
});

apiRouter.use("/categories", categoriesRouter);

module.exports = apiRouter;
