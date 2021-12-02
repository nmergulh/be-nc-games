const db = require("../db/connection");

exports.selectReviewById = (review_id) => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments.review_id) AS comment_count
      FROM reviews 
      LEFT JOIN comments 
      ON comments.review_id = reviews.review_id 
      WHERE reviews.review_id = $1 
      GROUP BY reviews.review_id`,
      [review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "review not found" });
      return rows;
    });
};

exports.updateReviewById = (voteObj, review_id) => {
  return db
    .query(
      `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`,
      [voteObj.inc_votes, review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "review not found" });
      return rows;
    });
};

exports.selectReviews = () => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments.review_id) 
    FROM reviews
    LEFT JOIN comments
    ON comments.review_id = reviews.review_id
    GROUP by reviews.review_id;`
    )
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 400, msg: "review not found" });
      return rows;
    });
};
