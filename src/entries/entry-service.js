const EntryService = {
  getUserEntries(knex, user_id) {
    return knex.from("entries").select("*").where({ owner: user_id });
  },
  createNewEntry(knex, newEntry) {
    return knex
      .insert(newEntry)
      .into("entries")
      .returning("*")
      .then((entries) => {
        return entries[0];
      });
  },
  deleteEntry(knex, id) {
    return knex("entries").where({ id }).delete();
  },
};

module.exports = EntryService;
