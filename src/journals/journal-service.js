const JournalService = {
  getUserJournals(knex, user_id) {
    return knex.from("journals").select("*").where({ owner: user_id });
  },
  createNewJournal(knex, newJournal) {
    return knex
      .insert(newJournal)
      .into("journals")
      .returning("*")
      .then((journals) => {
        return journals[0];
      });
  },
  getJournalById(knex, journal_id) {
    return knex.from("journals").select("*").where({ id: journal_id }).first();
  },
};

module.exports = JournalService;
