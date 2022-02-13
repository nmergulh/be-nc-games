const commentsRouter = require("express").Router();
const {
  deleteComment,
  patchVoteByCommentId,
} = require("../controllers/comments.controller");

commentsRouter
  .route("/:comment_id")
  .delete(deleteComment)
  .patch(patchVoteByCommentId);

module.exports = commentsRouter;
