const db = require("../db/connection");

exports.removeComment = (comment_id) => {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `comment not found`,
        });
      }
    })
    .then(() => {
      return db.query(
        `DELETE FROM comments
      WHERE comment_id = $1`,
        [comment_id]
      );
    });
};

exports.updateVoteByCommentId = (vote, comment_id) => {
  if (!vote || typeof vote !== "number") {
    return Promise.reject({
      code: "22P02",
    });
  }

  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1;`, [comment_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `comment_id not found`,
        });
      }
    })
    .then(() => {
      return db.query(
        `UPDATE comments SET votes = votes + ($1) 
    WHERE comment_id = $2 RETURNING *;`,
        [vote, comment_id]
      );
    })
    .then((result) => {
      return result.rows[0];
    });
};
