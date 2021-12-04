const {
  updateReviewById,
  selectReviewById,
  selectReviews,
  selectCommentsByReviewId,
  insertCommentByReviewId,
} = require("../models/reviews.model");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviewById = (req, res, next) => {
  const { review_id } = req.params;
  updateReviewById(req.body, review_id)
    .then((review) => {
      res.status(201).send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;

  selectReviews(sort_by, order, category)
    .then((reviews) => {
      res.status(200).send({ reviews: reviews });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;

  selectCommentsByReviewId(review_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  const { author, body } = req.body;

  insertCommentByReviewId(review_id, author, body)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};
