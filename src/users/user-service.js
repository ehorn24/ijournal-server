const UserService = {
  getAllUsers(knex) {
    return knex.select("username", "id").from("users");
  },

  getUserByUsername(knex, username) {
    return knex
      .from("users")
      .select("id", "username", "firstname", "lastname")
      .where({ username })
      .first();
  },

  createNewUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("users")
      .returning("*")
      .then((users) => {
        return users[0];
      });
  },

  authUser(knex, username) {
    return knex
      .from("users")
      .select("username", "password")
      .where({ username })
      .first();
  },

  deleteUser(knex, id) {
    return knex("users").where({ id }).delete();
  },
};

module.exports = UserService;
