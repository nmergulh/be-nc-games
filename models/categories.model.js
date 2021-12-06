const db = require("../db/connection");

exports.selectCategories = () => {
  return db.query(`SELECT * FROM categories`).then(({ rows }) => {
    const category = rows[0];
    if (!category) {
      return Promise.reject({ status: 404, msg: "category not found" });
    }
    return rows;
  });
};
