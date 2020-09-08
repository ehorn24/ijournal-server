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

  it.only("GET /u/:user_id returns 200 and all the user's entries", () => {
    return supertest(app).get("/api/entries/u/1").expect(200);
  });
});
