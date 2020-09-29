const knex = require("knex");
const app = require("../src/app");
const { expect } = require("chai");
const supertest = require("supertest");

describe("Journal endpoints", () => {
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => {
    db.destroy();
  });

  it("GET /u/:user_id responds with 200 and all the user's journals", () => {
    return supertest(app).get("/api/journals/u/1").expect(200);
  });

  it("GET /u/:user_id returns 404 if the user does not exist or the user has no journals", () => {
    return supertest(app).get("/api/journals/u/10").expect(404);
  });

  it("GET /j/:journal_id returns 200 and an array with the journal info", () => {
    return supertest(app)
      .get("/api/journals/j/2")
      .expect(200)
      .then((res) => {
        expect(res.body).to.have.all.keys(
          "id",
          "owner",
          "journal_name",
          "date_created"
        );
      });
  });

  it("PATCH /j/:journal_id responds with 400 if no edit fields are present", () => {
    return supertest(app).patch("/api/journals/j/1").expect(400);
  });

  it("DELETE /j/:journal_id responds with 204 if the journal is successfully deleted", () => {
    return supertest(app).delete("/api/journals/j/1").expect(204);
  });

  it("POST /u/:user_id responds with 400 if a key is missing from the request body", () => {
    let data = {
      dumdum: "alejfaleifj",
    };
    return supertest(app).post("/api/journals/u/1").send(data).expect(400);
  });

  it("POST /u/:user_id responds with 201 and an array with the new journal info if successful", () => {
    let data = {
      journal_name: "Waterbottle",
    };
    return supertest(app)
      .post("/api/journals/u/1")
      .send(data)
      .expect(201)
      .then((res) => {
        expect(res.body).to.have.all.keys(
          "id",
          "owner",
          "journal_name",
          "date_created"
        );
      });
  });
});
