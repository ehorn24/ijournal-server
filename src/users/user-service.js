const UserService = {
  getAllUsers(knex) {
    return knex.select("username").from("users");
  },

  getUserById(knex, id) {
    return knex.from("users").select("*").where({ id }).first();
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
};

module.exports = UserService;
