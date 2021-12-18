const categoriesRouter = require("./api.categories");
const commentsRouter = require("./api.comments");
const reviewsRouter = require("./api.reviews");
const { getEndpoints } = require("../controllers/api.controller");
const usersRouter = require("./api.users");

const apiRouter = require("express").Router();

apiRouter.get("/", getEndpoints);

apiRouter.use("/categories", categoriesRouter);

apiRouter.use("/reviews", reviewsRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
