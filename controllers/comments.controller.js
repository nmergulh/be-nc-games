const {
  removeComment,
  updateVoteByCommentId,
} = require("../models/comments.model");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchVoteByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  const vote = req.body.inc_votes;
  updateVoteByCommentId(vote, comment_id)
    .then((comment) => {
      res.status(200).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};
