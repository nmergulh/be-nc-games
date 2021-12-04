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

exports.selectReviews = (sort_by = "date", order = "DESC", category) => {
  if (
    ![
      "owner",
      "title",
      "review_id",
      "category",
      "review_img_url",
      "created at",
      "votes",
      "comment_count",
    ].includes(sort_by)
  ) {
    return Promise.reject({ status: 400, msg: "invalid sort query" });
  }

  if (!["asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "invalid order query" });
  }

  if (
    !["social deduction", "dexterity", "euro game", undefined].includes(
      category
    )
  ) {
    return Promise.reject({ status: 400, msg: "invalid category query" });
  }

  let queryStr = `SELECT reviews.*, COUNT(comments.review_id) 
    FROM reviews
    LEFT JOIN comments
    ON comments.review_id = reviews.review_id
    `;

  if (category) {
    queryStr += ` WHERE category = '${category}'`;
  }

  queryStr += ` GROUP by reviews.review_id
      ORDER BY ${sort_by} ${order.toUpperCase()};`;

  return db
    .query(queryStr)

    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 400, msg: "review not found" });
      return rows;
    });
};

exports.selectCommentsByReviewId = (review_id) => {
  return db
    .query(
      `SELECT comment_id,votes,created_at,author,body FROM comments WHERE review_id = ${review_id}`
    )
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 400, msg: "review not found" });
      return rows;
    });
};

exports.insertCommentByReviewId = (review_id, author, body) => {
  return db
    .query(
      `INSERT INTO comments(review_id, author, body) VALUES %L RETURNING*;`,
      [[review_id, author, body]]
    )
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 400, msg: "comment not found" });
    });
};
