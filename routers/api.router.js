const categoriesRouter = require("./api.categories");
<<<<<<< HEAD
const reviewsRouter = require("./api.reviews");

const apiRouter = require("express").Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "connected to api" });
});
=======
const commentsRouter = require("./api.comments");
const reviewsRouter = require("./api.reviews");
const { getEndpoints } = require("../controllers/api.controller");
const usersRouter = require("./api.users");

const apiRouter = require("express").Router();

apiRouter.get("/", getEndpoints);
>>>>>>> 9dd70e01f7b771463b3fc157f9ec24e6e735497c

apiRouter.use("/categories", categoriesRouter);

apiRouter.use("/reviews", reviewsRouter);

<<<<<<< HEAD
=======
apiRouter.use("/comments", commentsRouter);

apiRouter.use("/users", usersRouter);

>>>>>>> 9dd70e01f7b771463b3fc157f9ec24e6e735497c
module.exports = apiRouter;
