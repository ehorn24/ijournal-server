const knex = require("knex");
const app = require("../src/app");
const { expect } = require("chai");
const supertest = require("supertest");

describe("Users endpoints", () => {
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  context("There are users in the database", () => {
    const testUsers = [
      {
        username: "testuser1",
        password: "dummypassword",
        firstname: "Test",
        lastname: "User",
      },
      {
        username: "testuser2",
        password: "dumdumpass",
        firstname: "User",
        lastname: "Two",
      },
      {
        username: "testuser3",
        password: "password",
        firstname: "Number",
        lastname: "Three",
      },
    ];

    beforeEach("insert users", () => {
      return db.into("users").insert(testUsers);
    });
    it("GET / responds with 200 and all the users in the database", () => {
      return supertest(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.an("array");
        });
    });
  });

  it("POST / responds with 201 and the new user info", () => {
    let data = {
      username: "johnny",
      password: "password",
      firstname: "John",
      lastname: "Nicholas",
    };
    return supertest(app)
      .post("/api/users")
      .send(data)
      .expect(201)
      .then((res) => {
        expect(res.body).to.have.all.keys(
          "id",
          "username",
          "password",
          "firstname",
          "lastname"
        );
      });
  });

  context("Add users to database", () => {
    const testUsers = [
      {
        username: "testuser1",
        password: "dummypassword",
        firstname: "Test",
        lastname: "User",
      },
      {
        username: "testuser2",
        password: "dumdumpass",
        firstname: "User",
        lastname: "Two",
      },
      {
        username: "testuser3",
        password: "password",
        firstname: "Number",
        lastname: "Three",
      },
    ];
    beforeEach("insert test users", () => {
      return db.into("users").insert(testUsers);
    });
    it("POST /login returns 404 if the user does not exist", () => {
      let data = {
        username: "boobah",
        password: "dumdum",
      };
      return supertest(app).post("/api/users/login").send(data).expect(404);
    });
    it("POST /login returns 200 if the user successfully authenticates", () => {
      let data = {
        username: "testuser1",
        password: "dummypassword",
      };
      return supertest(app)
        .post("/api/users/login")
        .send(data)
        .expect(200)
        .then((res) => {
          expect(res.body).to.have.all.keys(
            "id",
            "username",
            "firstname",
            "lastname"
          );
        });
    });
    it("POST /login returns 404 if credentials are not valid", () => {
      let data = {
        username: "testuser1",
        password: "wrongpassword",
      };
      return supertest(app).post("/api/users/login").send(data).expect(404);
    });
  });
});
