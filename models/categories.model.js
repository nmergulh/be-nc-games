const db = require("../db/connection");
const categories = require("../db/data/test-data/categories");

exports.selectCategories = () => {
  return db.query(`SELECT * FROM categories`).then(({ rows }) => {
    const category = rows[0];
    if (!category) {
      return Promise.reject({ status: 404, msg: "" });
    }
    return rows;
  });
};
