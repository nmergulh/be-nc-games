const reviewsRouter = require("express").Router();
const {
  getReviewById,
  patchReviewById,
  getReviews,
  getCommentsByReviewId,
  postCommentByReviewId,
} = require("../controllers/reviews.controller");

reviewsRouter.route("/").get(getReviews);

reviewsRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postCommentByReviewId);

module.exports = reviewsRouter;
