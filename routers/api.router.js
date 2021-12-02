const categoriesRouter = require("./api.categories");
const reviewsRouter = require("./api.reviews");

const apiRouter = require("express").Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "connected to api" });
});

apiRouter.use("/categories", categoriesRouter);

apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
