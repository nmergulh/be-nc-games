const categoriesRouter = require("./api.categories");
const commentsRouter = require("./api.comments");
const reviewsRouter = require("./api.reviews");

const apiRouter = require("express").Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "connected to api" });
});

apiRouter.use("/categories", categoriesRouter);

apiRouter.use("/reviews", reviewsRouter);

apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
