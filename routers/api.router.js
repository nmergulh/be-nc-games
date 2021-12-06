const categoriesRouter = require("./api.categories");
const commentsRouter = require("./api.comments");
const reviewsRouter = require("./api.reviews");
const { getEndpoints } = require("../controllers/api.controller");

const apiRouter = require("express").Router();

apiRouter.get("/", getEndpoints);

apiRouter.use("/categories", categoriesRouter);

apiRouter.use("/reviews", reviewsRouter);

apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
