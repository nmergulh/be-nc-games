const db = require("../connection");
const format = require("pg-format");

<<<<<<< HEAD
const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables - Drop tables if created already then insert
  return (
    db
      .query(`DROP TABLE IF EXISTS categories cascade;`)
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS users cascade;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS reviews cascade;`);
      })
      .then(() => {
        return db.query(`DROP TABLE IF EXISTS comments cascade;`);
      })
      .then(() => {
        return db.query(`CREATE TABLE categories(
      slug VARCHAR PRIMARY KEY,
      description VARCHAR NOT NULL
    );`);
      })
      .then(() => {
        return db.query(`CREATE TABLE users (
      username VARCHAR PRIMARY KEY,
      avatar_url VARCHAR,
      name VARCHAR NOT NULL
    );`);
      })
      .then(() => {
        return db.query(`CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      review_body TEXT NOT NULL,
      designer VARCHAR(255) NOT NULL,
      review_img_url VARCHAR DEFAULT E'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg' NOT NULL,
      votes INT DEFAULT 0 NOT NULL,
      category VARCHAR REFERENCES categories(slug) ON DELETE CASCADE NOT NULL,
      owner VARCHAR REFERENCES users(username) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
      })
      .then(() => {
        return db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE NOT NULL,
      review_id INT REFERENCES reviews(review_id) ON DELETE CASCADE,
      votes INT DEFAULT 0 NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body VARCHAR
    );`);
      })
      // 2. insert data
      .then(() => {
        const formattedCategoryData = categoryData.map((data) => {
          return [data.slug, data.description];
        });

        const queryStr = format(
          `INSERT INTO categories
        (slug, description)
        VALUES
        %L;
        `,
          formattedCategoryData
        );
        return db.query(queryStr);
      })
      .then(() => {
        const formattedUserData = userData.map((data) => {
          return [data.username, data.name, data.avatar_url];
        });

        const queryStr = format(
          `INSERT INTO users
          (username, name, avatar_url)
          VALUES
          %L;
          `,
          formattedUserData
        );
        return db.query(queryStr);
      })
      .then(() => {
        const formattedReviewData = reviewData.map((data) => {
          return [
            data.title,
            data.review_body,
            data.designer,
            data.votes,
            data.category,
            data.owner,
            data.review_img_url,
            data.created_at,
          ];
        });

        const queryStr = format(
          `INSERT INTO reviews
          (title, review_body, designer, votes, category, owner, review_img_url, created_at)
          VALUES
          %L;
          `,
          formattedReviewData
        );
        return db.query(queryStr);
      })
      .then(() => {
        const formattedCommentsData = commentData.map((data) => {
          return [data.author, data.review_id, data.votes, data.body];
        });

        const queryStr = format(
          `INSERT INTO comments
          (author, review_id, votes, body)
          VALUES
          %L;
          `,
          formattedCommentsData
        );
        return db.query(queryStr);
      })
  );
=======
const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS categories;`);
  await db.query(`CREATE TABLE categories
(slug VARCHAR(50) PRIMARY KEY,
description TEXT NOT NULL);`);

  const categoryQuery = format(
    `INSERT INTO categories
(slug, description)
VALUES
%L
RETURNING *;`,
    categoryData.map((data) => [data.slug, data.description])
  );

  let categories = await db.query(categoryQuery);
  categories = categories.rows;

  await db.query(`CREATE TABLE users (
  username VARCHAR(50) PRIMARY KEY,
  avatar_url VARCHAR(150) NOT NULL,
name VARCHAR(50) NOT NULL
);`);

  const userQuery = format(
    `INSERT INTO users
(username, avatar_url, name)
VALUES
%L
RETURNING *;`,
    userData.map((data) => [data.username, data.avatar_url, data.name])
  );

  let users = await db.query(userQuery);
  users = users.rows;

  await db.query(`CREATE TABLE reviews
  (review_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    review_body TEXT NOT NULL,
    designer VARCHAR(50) NOT NULL,
  review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg' NOT NULL,
  votes INT DEFAULT 0 NOT NULL,
  category VARCHAR(50) REFERENCES categories(slug) ON DELETE CASCADE NOT NULL,
  owner VARCHAR(50) REFERENCES users(username) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);`);

  const reviewQuery = format(
    `INSERT INTO reviews
    (title, review_body, designer, review_img_url, votes, category, owner, created_at)
    VALUES
    %L
    RETURNING*`,
    reviewData.map((data) => [
      data.title,
      data.review_body,
      data.designer,
      data.review_img_url,
      data.votes,
      data.category,
      data.owner,
      data.created_at,
    ])
  );
  let reviews = await db.query(reviewQuery);
  reviews = reviews.rows;

  await db.query(`CREATE TABLE comments
    (comment_id SERIAL PRIMARY KEY,
      author VARCHAR(50) REFERENCES users(username) ON DELETE CASCADE NOT NULL,
      review_id INT REFERENCES reviews(review_id) ON DELETE CASCADE NOT NULL,
      votes INT DEFAULT 0 NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      body TEXT NOT NULL);`);

  const commentQuery = format(
    `INSERT INTO comments
      (author, review_id, votes, created_at, body)
      VALUES
      %L
      RETURNING *;`,
    commentData.map((data) => [
      data.author,
      data.review_id,
      data.votes,
      data.created_at,
      data.body,
    ])
  );

  let comments = await db.query(commentQuery);
  comments = comments.rows;
  return comments;
>>>>>>> 9dd70e01f7b771463b3fc157f9ec24e6e735497c
};

module.exports = seed;
