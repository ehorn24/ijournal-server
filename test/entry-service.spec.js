const knex = require("knex");
const app = require("../src/app");
const { expect } = require("chai");
const supertest = require("supertest");

describe("Entry endpoints", () => {
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

  it("GET /u/:user_id returns 200 and all the user's entries", () => {
    return supertest(app).get("/api/entries/u/1").expect(200);
  });

  it("POST /u/:user_id returns 400 if entry post is not successful", () => {
    let data = {
      entry_title: "Test Title",
      tags: ["tag 1", "tag 2"],
      entry_text: "Test Text",
    };
    return supertest(app).post("/api/entries/u/1").send(data).expect(400);
  });

  it("POST /u/:user_id returns 201 and the new entry if successful", () => {
    let data = {
      journal: 1,
      entry_title: "Test Title",
      tags: ["tag 1", "tag 2"],
      entry_text: "Test Text",
    };
    return supertest(app)
      .post("/api/entries/u/1")
      .send(data)
      .expect(201)
      .then((res) => {
        expect(res.body).to.have.all.keys(
          "id",
          "owner",
          "journal",
          "date_created",
          "entry_title",
          "tags",
          "entry_text"
        );
      });
  });

  it.only("DELETE /:entry_id responds with 204 if entry successfully deleted", () => {
    return supertest(app).delete("/api/entries/3").expect(204);
  });
});
