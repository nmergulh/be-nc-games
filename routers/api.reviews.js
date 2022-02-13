const reviewsRouter = require("express").Router();
const {
  getReviewById,
  patchReviewById,
  getReviews,
<<<<<<< HEAD
=======
  getCommentsByReviewId,
  postCommentByReviewId,
>>>>>>> 9dd70e01f7b771463b3fc157f9ec24e6e735497c
} = require("../controllers/reviews.controller");

reviewsRouter.route("/").get(getReviews);

reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

<<<<<<< HEAD
=======
reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postCommentByReviewId);

>>>>>>> 9dd70e01f7b771463b3fc157f9ec24e6e735497c
module.exports = reviewsRouter;
