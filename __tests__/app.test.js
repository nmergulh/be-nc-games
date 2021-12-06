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
        expect(response.body.categories).toBeInstanceOf(Object);
        expect(response.body.categories).toEqual([
          {
            slug: "euro game",
            description: "Abstact games that involve little luck",
          },
          {
            slug: "social deduction",
            description: "Players attempt to uncover each other's hidden role",
          },
          { slug: "dexterity", description: "Games involving physical skill" },
          {
            slug: "children's games",
            description: "Games suitable for children",
          },
        ]);
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
      .expect(200)
      .then((response) => {
        expect(response.body.review).toBeInstanceOf(Object);
        expect(response.body.review).toEqual(
          expect.objectContaining({
            title: "Jenga",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Fiddly fun for all the family",
            category: "dexterity",
            created_at: expect.any(String),
            votes: 5,
            review_id: 2,
            comment_count: "3",
          })
        );
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
  test("200: returns review with updated vote count", () => {
    const incObj = { inc_votes: 1 };

    return request(app)
      .patch(`/api/reviews/2`)
      .send(incObj)
      .expect(200)
      .then((response) => {
        expect(response.body.review).toBeInstanceOf(Object);
        expect(response.body.review).toEqual(
          expect.objectContaining({
            title: "Jenga",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            review_body: "Fiddly fun for all the family",
            category: "dexterity",
            created_at: expect.any(String),
            votes: 6,
            review_id: 2,
          })
        );
      });
  });

  test("400: no votes on the request body", () => {
    const incObj = { not_inc_votes: 1 };

    return request(app)
      .patch(`/api/reviews/2`)
      .send(incObj)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid input");
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
  test('404: returns "path not found" from non existent ID', () => {
    const incObj = { inc_votes: 1 };
    return request(app)
      .patch(`/api/review/100`)
      .send(incObj)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found");
      });
  });
  test('400: returns "invalid input for review_id when string is passed', () => {
    const incObj = { inc_votes: 1 };
    return request(app)
      .patch(`/api/reviews/${"Bob"}`)
      .send(incObj)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid input");
      });
  });
});
describe("GET /api/reviews", () => {
  test("200: returns reviews table sorted by title (incl comment count for each review)", () => {
    return request(app)
      .get("/api/reviews?sort_by=title")
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toBeInstanceOf(Array);
        expect(response.body.reviews).toBeSortedBy("title", {
          descending: true,
        });
        expect(response.body.reviews[0].title).toBe("Ultimate Werewolf");
      });
  });
  test("200: return reviews table (incl comment count for each review) in Asc order", () => {
    return request(app)
      .get("/api/reviews?order=asc")
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toBeInstanceOf(Array);
        expect(response.body.reviews).toBeSortedBy();
        expect(response.body.reviews[0].created_at).toBe(
          "1970-01-10T02:08:38.400Z"
        );
      });
  });
  test('200: returns reviews table relating to "social deduction" category in ASC order', () => {
    return request(app)
      .get("/api/reviews?sort_by=title&order=asc&category=social deduction")
      .expect(200)
      .then((response) => {
        expect(response.body.reviews).toBeInstanceOf(Array);
        expect(response.body.reviews).toHaveLength(11);
        expect(response.body.reviews[0].title).toBe(
          "A truly Quacking Game; Quacks of Quedlinburg"
        );
        expect(response.body.reviews[10].title).toBe("Ultimate Werewolf");
        response.body.reviews.forEach((review) => {
          review.review_id = expect.any(Number);
          review.owner = expect.any(String);
          review.title = expect.any(String);
          review.category = expect("social deduction");
          review.img_url = expect.any(String);
        });
      });
  });

  test('404: returns "path not found"', () => {
    return request(app)
      .get(`/api/review?sort_by=title%order=asc`)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found");
      });
  });
  test('400: returns "invalid sort query"', () => {
    return request(app)
      .get("/api/reviews?sort_by=bob")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid sort query");
      });
  });
  test('400: returns "invalid order query"', () => {
    return request(app)
      .get("/api/reviews?sort_by=title&order=bob")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid order query");
      });
  });
  test('400: returns "invalid category query"', () => {
    return request(app)
      .get("/api/reviews?sort_by=title&order=asc&category=bob")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid category query");
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test('200: returns comments related to a specific review id"', () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then((response) => {
        expect(response.body.comments).toBeInstanceOf(Array);
        expect(response.body.comments).toHaveLength(3);
        response.body.comments.forEach((comment) => {
          comment.comment_id = expect.any(Number);
          comment.votes = expect.any(Number);
          comment.created_at = expect.any(String);
          comment.author = expect.any(String);
          comment.body = expect.any(String);
        });
      });
  });
  test('404: returns "path not found"', () => {
    return request(app)
      .get("/api/reviews/2/commentss")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found");
      });
  });
  test('404: returns "review not found"', () => {
    return request(app)
      .get("/api/reviews/100/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("review not found");
      });
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  test("201: displays comment added to specific review_id", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({
        author: "bainesface",
        body: "I did know dogs could play games",
      })
      .expect(201)
      .then((response) => {
        expect(response.body.comment).toBeInstanceOf(Object);
        expect(response.body.comment).toEqual(
          expect.objectContaining({
            author: "bainesface",
            body: "I did know dogs could play games",
            comment_id: 7,
            created_at: expect.any(String),
            review_id: 2,
            votes: 0,
          })
        );
      });
  });
  test("201: displays comment added to specific review_id ignoring extra fields", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({
        author: "bainesface",
        body: "I did know dogs could play games",
        ignore: "ignore this",
      })
      .expect(201)
      .then((response) => {
        expect(response.body.comment).toBeInstanceOf(Object);
        expect(response.body.comment).not.toEqual(
          expect.objectContaining({
            ignore: "ignore this",
          })
        );
      });
  });
  test('404: returns with "review not found"', () => {
    return request(app)
      .post("/api/reviews/1000/comments")
      .send({
        author: "bainesface",
        body: "I did know dogs could play games",
      })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("review not found");
      });
  });

  test('400: returns with "invalid input" when review_id is string', () => {
    return request(app)
      .post("/api/reviews/bob/comments")
      .send({
        author: "bainesface",
        body: "I did know dogs could play games",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid input");
      });
  });
  test('400: returns with "invalid input" when key in body is missing key', () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({
        author: "bainesface",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid input");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: deletes comment relating to comment_id 1", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test('404: returns "comment not found" ', () => {
    return request(app)
      .delete("/api/comments/1000")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("comment not found");
      });
  });
  test('400: returns "invalid data type"', () => {
    return request(app)
      .delete("/api/comments/bob")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid input");
      });
  });
});

describe("GET /api", () => {
  test("200: connected to /api", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body.endpoints).toBeInstanceOf(Object);
      });
  });
});
