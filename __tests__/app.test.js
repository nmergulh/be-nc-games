const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("GET /api/categories", () => {
  test("200: returns categories table", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        expect(response.body.categories).toBeInstanceOf(Array);
        expect(response.body.categories).toHaveLength(4);
        response.body.categories.forEach((item) => {
          expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test('404: returns "path not found"', () => {
    return request(app)
      .get("/api/category")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found");
      });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("200: returns review (incl comment count) associated to a review_id ", () => {
    return request(app)
      .get("/api/reviews/2")
      .then((response) => {
        expect(response.body.review).toBeInstanceOf(Array);
        expect(response.body.review).toHaveLength(1);
        response.body.review.forEach((review) => {
          review.review_id = expect(2);
          review.title = expect.any(String);
          review.review_body = expect.any(String);
          review.designer = expect.any(String);
          review.review_img_url = expect.any(String);
          review.votes = expect.any(Number);
          review.comment_count = expect("3");
        });
      });
  });
  test('404: returns "review not found"', () => {
    return request(app)
      .get("/api/reviews/100")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("review not found");
      });
  });
  test('400: returns "invalid input"', () => {
    return request(app)
      .get(`/api/reviews/${"Bob"}`)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid input");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("201: returns review with updated vote count", () => {
    const incObj = { inc_votes: 1 };

    return request(app)
      .patch(`/api/reviews/2`)
      .send(incObj)
      .expect(201)
      .then((response) => {
        expect(response.body.review).toBeInstanceOf(Array);
        expect(response.body.review).toHaveLength(1);
        response.body.review.forEach((review) => {
          review.review_id = expect.any(Number);
          review.title = expect.any(String);
          review.review_body = expect.any(String);
          review.designer = expect.any(String);
          review.review_img_url = expect.any(String);
          review.votes = expect(6);
        });
      });
  });
  test('404: returns "path not found"', () => {
    const incObj = { inc_votes: 1 };
    return request(app)
      .patch(`/api/review/2`)
      .send(incObj)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found");
      });
  });
  test('400: returns "invalid input"', () => {
    const inc0bj = { inc_votes: "banana" };
    return request(app)
      .patch(`/api/reviews/2`)
      .send(inc0bj)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid input");
      });
  });
});

describe("GET /api/reviews", () => {
  test("200: returns reviews table (incl comment count for each review)", () => {
    return request(app)
      .get("/api/reviews")
      .then((response) => {
        expect(response.body.reviews).toBeInstanceOf(Array);
        expect(response.body.reviews).toHaveLength(13);
        response.body.reviews.forEach((review) => {
          review.review_id = expect.any(Number);
          review.title = expect.any(String);
          review.review_body = expect.any(String);
          review.designer = expect.any(String);
          review.review_img_url = expect.any(String);
          review.votes = expect.any(Number);
          review.comment_count = expect.any(Number);
        });
      });
  });
  test('404: returns "path not found"', () => {
    return request(app)
      .get(`/api/review`)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found");
      });
  });
});

describe("GET /api", () => {
  test("200: connected to /api", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ msg: "connected to api" });
      });
  });
});
